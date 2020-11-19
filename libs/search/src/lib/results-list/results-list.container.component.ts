import { Component, Input, OnInit } from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { SearchState } from '../state/reducer'
import {
  getSearchResults,
  getSearchResultsLoading,
} from '../state/selectors'
import { RequestMoreResults } from '../state/actions'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  results$ = this.store.pipe(select(getSearchResults))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {
    // initial load when showing the component
    this.store.dispatch(new RequestMoreResults())
  }
}
