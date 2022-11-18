import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { filter, map, startWith, take } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'

@Component({
  selector: 'gn-ui-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent implements OnInit {
  @Input() fieldName: string
  @Input() title: string

  choices$ = this.searchFacade.resultsAggregations$.pipe(
    map(
      (aggs) =>
        aggs &&
        aggs[this.fieldName] &&
        aggs[this.fieldName].buckets.map((bucket) => ({
          label: this.labelFactory(bucket.key, bucket.doc_count),
          value: bucket.key.toString(),
          count: bucket.doc_count,
        }))
    ),
    map((choicesUngrouped) => this.groupFactory(choicesUngrouped)),
    filter((choices) => !!choices),
    // take(1),
    startWith([])
  )
  selected$ = this.searchFacade.searchFilters$.pipe(
    map(
      (filters) =>
        filters[this.fieldName] && Object.keys(filters[this.fieldName])
    ),
    filter((selected) => !!selected),
    take(1),
    startWith([])
  )

  @Input() labelFactory = (bucketKey: string, docCount: number) =>
    `${bucketKey} (${docCount})`
  @Input() groupFactory = (selectOptions: any[]) => selectOptions

  onSelectedValues(values: any[]) {
    const valuesToReduce =
      values[values.length - 1] instanceof Array
        ? values[values.length - 1]
        : values
    this.searchService.updateSearch({
      [this.fieldName]: valuesToReduce.reduce((acc, val) => {
        return { ...acc, [val.toString()]: true }
      }, {}),
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
