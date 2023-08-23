import * as fromActions from './actions'
import { DEFAULT_SEARCH_KEY } from './actions'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  FieldName,
  SearchParams,
} from '@geonetwork-ui/common/domain/search'
import { DEFAULT_PAGE_SIZE, FIELDS_SUMMARY } from '../constants'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

export const SEARCH_FEATURE_KEY = 'searchState'

export type SearchStateParams = SearchParams & {
  favoritesOnly?: boolean
  useSpatialFilter?: boolean
}

export type SearchError = {
  code: number
  message: string
} | null

export interface SearchStateSearch {
  config: {
    aggregations: AggregationsParams
    filters: FieldFilters
    source: FieldName[]
  }
  params: SearchStateParams
  results: {
    count: number
    records: CatalogRecord[]
    aggregations: Aggregations
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
      source: FIELDS_SUMMARY,
      aggregations: {},
    },
    params: {
      filters: {},
      limit: DEFAULT_PAGE_SIZE,
      offset: 0,
      favoritesOnly: false,
      useSpatialFilter: true,
    },
    results: {
      count: 0,
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
          sort: action.sortBy,
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
      const { offset, limit } = action
      return {
        ...state,
        params: {
          ...state.params,
          limit,
          offset,
        },
      }
    }
    case fromActions.CLEAR_PAGINATION:
      return {
        ...state,
        params: {
          ...state.params,
          offset: 0,
        },
      }
    case fromActions.SCROLL:
    case fromActions.PAGINATE: {
      const delta = (action as fromActions.Paginate).delta || state.params.limit
      const offset = Math.max(0, state.params.offset + delta)
      return {
        ...state,
        params: {
          ...state.params,
          offset,
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
          count: action.payload,
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
    case fromActions.UPDATE_CONFIG_AGGREGATIONS: {
      return {
        ...state,
        config: {
          ...state.config,
          aggregations: { ...state.config.aggregations, ...action.payload },
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
    case fromActions.REQUEST_MORE_ON_AGGREGATION: {
      const config = state.config
      const aggregation = config.aggregations[action.aggregationName]
      if (aggregation.type !== 'terms') return state
      return {
        ...state,
        config: {
          ...config,
          aggregations: {
            ...config.aggregations,
            [action.aggregationName]: {
              ...aggregation,
              limit: aggregation.limit + action.increment,
            },
          },
        },
      }
    }
    case fromActions.SET_INCLUDE_ON_AGGREGATION: {
      const config = state.config
      const aggregation = config.aggregations[action.aggregationName]
      if (aggregation.type !== 'terms') return state
      return {
        ...state,
        config: {
          ...config,
          aggregations: {
            ...config.aggregations,
            [action.aggregationName]: {
              ...aggregation,
              filter: action.include,
            },
          },
        },
      }
    }
    case fromActions.PATCH_RESULTS_AGGREGATIONS: {
      return {
        ...state,
        results: {
          ...state.results,
          aggregations: {
            ...state.results.aggregations,
            [action.aggregationName]: action.payload,
          },
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

    case fromActions.SET_SPATIAL_FILTER_ENABLED: {
      return {
        ...state,
        params: {
          ...state.params,
          useSpatialFilter: action.enabled,
        },
      }
    }
  }

  return state
}
