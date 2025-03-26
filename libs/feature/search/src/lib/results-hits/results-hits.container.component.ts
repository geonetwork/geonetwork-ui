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
import { TranslateService } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Choice } from '@geonetwork-ui/ui/inputs'
import { SearchFacade } from '../state/search.facade'
import { FieldValue } from '../utils/service/fields'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'

marker('results.records.hits.filters.all')
marker('results.records.hits.filters.dataset')
marker('results.records.hits.filters.service')
marker('results.records.hits.filters.reuse')

@Component({
  selector: 'gn-ui-results-hits',
  templateUrl: './results-hits.container.component.html',
})
export class ResultsHitsContainerComponent {
  fieldName = 'resourceType'
  filterValues = ['all', 'dataset', 'service', 'reuse']
  iconMap: Record<string, string> = {
    all: 'iconoirAppleWallet',
    dataset: 'iconoirAppleShortcuts',
    service: 'iconoirCode',
    reuse: 'iconoirCreditCard',
  }
  filterChoices$: Observable<Choice[]>
  selected$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) => fieldValues[this.fieldName]),
    filter((selected) => !!selected),
    startWith([]),
    catchError(() => of([]))
  ) as Observable<FieldValue[]>

  constructor(
    protected searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.filterChoices$ = this.translateService
      .get(this.filterValues.map((v) => `results.records.hits.filters.${v}`))
      .pipe(
        map((translations) =>
          this.filterValues.map((value) => ({
            value,
            label: translations[`results.records.hits.filters.${value}`],
            icon: this.iconMap[value],
          }))
        )
      )
  }

  onSelectedValues(values: unknown[]) {
    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: values as FieldValue[] })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
