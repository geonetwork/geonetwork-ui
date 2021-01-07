import { RecordSummary, SearchFilters } from '@lib/common'
import { UPDATE_REQUEST_AGGREGATION_TERM } from './actions'
import * as fromActions from './actions'

export const SEARCH_FEATURE_KEY = 'searchState'

export interface SearchStateParams {
  filters?: SearchFilters
  sortBy?: string
  size?: number
}

export interface SearchState {
  config: {
    aggregations?: any
  }
  params: SearchStateParams
  results: {
    hits: {
      value: number
      eq: string
    }
    records: RecordSummary[]
    aggregations: any
  }
  resultsLayout?: string
  loadingMore: boolean
}

export const initialState: SearchState = {
  config: {},
  params: {
    filters: {},
    size: 10,
  },
  results: {
    hits: null,
    records: [],
    aggregations: {},
  },
  loadingMore: false,
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  switch (action.type) {
    case fromActions.SET_FILTERS: {
      return {
        ...state,
        params: {
          ...state.params,
          filters: { ...action.payload },
        },
      }
    }
    case fromActions.UPDATE_FILTERS: {
      return {
        ...state,
        params: {
          ...state.params,
          filters: {
            ...state.params.filters,
            ...action.payload,
          },
        },
      }
    }
    case fromActions.SET_SEARCH: {
      return {
        ...state,
        params: {
          ...action.payload,
        },
      }
    }
    case fromActions.SET_SORT_BY: {
      return {
        ...state,
        params: {
          ...state.params,
          sortBy: action.sortBy,
        },
      }
    }
    case fromActions.SET_RESULTS_LAYOUT: {
      return {
        ...state,
        resultsLayout: action.resultsLayout,
      }
    }
    case fromActions.ADD_RESULTS: {
      return {
        ...state,
        results: {
          ...state.results,
          records: [...state.results.records, ...action.payload],
        },
        loadingMore: false,
      }
    }
    case fromActions.CLEAR_RESULTS: {
      return {
        ...state,
        results: {
          ...state.results,
          hits: null,
          records: [],
        },
      }
    }
    case fromActions.REQUEST_MORE_RESULTS: {
      return {
        ...state,
        loadingMore: true,
      }
    }
    case fromActions.SET_RESULTS_HITS: {
      return {
        ...state,
        results: {
          ...state.results,
          hits: action.payload,
        },
      }
    }
    case fromActions.SET_RESULTS_AGGREGATIONS: {
      return {
        ...state,
        results: {
          ...state.results,
          aggregations: action.payload,
        },
      }
    }
    case fromActions.SET_CONFIG_AGGREGATIONS: {
      return {
        ...state,
        config: {
          ...state.config,
          aggregations: action.payload,
        },
      }
    }
    case fromActions.UPDATE_REQUEST_AGGREGATION_TERM: {
      const config = state.config
      const aggregations = config.aggregations
      const terms = aggregations[action.key].terms
      const { increment, ...patch } = action.patch

      if (increment) {
        patch.size = terms.size + increment
      }
      return {
        ...state,
        config: {
          ...config,
          aggregations: {
            ...aggregations,
            [action.key]: {
              terms: {
                ...terms,
                ...patch,
              },
            },
          },
        },
      }
    }
    case fromActions.PATCH_RESULTS_AGGREGATIONS: {
      const clone = JSON.parse(JSON.stringify(state.results.aggregations))
      clone[action.key].buckets = action.payload[action.key].buckets

      return {
        ...state,
        results: {
          ...state.results,
          aggregations: clone,
        },
      }
    }
  }

  return state
}
