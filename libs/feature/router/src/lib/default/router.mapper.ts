import { Params } from '@angular/router'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { ROUTE_PARAMS_MAPPING } from './constants'

export function routeParamsToState(filters: Params): SearchFilters {
  return Object.keys(filters).reduce(
    (state, key) => ({
      ...state,
      [ROUTE_PARAMS_MAPPING[key]]:
        ROUTE_PARAMS_MAPPING[key] === 'any'
          ? filters[key]
          : { [filters[key]]: true },
    }),
    {}
  )
}

export function stateToRouteParams(filters: SearchFilters): Params {
  return Object.keys(filters).reduce(
    (state, key) => ({
      ...state,
      [Object.keys(ROUTE_PARAMS_MAPPING).find(
        (k) => ROUTE_PARAMS_MAPPING[k] === key
      )]: key === 'any' ? filters[key] : Object.keys(filters[key])[0],
    }),
    {}
  )
}
