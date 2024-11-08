import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FieldsService,
  FieldType,
  FieldValue,
  FieldValues,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import {
  catchError,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { DateRange } from '@geonetwork-ui/api/repository'

@Component({
  selector: 'md-editor-search-filters-summary-item',
  standalone: true,
  imports: [CommonModule, TranslateModule, BadgeComponent],
  templateUrl: './search-filters-summary-item.component.html',
  styleUrls: ['./search-filters-summary-item.component.css'],
})
export class SearchFiltersSummaryItemComponent implements OnInit {
  @Input() fieldName: string
  fieldType: FieldType

  fieldValues$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    tap((fieldValues) => console.log(fieldValues)),
    map((fieldValues) =>
      Array.isArray(fieldValues[this.fieldName]) //TODO: handle date ranges as arrays averywhere?
        ? fieldValues[this.fieldName]
        : [fieldValues[this.fieldName]]
    ),
    tap((fieldValues) => console.log(fieldValues))
    // startWith([]),
    // catchError(() => of([]))
  ) as Observable<FieldValue[] | DateRange[]>

  dateRange$ = this.fieldValues$.pipe(
    filter(() => this.fieldType === 'dateRange'),
    map((fieldValues) => fieldValues as DateRange[])
  )

  values$ = this.fieldValues$.pipe(
    filter(() => this.fieldType === 'values'),
    map((fieldValues) => fieldValues as FieldValue[])
  )

  constructor(
    private searchFacade: SearchFacade,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
    this.fieldType = this.fieldsService.getFieldType(this.fieldName)
  }

  removeFilterValue(fieldValue: any) {
    // TODO
    console.log('removeFilterValue', this.fieldName, fieldValue)
  }
}
