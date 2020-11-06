import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SEARCH_FEATURE_KEY, SearchState } from './reducer'

export const getSearchState = createFeatureSelector<SearchState>(
  SEARCH_FEATURE_KEY
)

export const getSearchParams = createSelector(
  getSearchState,
  (state: SearchState) => state.params
)

export const getSearchSortBy = createSelector(
  getSearchState,
  (state: SearchState) => state.sortBy
)

export const getSearchResults = createSelector(
  getSearchState,
  (state: SearchState) => state.results
)

export const getSearchResultsLoading = createSelector(
  getSearchState,
  (state: SearchState) => state.loadingMore
)

export const getSearchAggregations = createSelector(
  getSearchState,
  (state: SearchState) => state.aggregations
)
