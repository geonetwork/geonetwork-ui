import {
  catchError,
  combineLatest,
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
import { FieldAvailableValue, FieldValue } from '../utils/service/fields'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { PossibleResourceTypes } from 'libs/api/metadata-converter/src/lib/common/resource-types'

marker('results.records.hits.filters.all')
marker('results.records.hits.filters.dataset')
marker('results.records.hits.filters.service')
marker('results.records.hits.filters.reuse')

enum FilterConfig {
  all = 'iconoirAppleWallet',
  dataset = 'iconoirAppleShortcuts',
  service = 'iconoirCode',
  reuse = 'iconoirCreditCard',
}
type FilterConfigKey = keyof typeof FilterConfig
type ResourceType = keyof typeof PossibleResourceTypes

@Component({
  selector: 'gn-ui-results-hits',
  templateUrl: './results-hits.container.component.html',
})
export class ResultsHitsContainerComponent {
  fieldName = 'resourceType'
  filterValues = Object.keys(FilterConfig) as FilterConfigKey[]
  filterChoices$: Observable<Choice[]>
  selected$: Observable<FieldValue[]>
  reuseRealValues = Object.entries(PossibleResourceTypes)
    .filter(([_, value]) => value === 'reuse')
    .map(([key]) => key) as ResourceType[]

  constructor(
    protected searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.selected$ = this.searchFacade.searchFilters$.pipe(
      switchMap((filters) =>
        this.fieldsService.readFieldValuesFromFilters(filters)
      ),
      map((fieldValues) => fieldValues[this.fieldName]),
      filter((selected) => !!selected),
      map((selected: ResourceType | ResourceType[]) => {
        if (Array.isArray(selected)) {
          const shouldReplaceByReuse = (selected as ResourceType[]).some((v) =>
            this.reuseRealValues.includes(v)
          )
          if (shouldReplaceByReuse) {
            return [
              ...selected.filter((v) => !this.reuseRealValues.includes(v)),
              ...['reuse'],
            ]
          }
        }
        return selected
      }),
      startWith([]),
      catchError(() => of([]))
    ) as Observable<FieldValue[]>

    this.filterChoices$ = combineLatest([
      this.translateService.get(
        this.filterValues.map((v) => `results.records.hits.filters.${v}`)
      ),
      this.fieldsService
        .getAvailableValues(this.fieldName)
        .pipe(catchError(() => of([] as FieldAvailableValue[]))),
    ]).pipe(
      map(([translations, availableValues]) => {
        // Cumulate counts for reuses
        const counts = (<FieldAvailableValue[]>availableValues).reduce(
          (acc, item) => {
            const key = this.reuseRealValues.includes(<ResourceType>item.value)
              ? 'reuse'
              : item.value
            acc[key] = (acc[key] || 0) + item.count
            return acc
          },
          {} as Record<string, number>
        )

        // Create all filter values (All, Datasets, Services, Reuses)
        return this.filterValues
          .filter((value) => {
            // If value is map, or application, or map-static, ..., ignore, and use reuse instead
            const isReuseType = this.reuseRealValues.includes(
              <ResourceType>value
            )
            return !isReuseType || value === 'reuse'
          })
          .map((value) => {
            const displayValue = this.reuseRealValues.includes(
              <ResourceType>value
            )
              ? 'reuse'
              : value
            return {
              value: displayValue,
              label:
                `${translations[`results.records.hits.filters.${displayValue}`]}` +
                (value !== 'all' ? `(${counts[displayValue] || 0})` : ''),
              icon: FilterConfig[displayValue],
              count: counts[displayValue] || 0,
            }
          })
      })
    )
  }

  onSelectedValues(values: string[]) {
    const mappedValues = this.convertToFieldValues(<FilterConfigKey[]>values)

    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: mappedValues })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  convertToFieldValues(values: FilterConfigKey[]) {
    if (values.includes('all')) {
      return []
    }
    if (values.includes('reuse')) {
      return [...values.filter((v) => v !== 'reuse'), ...this.reuseRealValues]
    }
    return values
  }
}
