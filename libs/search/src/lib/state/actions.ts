import { RecordSummary, SearchFilters } from '@lib/common'
import { Action } from '@ngrx/store'
import { SearchStateParams } from './reducer'

export const SET_FILTERS = '[Search] Set Filters'
export const UPDATE_FILTERS = '[Search] Update Filters'
export const SET_SEARCH = '[Search] Set overall search configuration'
export const SET_SORT_BY = '[Search] Sort By'
export const SET_RESULTS_LAYOUT = '[Search] Set results layout'
export const ADD_RESULTS = '[Search] Add Results'
export const CLEAR_RESULTS = '[Search] Clear Results'
export const REQUEST_MORE_RESULTS = '[Search] Request More Results'
export const SET_RESULTS_AGGREGATIONS = '[Search] Set Results Aggregations'
export const SET_RESULTS_HITS = '[Search] Set Results hits'
export const SET_CONFIG_AGGREGATIONS = '[Search] Set Config Aggregations'

export class SetFilters implements Action {
  readonly type = SET_FILTERS

  constructor(public payload: SearchFilters) {}
}

export class UpdateFilters implements Action {
  readonly type = UPDATE_FILTERS

  constructor(public payload: SearchFilters) {}
}

export class SetSearch implements Action {
  readonly type = SET_SEARCH

  constructor(public payload: SearchStateParams) {}
}

export class SetSortBy implements Action {
  readonly type = SET_SORT_BY

  constructor(public sortBy: string) {}
}

export class SetResultsLayout implements Action {
  readonly type = SET_RESULTS_LAYOUT

  constructor(public resultsLayout: string) {}
}

export class AddResults implements Action {
  readonly type = ADD_RESULTS

  constructor(public payload: RecordSummary[]) {}
}

export class ClearResults implements Action {
  readonly type = CLEAR_RESULTS

  constructor() {}
}

export class RequestMoreResults implements Action {
  readonly type = REQUEST_MORE_RESULTS

  constructor() {}
}

export class SetResultsAggregations implements Action {
  readonly type = SET_RESULTS_AGGREGATIONS

  constructor(public payload: any) {}
}

export class SetResultsHits implements Action {
  readonly type = SET_RESULTS_HITS

  constructor(public payload: any) {}
}

export class SetConfigAggregations implements Action {
  readonly type = SET_CONFIG_AGGREGATIONS

  constructor(public payload: any) {}
}

export type SearchActions =
  | SetFilters
  | UpdateFilters
  | SetSearch
  | SetSortBy
  | SetResultsLayout
  | AddResults
  | ClearResults
  | RequestMoreResults
  | SetResultsAggregations
  | SetResultsHits
  | SetConfigAggregations
