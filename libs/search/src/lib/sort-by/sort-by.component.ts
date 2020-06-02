import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { SortBy } from '../state/actions'
import { SearchState } from '../model'
import { getSearchSortBy } from '../state/selectors'

@Component({
  selector: 'search-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent implements OnInit {
  choices = [
    {
      label: 'last changed',
      value: 'dateStamp',
    },
    {
      label: 'popularity',
      value: 'popularity',
    },
  ]
  currentSortBy$ = this.store.pipe(select(getSearchSortBy))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {}

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') {
      this.store.dispatch(new SortBy(criteria))
    } else {
      throw new Error(`Unexpected value received: ${criteria}`)
    }
  }
}
