import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { filter, map, startWith, take, withLatestFrom } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { Observable } from 'rxjs'

type BucketKeys = (string | number)[]
type BucketKeysChoice = {
  value: BucketKeys
  label: string
}[]

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
          value: choicesByLabel[label].values,
        }))
      }),
      take(1),
      startWith([])
    )
  selected$: Observable<BucketKeys[]> = this.searchFacade.searchFilters$.pipe(
    map((filters) => Object.keys(filters[this.fieldName] ?? {})),
    filter((selected) => !!selected),
    withLatestFrom(this.choices$),
    map(([selectedValues, choices]) =>
      choices
        .filter((choice) =>
          choice.value.every((v) => selectedValues.indexOf(v.toString()) > -1)
        )
        .map((choice) => choice.value)
    )
  )

  @Input() labelFactory = (bucketKey: string) => bucketKey

  onSelectedValues(values: BucketKeys[]) {
    const flattened = values.reduce((prev, curr) => [...prev, ...curr], [])
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
