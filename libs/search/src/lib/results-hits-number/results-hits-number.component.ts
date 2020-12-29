import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  getSearchResultsHits,
  getSearchResultsLoading,
} from '../state/selectors'
import { SearchState } from '../state/reducer'

@Component({
  selector: 'search-results-hits-number',
  templateUrl: './results-hits-number.component.html',
})
export class ResultsHitsNumberComponent implements OnInit {
  hits$ = this.store.pipe(select(getSearchResultsHits))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {}
}
