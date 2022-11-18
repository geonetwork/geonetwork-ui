import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { filter, map, startWith, take } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { combineLatest, Observable } from 'rxjs'

type BucketKeys = (string | number)[]
type BucketKeysSerialized = string // this is a serialized JSON array
type BucketKeysChoice = {
  value: BucketKeysSerialized
  label: string
}[]

function serializeBucketKeys(values: BucketKeys): BucketKeysSerialized {
  return JSON.stringify(values.sort())
}
function deserializeBucketKeys(values: BucketKeysSerialized): BucketKeys {
  return JSON.parse(values)
}

@Component({
  selector: 'gn-ui-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent implements OnInit {
  @Input() fieldName: string
  @Input() title: string

  choices$: Observable<BucketKeysChoice> =
    this.searchFacade.resultsAggregations$.pipe(
      map((aggs) => aggs?.[this.fieldName]?.buckets),
      filter((buckets) => !!buckets),
      map((buckets) => {
        const choicesByLabel: Record<
          string,
          { values: BucketKeys; count: number }
        > = {}
        for (const { key, doc_count } of buckets) {
          const label = this.labelFactory(key)
          if (label in choicesByLabel) {
            choicesByLabel[label].values.push(key.toString())
            choicesByLabel[label].count += doc_count
          } else {
            choicesByLabel[label] = {
              values: [key.toString()],
              count: doc_count,
            }
          }
        }
        return Object.keys(choicesByLabel).map((label) => ({
          label: `${label} (${choicesByLabel[label].count})`,
          value: serializeBucketKeys(choicesByLabel[label].values),
        }))
      }),
      take(1),
      startWith([])
    )
  filteredValues$ = this.searchFacade.searchFilters$.pipe(
    map((filters) => Object.keys(filters[this.fieldName] ?? {})),
    filter((selected) => !!selected)
  )
  selected$: Observable<BucketKeysSerialized[]> = combineLatest([
    this.filteredValues$,
    this.choices$,
  ]).pipe(
    map(([selectedValues, choices]) =>
      choices
        .filter((choice) =>
          deserializeBucketKeys(choice.value).every(
            (v) => selectedValues.indexOf(v.toString()) > -1
          )
        )
        .map((choice) => choice.value)
    ),
    startWith([])
  )

  @Input() labelFactory = (bucketKey: string) => bucketKey

  onSelectedValues(values: BucketKeysSerialized[]) {
    const flattened = values.reduce(
      (prev, curr) => [...prev, ...deserializeBucketKeys(curr)],
      [] as BucketKeys
    )
    const filters = flattened.reduce((acc, val) => {
      return { ...acc, [val.toString()]: true }
    }, {})
    this.searchService.updateSearch({
      [this.fieldName]: filters,
    })
  }

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchFacade.updateConfigAggregations({
      [this.fieldName]: { terms: { field: this.fieldName, size: 100 } },
    })
  }
}
