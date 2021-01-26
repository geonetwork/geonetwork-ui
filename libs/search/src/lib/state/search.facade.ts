import { Injectable } from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { select, Store } from '@ngrx/store'
import {
  Paginate,
  RequestMoreOnAggregation,
  RequestMoreResults,
  Scroll,
  SetConfigAggregations,
  SetIncludeOnAggregation,
  SetPagination,
  SetResultsLayout,
} from './actions'
import { SearchState } from './reducer'
import {
  getSearchResults,
  getSearchResultsLayout,
  getSearchResultsLoading,
} from './selectors'

@Injectable({
  providedIn: 'root',
})
export class SearchFacade {
  results$ = this.store.pipe(select(getSearchResults))
  layout$ = this.store.pipe(select(getSearchResultsLayout))
  isLoading$ = this.store.pipe(select(getSearchResultsLoading))

  constructor(private store: Store<SearchState>) {}

  setConfigAggregations(config: any): void {
    this.store.dispatch(new SetConfigAggregations(config))
  }

  requestMoreResults(): void {
    this.store.dispatch(new RequestMoreResults())
  }

  requestMoreOnAggregation(key: string, increment: number): void {
    this.store.dispatch(new RequestMoreOnAggregation(key, increment))
  }

  setResultsLayout(layout: ResultsListLayout): void {
    this.store.dispatch(new SetResultsLayout(layout))
  }

  setIncludeOnAggregation(key: string, include: string): void {
    this.store.dispatch(new SetIncludeOnAggregation(key, include))
  }

  setPagination(from: number, size: number): void {
    this.store.dispatch(new SetPagination(from, size))
  }

  paginate(delta: number): void {
    this.store.dispatch(new Paginate(delta))
  }

  scroll(): void {
    this.store.dispatch(new Scroll())
  }
}
