import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getSearchResults, getSearchResultsLoading } from '../state/selectors'
import { SearchState } from '../model'
import { RequestMoreResults } from '../state/actions'

@Component({
  selector: 'search-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent implements OnInit {
  results$ = this.store.pipe(select(getSearchResults))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {
    // initial load when showing the component
    this.store.dispatch(new RequestMoreResults())
  }
}
