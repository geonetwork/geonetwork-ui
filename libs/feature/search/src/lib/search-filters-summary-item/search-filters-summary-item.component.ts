import { Component, Input, OnInit } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
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
import { DateRange } from '@geonetwork-ui/api/repository'
import { FieldType, FieldValue } from '../utils/service/fields'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { formatUserInfo } from '@geonetwork-ui/util/shared'

interface DisplayedValue {
  label: string
  value: FieldValue | DateRange
}

@Component({
  selector: 'gn-ui-search-filters-summary-item',
  standalone: true,
  imports: [CommonModule, TranslateModule, BadgeComponent],
  templateUrl: './search-filters-summary-item.component.html',
  styleUrls: ['./search-filters-summary-item.component.css'],
  providers: [DatePipe],
})
export class SearchFiltersSummaryItemComponent implements OnInit {
  @Input() fieldName: string
  fieldType: FieldType

  fieldValues$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) =>
      Array.isArray(fieldValues[this.fieldName])
        ? (fieldValues[this.fieldName] as FieldValue[])
        : ([fieldValues[this.fieldName]] as FieldValue[])
    ),
    map(
      (fieldValues) => this.getReadableValues(fieldValues) as DisplayedValue[]
    ),
    catchError(() => of([]))
  ) as Observable<DisplayedValue[]>

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fieldType = this.fieldsService.getFieldType(this.fieldName)
  }

  getReadableValues(fieldValues: FieldValue[] | DateRange[]): DisplayedValue[] {
    return fieldValues.map((value) => {
      switch (this.fieldType) {
        case 'dateRange':
          return {
            value,
            label: `${this.datePipe.transform(
              value.start,
              'dd.MM.yyyy'
            )} - ${this.datePipe.transform(value.end, 'dd.MM.yyyy')}`,
          }
        case 'userInfo':
          return { value, label: formatUserInfo(value) }
        default:
          return { value, label: value }
      }
    })
  }

  async removeFilterValue(fieldValue: FieldValue | DateRange) {
    const currentFieldValues: DisplayedValue[] = await firstValueFrom(
      this.fieldValues$
    )
    const updatedFieldValues = currentFieldValues
      .filter(
        (displayedValue: DisplayedValue) => displayedValue.value !== fieldValue
      )
      .map((displayedValue: DisplayedValue) => displayedValue.value)

    this.fieldsService
      .buildFiltersFromFieldValues({
        [this.fieldName]: updatedFieldValues as FieldValue[],
      })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
