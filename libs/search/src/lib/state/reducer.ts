import { RecordSummary, SearchParams } from '@lib/common'
import * as fromActions from './actions'

export const SEARCH_FEATURE_KEY = 'searchState'

export interface SearchState {
  params: SearchParams
  sortBy?: string
  results: RecordSummary[]
  aggregations: any
  loadingMore: boolean
}

export const initialState: SearchState = {
  params: {},
  results: [],
  aggregations: {},
  loadingMore: false,
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  switch (action.type) {
    case fromActions.UPDATE_PARAMS: {
      return {
        ...state,
        params: {
          ...action.payload,
        },
      }
    }
    case fromActions.SORT_BY: {
      return {
        ...state,
        sortBy: action.sortBy,
      }
    }
    case fromActions.ADD_RESULTS: {
      return {
        ...state,
        results: [...state.results, ...action.payload],
        loadingMore: false,
      }
    }
    case fromActions.CLEAR_RESULTS: {
      return {
        ...state,
        results: [],
      }
    }
    case fromActions.REQUEST_MORE_RESULTS: {
      return {
        ...state,
        loadingMore: true,
      }
    }
    case fromActions.SET_AGGREGATIONS: {
      return {
        ...state,
        aggregations: action.payload,
      }
    }
  }

  return state
}
