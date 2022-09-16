import {
  RequestFields,
  MetadataRecord,
  RESULTS_PAGE_SIZE,
  SearchFilters,
  StateConfigFilters,
} from '@geonetwork-ui/util/shared'
import * as fromActions from './actions'
import { DEFAULT_SEARCH_KEY } from './actions'
import { ES_SOURCE_SUMMARY } from '@geonetwork-ui/util/shared'

export const SEARCH_FEATURE_KEY = 'searchState'

export interface SearchStateParams {
  filters?: SearchFilters
  sortBy?: string
  size?: number
  from?: number
  favoritesOnly?: boolean
}

export type SearchError = {
  code: number
  message: string
} | null

export interface SearchStateSearch {
  config: {
    aggregations?: any
    filters?: StateConfigFilters
    source?: RequestFields
  }
  params: SearchStateParams
  results: {
    hits: {
      value: number
      eq: string
    }
    records: MetadataRecord[]
    aggregations: any
  }
  resultsLayout?: string
  loadingMore: boolean
  error: SearchError
}

export type SearchState = { [key: string]: SearchStateSearch }

export const initSearch = (): SearchStateSearch => {
  return {
    config: {
      filters: {},
      source: { includes: ES_SOURCE_SUMMARY },
    },
    params: {
      filters: {},
      size: RESULTS_PAGE_SIZE,
      from: 0,
      favoritesOnly: false,
    },
    results: {
      hits: null,
      records: [],
      aggregations: {},
    },
    loadingMore: false,
    error: null,
  }
}

export const initialState: SearchState = {
  [DEFAULT_SEARCH_KEY]: initSearch(),
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  const { id } = action
  if (id) {
    let stateSearch = state[id] || initSearch()
    if (action.type !== fromActions.ADD_SEARCH) {
      stateSearch = reducerSearch(stateSearch, action)
    }
    if (stateSearch) {
      return {
        ...state,
        [id]: stateSearch,
      }
    }
  }
  return state
}

export function reducerSearch(
  state: SearchStateSearch,
  action: fromActions.SearchActions
): SearchStateSearch {
  switch (action.type) {
    case fromActions.SET_CONFIG_FILTERS: {
      return {
        ...state,
        config: {
          ...state.config,
          filters: { ...action.payload },
        },
      }
    }
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
    case fromActions.SET_FAVORITES_ONLY: {
      return {
        ...state,
        params: {
          ...state.params,
          favoritesOnly: action.favoritesOnly,
        },
      }
    }
    case fromActions.SET_PAGINATION: {
      const { from, size } = action
      return {
        ...state,
        params: {
          ...state.params,
          from,
          size,
        },
      }
    }
    case fromActions.CLEAR_PAGINATION:
      return {
        ...state,
        params: {
          ...state.params,
          from: 0,
        },
      }
    case fromActions.SCROLL:
    case fromActions.PAGINATE: {
      const delta = (action as fromActions.Paginate).delta || state.params.size
      const from = Math.max(0, state.params.from + delta)
      return {
        ...state,
        params: {
          ...state.params,
          from,
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
    case fromActions.SET_CONFIG_REQUEST_FIELDS: {
      return {
        ...state,
        config: {
          ...state.config,
          source: action.payload,
        },
      }
    }
    case fromActions.UPDATE_REQUEST_AGGREGATION_TERM: {
      const config = state.config
      const aggregations = config.aggregations
      const terms = aggregations[action.key].terms
      const { increment, ...patch } = action.patch

      if (increment) {
        patch.size = (terms.size || 0) + increment
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

    case fromActions.SET_ERROR: {
      const { code, message } = action
      return {
        ...state,
        error: { code, message },
        loadingMore: false,
      }
    }

    case fromActions.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      }
    }
  }

  return state
}
