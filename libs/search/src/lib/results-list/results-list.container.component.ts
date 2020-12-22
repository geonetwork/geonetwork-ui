import { Component, Input, OnInit } from '@angular/core'
import { BootstrapService, ResultsListLayout } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { SetResultsLayout } from '../state/actions'
import { SearchState } from '../state/reducer'
import {
  getSearchResults,
  getSearchResultsLayout,
  getSearchResultsLoading,
} from '../state/selectors'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD

  results$ = this.store.pipe(select(getSearchResults))
  layout$ = this.store.pipe(select(getSearchResultsLayout))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  ngOnInit(): void {
    this.store.dispatch(new SetResultsLayout(this.layout))
  }
}
