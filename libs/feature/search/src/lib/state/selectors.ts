import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DEFAULT_SEARCH_KEY } from './actions'
import { SEARCH_FEATURE_KEY, SearchState, SearchStateSearch } from './reducer'

export const getSearchState =
  createFeatureSelector<SearchState>(SEARCH_FEATURE_KEY)

export const getSearchStateSearch = createSelector(
  getSearchState,
  (state: SearchState, id: string = DEFAULT_SEARCH_KEY) => state[id]
)

export const getSearchFilters = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.filters
)

export const getSearchSortBy = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.sort
)

export const getSearchResultsLayout = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.resultsLayout
)

export const getSearchConfigAggregations = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.config.aggregations
)

export const getSearchResults = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.results.records
)

export const getSearchResultsLoading = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.loadingResults
)

export const getSearchResultsAggregations = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.results.aggregations
)

export const getSearchResultsHits = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.results.count
)

export const totalPages = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => {
    return Math.ceil(state.results.count / state.params.pageSize)
  }
)

export const currentPage = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.currentPage + 1
)

export const getPageSize = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.pageSize
)

export const getFavoritesOnly = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.favoritesOnly
)

export const getError = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.error
)

export const getSpatialFilterEnabled = createSelector(
  getSearchStateSearch,
  (state: SearchStateSearch) => state.params.useSpatialFilter
)
