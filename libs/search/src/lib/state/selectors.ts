import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SearchState } from '../model'
import { SEARCH_FEATURE_KEY } from './reducer'

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
