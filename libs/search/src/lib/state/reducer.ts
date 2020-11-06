import { RecordSummary, SearchFilters } from '@lib/common'
import * as fromActions from './actions'

export const SEARCH_FEATURE_KEY = 'searchState'

export interface SearchState {
  requestParams: {
    filters: SearchFilters
    sortBy?: string
    aggregations?: any
  }
  responseProperties: {
    results: RecordSummary[]
    aggregations: any
  }
  loadingMore: boolean
}

export const initialState: SearchState = {
  requestParams: {
    filters: {},
    // TODO: read from config
    aggregations: {
      tag: { terms: { field: 'tag', include: '.*', size: 10 } },
    },
  },
  responseProperties: {
    results: [],
    aggregations: {},
  },
  loadingMore: false,
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  switch (action.type) {
    case fromActions.UPDATE_FILTERS: {
      return {
        ...state,
        requestParams: {
          ...state.requestParams,
          filters: { ...action.payload },
        },
      }
    }
    case fromActions.SORT_BY: {
      return {
        ...state,
        requestParams: {
          ...state.requestParams,
          sortBy: action.sortBy,
        },
      }
    }
    case fromActions.ADD_RESULTS: {
      return {
        ...state,
        responseProperties: {
          ...state.responseProperties,
          results: [...state.responseProperties.results, ...action.payload],
        },
        loadingMore: false,
      }
    }
    case fromActions.CLEAR_RESULTS: {
      return {
        ...state,
        responseProperties: {
          ...state.responseProperties,
          results: [],
        },
      }
    }
    case fromActions.REQUEST_MORE_RESULTS: {
      return {
        ...state,
        loadingMore: true,
      }
    }
    case fromActions.SET_RESPONSE_AGGREGATIONS: {
      return {
        ...state,
        responseProperties: {
          ...state.responseProperties,
          aggregations: action.payload,
        },
      }
    }
  }

  return state
}
