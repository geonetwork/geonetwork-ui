import { Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { SortByEnum } from '@geonetwork-ui/util/shared'
import { SearchFacade } from '../state/search.facade'

marker('results.sortBy.relevancy')
marker('results.sortBy.dateStamp')
marker('results.sortBy.popularity')

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent {
  choices = [
    {
      label: 'results.sortBy.relevancy',
      value: SortByEnum.RELEVANCY,
    },
    {
      label: 'results.sortBy.dateStamp',
      value: SortByEnum.CREATE_DATE,
    },
    {
      label: 'results.sortBy.popularity',
      value: SortByEnum.POPULARITY,
    },
  ]
  currentSortBy$ = this.facade.sortBy$

  constructor(private facade: SearchFacade) {}

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') {
      this.facade.setSortBy(criteria)
    } else {
      throw new Error(
        `Unexpected SortBy value received: ${JSON.stringify(criteria)}`
      )
    }
  }
}
