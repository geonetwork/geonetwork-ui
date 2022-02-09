import { Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
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
      value: '_score',
    },
    {
      label: 'results.sortBy.dateStamp',
      value: '-dateStamp',
    },
    {
      label: 'results.sortBy.popularity',
      value: 'popularity',
    },
  ]
  currentSortBy$ = this.facade.sortBy$

  constructor(private facade: SearchFacade) {}

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') {
      this.facade.setSortBy(criteria)
    } else {
      throw new Error(`Unexpected value received: ${criteria}`)
    }
  }
}
