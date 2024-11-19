import { Component, Input } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import {
  FieldsService,
  FieldValue,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { DateRange, isDateRange } from '@geonetwork-ui/api/repository'

@Component({
  selector: 'md-editor-search-filters-summary-item',
  standalone: true,
  imports: [CommonModule, TranslateModule, BadgeComponent],
  templateUrl: './search-filters-summary-item.component.html',
  styleUrls: ['./search-filters-summary-item.component.css'],
  providers: [DatePipe],
})
export class SearchFiltersSummaryItemComponent {
  @Input() fieldName: string

  fieldValues$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) =>
      Array.isArray(fieldValues[this.fieldName])
        ? (fieldValues[this.fieldName] as FieldValue[])
        : ([fieldValues[this.fieldName]] as FieldValue[])
    ),
    map((fieldValues) => this.getReadableValues(fieldValues) as FieldValue[]),
    catchError(() => of([]))
  ) as Observable<FieldValue[]>

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService,
    private datePipe: DatePipe
  ) {}

  getReadableValues(fieldValues: FieldValue[] | DateRange[]): FieldValue[] {
    return fieldValues.map((value) =>
      isDateRange(value)
        ? `${this.datePipe.transform(
            value.start,
            'dd.MM.yyyy'
          )} - ${this.datePipe.transform(value.end, 'dd.MM.yyyy')}`
        : value
    )
  }

  async removeFilterValue(fieldValue: FieldValue | DateRange) {
    const currentFieldValues: (FieldValue | DateRange)[] = await firstValueFrom(
      this.fieldValues$
    )
    const updatedFieldValues = currentFieldValues.filter(
      (value: string | DateRange) => value !== fieldValue
    )
    this.fieldsService
      .buildFiltersFromFieldValues({
        [this.fieldName]: updatedFieldValues as FieldValue[],
      })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
