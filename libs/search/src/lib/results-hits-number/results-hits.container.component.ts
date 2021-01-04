import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  getSearchResultsHits,
  getSearchResultsLoading,
} from '../state/selectors'
import { SearchState } from '../state/reducer'

@Component({
  selector: 'search-results-hits',
  templateUrl: './results-hits.container.component.html',
})
export class ResultsHitsContainerComponent implements OnInit {
  hits$ = this.store.pipe(select(getSearchResultsHits))
  loading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {}
}
