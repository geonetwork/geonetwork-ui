import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FieldsService,
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
import { isDateRange } from '@geonetwork-ui/api/repository'

@Component({
  selector: 'md-editor-search-filters-summary',
  standalone: true,
  imports: [CommonModule, TranslateModule, BadgeComponent],
  templateUrl: './search-filters-summary.component.html',
  styleUrls: ['./search-filters-summary.component.css'],
})
export class SearchFiltersSummaryComponent {
  fieldValues$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    tap((fieldValues) => console.log(fieldValues)),
    map((fieldValues) => this.filterEmptyValues(fieldValues)),
    tap((fieldValues) => console.log(fieldValues))
    // map((fieldValues) => fieldValues[this.fieldName]),
    // filter((selected) => !!selected),
    // startWith([]),
    // catchError(() => of([]))
  ) as Observable<Record<string, FieldValue[]>> // TODO: transform date objects to arrays

  constructor(
    private searchFacade: SearchFacade,
    private fieldsService: FieldsService
  ) {}

  filterEmptyValues(fieldValues: any): any {
    return Object.fromEntries(
      Object.entries(fieldValues).filter(
        ([key, value]) =>
          (Array.isArray(value) && value.length > 0) || isDateRange(value)
      )
    )
  }

  removeFilterValue(key: string, fieldValue: any) {
    // TODO
    console.log('removeFilterValue', key, fieldValue)
  }
}
