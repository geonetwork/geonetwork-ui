export const ROUTER_STATE_KEY = 'router'

export const ROUTER_ROUTE_SEARCH = 'search'
export const ROUTER_ROUTE_DATASET = 'dataset'
export const ROUTER_ROUTE_ORGANIZATION = 'organization'

export enum ROUTE_PARAMS {
  SORT = '_sort',
  PUBLISHER = 'publisher', // FIXME: this shouldn't be here as it is a search field
  PAGE = '_page',
}
export type TimestampRange = { start?: number; end?: number }
export type SearchRouteParams = Record<
  string,
  string | string[] | number | TimestampRange
>
