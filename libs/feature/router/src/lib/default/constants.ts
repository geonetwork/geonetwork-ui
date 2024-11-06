import { DateRange } from '@geonetwork-ui/api/repository'
// import { FieldsService, FieldValue } from '@geonetwork-ui/feature/search'

export const ROUTER_STATE_KEY = 'router'

export const ROUTER_ROUTE_SEARCH = 'search'
export const ROUTER_ROUTE_DATASET = 'dataset'
export const ROUTER_ROUTE_ORGANIZATION = 'organization'

export enum ROUTE_PARAMS {
  SORT = '_sort',
  PUBLISHER = 'publisher', // FIXME: this shouldn't be here as it is a search field
  PAGE = '_page',
}
export type SearchRouteParams = Record<
  string,
  string | string[] | number | DateRange
>
//TODO: type RouteParamKey correctly
// type RouteParamKey = ROUTE_PARAMS[string] | FieldsService['fields'][string]
// export type SearchRouteParams = Record<
//   RouteParamKey,
//   FieldValue[] | FieldValue | DateRange
// >
