import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SEARCH_FEATURE_KEY, SearchState } from './reducer'

export const getSearchState = createFeatureSelector<SearchState>(
  SEARCH_FEATURE_KEY
)

export const getSearchFilters = createSelector(
  getSearchState,
  (state: SearchState) => state.requestParams.filters
)

export const getSearchSortBy = createSelector(
  getSearchState,
  (state: SearchState) => state.requestParams.sortBy
)

export const getSearchRequestAggregations = createSelector(
  getSearchState,
  (state: SearchState) => state.requestParams.aggregations
)

export const getSearchResults = createSelector(
  getSearchState,
  (state: SearchState) => state.responseProperties.results
)

export const getSearchResultsLoading = createSelector(
  getSearchState,
  (state: SearchState) => state.loadingMore
)

export const getSearchResultsAggregations = createSelector(
  getSearchState,
  (state: SearchState) => state.responseProperties.aggregations
)
