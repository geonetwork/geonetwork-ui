import {
  catchError,
  filter,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs'
import { Component } from '@angular/core'
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
export class ResultsHitsContainerComponent {
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

    this.filterChoices$ = this.fieldsService
      .getAvailableValues(this.fieldName)
      .pipe(
        catchError(() => of([])),
        map((availableValues: FieldAvailableValue[]) =>
          this.buildFilterChoices(availableValues)
        )
      )
  }

  onSelectedValues(values: string[]) {
    const searchValues = values.includes('all') ? [] : values

    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: searchValues })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  buildFilterChoices(availableValues: FieldAvailableValue[]) {
    return [
      ...[
        {
          label: 'all',
          value: 'all',
          count: undefined,
        },
      ],
      ...availableValues,
    ]
  }

  isChoiceSelected(value: string) {
    return this.selected$.pipe(map((selected) => selected.includes(value)))
  }
}
