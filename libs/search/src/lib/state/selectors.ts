import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SEARCH_FEATURE_KEY, SearchState } from './reducer'

export const getSearchState = createFeatureSelector<SearchState>(
  SEARCH_FEATURE_KEY
)

export const getSearchFilters = createSelector(
  getSearchState,
  (state: SearchState) => state.params.filters
)

export const getSearchSortBy = createSelector(
  getSearchState,
  (state: SearchState) => state.params.sortBy
)

export const getSearchResultsLayout = createSelector(
  getSearchState,
  (state: SearchState) => state.resultsLayout
)

export const getSearchConfigAggregations = createSelector(
  getSearchState,
  (state: SearchState) => state.config.aggregations
)

export const getSearchResults = createSelector(
  getSearchState,
  (state: SearchState) => state.results.records
)

export const getSearchResultsLoading = createSelector(
  getSearchState,
  (state: SearchState) => state.loadingMore
)

export const getSearchResultsAggregations = createSelector(
  getSearchState,
  (state: SearchState) => state.results.aggregations
)
