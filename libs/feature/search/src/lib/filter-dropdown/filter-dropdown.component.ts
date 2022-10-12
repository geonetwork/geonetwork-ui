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

  choices$ = this.searchFacade.resultsAggregations$.pipe(
    map(
      (aggs) =>
        aggs &&
        aggs[this.fieldName] &&
        aggs[this.fieldName].buckets.map((bucket) => ({
          label: `${bucket.key} (${bucket.doc_count})`,
          value: bucket.key,
        }))
    ),
    filter((choices) => !!choices),
    take(1),
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

  onSelectedValues(values: unknown[]) {
    this.searchService.updateSearch({
      [this.fieldName]: values.reduce<Record<string, boolean>>((acc, val) => {
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
