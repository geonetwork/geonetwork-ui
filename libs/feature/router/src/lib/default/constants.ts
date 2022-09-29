export const ROUTER_STATE_KEY = 'router'

export const ROUTER_ROUTE_SEARCH = 'search'
export const ROUTER_ROUTE_DATASET = 'dataset'

export enum ROUTE_PARAMS {
  ANY = 'q',
  PUBLISHER = 'publisher',
}
export type SearchRouteParams = Partial<Record<ROUTE_PARAMS, string>>
export const ROUTE_PARAMS_MAPPING: SearchRouteParams = {
  [ROUTE_PARAMS.ANY]: 'any',
  [ROUTE_PARAMS.PUBLISHER]: 'OrgForResource',
}
