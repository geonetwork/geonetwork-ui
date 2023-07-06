export const ROUTER_STATE_KEY = 'router'

export const ROUTER_ROUTE_SEARCH = 'search'
export const ROUTER_ROUTE_DATASET = 'dataset'

export enum ROUTE_PARAMS {
  SORT = '_sort',
  PUBLISHER = 'publisher',
}
export type SearchRouteParams = Record<string, string | string[] | number>
