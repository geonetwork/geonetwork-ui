import { Injectable } from '@angular/core'
import {
  RequestFields,
  SearchFilters,
  StateConfigFilters,
} from '@geonetwork-ui/util/shared'
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
  SetConfigFilters,
  SetConfigRequestFields,
  SetFavoritesOnly,
  SetFilters,
  SetIncludeOnAggregation,
  SetPagination,
  SetResultsLayout,
  SetSearch,
  SetSortBy,
  UpdateFilters,
} from './actions'
import { SearchError, SearchState, SearchStateParams } from './reducer'
import {
  getError,
  getFavoritesOnly,
  getSearchConfigAggregations,
  getSearchFilters,
  getSearchResults,
  getSearchResultsAggregations,
  getSearchResultsHits,
  getSearchResultsLayout,
  getSearchResultsLoading,
  getSearchSortBy,
  isEndOfResults,
} from './selectors'

@Injectable()
export class SearchFacade {
  results$: Observable<any>
  layout$: Observable<string>
  sortBy$: Observable<string>
  isLoading$: Observable<boolean>
  isEndOfResults$: Observable<boolean>
  searchFilters$: Observable<SearchFilters>
  configAggregations$: Observable<any>
  resultsAggregations$: Observable<any>
  resultsHits$: Observable<any>
  favoritesOnly$: Observable<boolean>
  error$: Observable<SearchError>

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
    this.isEndOfResults$ = this.store.pipe(select(isEndOfResults, searchId))
    this.configAggregations$ = this.store.pipe(
      select(getSearchConfigAggregations, searchId)
    )
    this.resultsAggregations$ = this.store.pipe(
      select(getSearchResultsAggregations, searchId)
    )
    this.sortBy$ = this.store.pipe(select(getSearchSortBy, searchId))
    this.favoritesOnly$ = this.store.pipe(select(getFavoritesOnly, searchId))
    this.error$ = this.store.pipe(select(getError, searchId))
  }

  setConfigAggregations(config: any): SearchFacade {
    this.store.dispatch(new SetConfigAggregations(config, this.searchId))
    return this
  }
  setConfigRequestFields(fields: RequestFields): SearchFacade {
    this.store.dispatch(new SetConfigRequestFields(fields, this.searchId))
    return this
  }

  setConfigFilters(filters: StateConfigFilters): SearchFacade {
    this.store.dispatch(new SetConfigFilters(filters, this.searchId))
    return this
  }

  requestMoreResults(): SearchFacade {
    this.store.dispatch(new RequestMoreResults(this.searchId))
    return this
  }

  requestMoreOnAggregation(key: string, increment: number): SearchFacade {
    this.store.dispatch(
      new RequestMoreOnAggregation(key, increment, this.searchId)
    )
    return this
  }

  setResultsLayout(layout: string): SearchFacade {
    this.store.dispatch(new SetResultsLayout(layout, this.searchId))
    return this
  }

  setFilters(filters: SearchFilters): SearchFacade {
    this.store.dispatch(new SetFilters(filters, this.searchId))
    return this
  }

  updateFilters(filters: SearchFilters): SearchFacade {
    this.store.dispatch(new UpdateFilters(filters, this.searchId))
    return this
  }

  setSearch(params: SearchStateParams): SearchFacade {
    this.store.dispatch(new SetSearch(params, this.searchId))
    return this
  }

  setFavoritesOnly(favoritesOnly: boolean): SearchFacade {
    this.store.dispatch(new SetFavoritesOnly(favoritesOnly, this.searchId))
    return this
  }

  setIncludeOnAggregation(key: string, include: string): SearchFacade {
    this.store.dispatch(
      new SetIncludeOnAggregation(key, include, this.searchId)
    )
    return this
  }

  setPagination(from: number, size: number): SearchFacade {
    this.store.dispatch(new SetPagination(from, size, this.searchId))
    return this
  }

  paginate(delta: number): SearchFacade {
    this.store.dispatch(new Paginate(delta, this.searchId))
    return this
  }

  scroll(): SearchFacade {
    this.store.dispatch(new Scroll(this.searchId))
    return this
  }

  setSortBy(sortBy: string) {
    this.store.dispatch(new SetSortBy(sortBy, this.searchId))
    return this
  }
}
