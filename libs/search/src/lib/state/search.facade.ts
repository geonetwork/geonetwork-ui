import { Injectable } from '@angular/core'
import { ResultsListLayout, SearchFilters } from '@lib/common'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  AddSearch,
  DEFAULT_SEARCH_KEY,
  Paginate,
  RequestMoreOnAggregation,
  RequestMoreResults,
  Scroll,
  SetConfigAggregations,
  SetFilters,
  SetIncludeOnAggregation,
  SetPagination,
  SetResultsLayout,
  SetSearch,
  UpdateFilters,
} from './actions'
import { SearchState, SearchStateParams } from './reducer'
import {
  getSearchConfigAggregations,
  getSearchFilters,
  getSearchResults,
  getSearchResultsAggregations,
  getSearchResultsHits,
  getSearchResultsLayout,
  getSearchResultsLoading,
} from './selectors'

@Injectable()
export class SearchFacade {
  results$: Observable<any>
  layout$: Observable<string>
  isLoading$: Observable<boolean>
  searchFilters$: Observable<SearchFilters>
  configAggregations$: Observable<any>
  resultsAggregations$: Observable<any>
  resultsHits$: Observable<any>

  searchId: string

  constructor(private store: Store<SearchState>) {}

  init(searchId: string = DEFAULT_SEARCH_KEY): void {
    this.searchId = searchId
    this.store.dispatch(new AddSearch(searchId))

    this.results$ = this.store.pipe(select(getSearchResults, searchId))
    this.layout$ = this.store.pipe(select(getSearchResultsLayout, searchId))
    this.isLoading$ = this.store.pipe(select(getSearchResultsLoading, searchId))
    this.searchFilters$ = this.store.pipe(select(getSearchFilters, searchId))
    this.resultsHits$ = this.store.pipe(select(getSearchResultsHits, searchId))
    this.configAggregations$ = this.store.pipe(
      select(getSearchConfigAggregations, searchId)
    )
    this.resultsAggregations$ = this.store.pipe(
      select(getSearchResultsAggregations, searchId)
    )
  }

  setConfigAggregations(config: any): void {
    this.store.dispatch(new SetConfigAggregations(config, this.searchId))
  }

  requestMoreResults(): void {
    this.store.dispatch(new RequestMoreResults(this.searchId))
  }

  requestMoreOnAggregation(key: string, increment: number): void {
    this.store.dispatch(
      new RequestMoreOnAggregation(key, increment, this.searchId)
    )
  }

  setResultsLayout(layout: ResultsListLayout): void {
    this.store.dispatch(new SetResultsLayout(layout, this.searchId))
  }

  setFilters(filters: SearchFilters): void {
    this.store.dispatch(new SetFilters(filters, this.searchId))
  }

  updateFilters(filters: SearchFilters): void {
    this.store.dispatch(new UpdateFilters(filters, this.searchId))
  }

  setSearch(params: SearchStateParams): void {
    this.store.dispatch(new SetSearch(params, this.searchId))
  }

  setIncludeOnAggregation(key: string, include: string): void {
    this.store.dispatch(
      new SetIncludeOnAggregation(key, include, this.searchId)
    )
  }

  setPagination(from: number, size: number): void {
    this.store.dispatch(new SetPagination(from, size, this.searchId))
  }

  paginate(delta: number): void {
    this.store.dispatch(new Paginate(delta, this.searchId))
  }

  scroll(): void {
    this.store.dispatch(new Scroll(this.searchId))
  }
}
