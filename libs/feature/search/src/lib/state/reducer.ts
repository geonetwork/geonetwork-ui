import * as fromActions from './actions'
import { DEFAULT_SEARCH_KEY } from './actions'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  FieldName,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { DEFAULT_PAGE_SIZE, FIELDS_SUMMARY } from '../constants'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export const SEARCH_FEATURE_KEY = 'searchState'

export type SearchStateParams = {
  filters?: FieldFilters
  currentPage: number // zero-based
  pageSize: number
  sort?: SortByField
  fields?: FieldName[]
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
  loadingResults: boolean
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
      pageSize: DEFAULT_PAGE_SIZE,
      currentPage: 0,
      favoritesOnly: false,
      useSpatialFilter: true,
    },
    results: {
      count: 0,
      records: [],
      aggregations: {},
    },
    loadingResults: false,
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
    case fromActions.SET_PAGE_SIZE: {
      const { limit } = action
      return {
        ...state,
        params: {
          ...state.params,
          pageSize: limit,
        },
      }
    }
    case fromActions.PAGINATE: {
      return {
        ...state,
        params: {
          ...state.params,
          currentPage: action.pageNumber - 1,
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
        loadingResults: false,
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
        params: {
          ...state.params,
          currentPage: state.params.currentPage + 1,
        },
        loadingResults: true,
      }
    }
    case fromActions.REQUEST_NEW_RESULTS: {
      return {
        ...state,
        loadingResults: true,
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
        loadingResults: false,
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
