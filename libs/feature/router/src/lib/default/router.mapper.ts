import { Params } from '@angular/router'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { ROUTE_PARAMS, ROUTE_PARAMS_MAPPING } from './constants'

function isSearchFilterParam(param: string): boolean {
  return !param.startsWith('_')
}

export function getSearchFilters(routeSearchParams: Params): Params {
  return Object.keys(routeSearchParams)
    .filter(isSearchFilterParam)
    .reduce(
      (searchFilters, paramName) => ({
        ...searchFilters,
        [paramName]: routeSearchParams[paramName],
      }),
      {}
    )
}

export function getSortBy(routeSearchParams: Params) {
  return routeSearchParams[ROUTE_PARAMS.SORT] ?? ''
}

export function routeParamsToState(filters: Params) {
  return Object.keys(filters).reduce((state, key) => {
    const paramName = key
    const paramValue = filters[key]
    const filterName = ROUTE_PARAMS_MAPPING[key]

    if (filterName === 'any') {
      return { ...state, [filterName]: paramValue }
    } else if (Array.isArray(paramValue)) {
      return {
        ...state,
        [filterName]: paramValue.reduce(
          (params, value) => ({
            ...params,
            [value]: true,
          }),
          {}
        ),
      }
    } else {
      return {
        ...state,
        [filterName]: { [paramValue]: true },
      }
    }
  }, {})
}

export function stateToRouteParams(filters: SearchFilters): Params {
  return Object.keys(filters).reduce((state, key) => {
    const paramName = Object.keys(ROUTE_PARAMS_MAPPING).find(
      (k) => ROUTE_PARAMS_MAPPING[k] === key
    )

    if (!paramName) return state // filter name is not mapped
    const filterValue = filters[key]
    let paramValue: string | string[] = ''
    if (typeof filterValue === 'string') paramValue = filterValue
    else paramValue = Object.keys(filterValue).filter((v) => filterValue[v])
    return {
      ...state,
      [paramName]: paramValue,
    }
  }, {})
}
