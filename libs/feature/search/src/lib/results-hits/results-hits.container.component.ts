import {
  catchError,
  filter,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { SearchFacade } from '../state/search.facade'
import { FieldAvailableValue, FieldValue } from '../utils/service/fields'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'

marker('search.filters.recordKind.all')
marker('search.filters.recordKind.dataset')
marker('search.filters.recordKind.service')
marker('search.filters.recordKind.reuse')

@Component({
  selector: 'gn-ui-results-hits',
  templateUrl: './results-hits.container.component.html',
  styleUrls: ['./results-hits.container.component.css'],
})
export class ResultsHitsContainerComponent implements OnInit {
  fieldName = 'recordKind'
  filterChoices$: Observable<FieldAvailableValue[]>
  selected$: Observable<FieldValue[]>

  constructor(
    protected searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
    this.selected$ = this.searchFacade.searchFilters$.pipe(
      switchMap((filters) =>
        this.fieldsService.readFieldValuesFromFilters(filters)
      ),
      map((fieldValues) => fieldValues[this.fieldName]),
      filter((selected) => !!selected),
      startWith([]),
      catchError(() => of([]))
    ) as Observable<FieldValue[]>

    this.filterChoices$ = this.searchFacade.configFilters$.pipe(
      switchMap((configFilters) =>
        this.fieldsService.getAvailableValues(this.fieldName, configFilters)
      )
    ) as Observable<FieldAvailableValue[]>
  }

  onSelectionChanged(values: string[]) {
    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: values })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
