import { Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { SortByEnum, SortByField } from '@geonetwork-ui/common/domain/search'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent {
  choices = [
    {
      label: marker('results.sortBy.relevancy'),
      value: JSON.stringify(SortByEnum.RELEVANCY),
    },
    {
      label: marker('results.sortBy.dateStamp'),
      value: JSON.stringify(SortByEnum.CREATE_DATE),
    },
    {
      label: marker('results.sortBy.popularity'),
      value: JSON.stringify(SortByEnum.POPULARITY),
    },
  ]
  currentSortBy$ = this.facade.sortBy$.pipe(
    map((sortBy) => JSON.stringify(sortBy))
  )

  constructor(
    private facade: SearchFacade,
    private searchService: SearchService
  ) {}

  changeSortBy(criteriaAsString: string) {
    this.searchService.setSortBy(JSON.parse(criteriaAsString) as SortByField)
  }
}
