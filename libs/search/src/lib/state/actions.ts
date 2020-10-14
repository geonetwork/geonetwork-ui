import { RecordSimple, SearchParams } from '@lib/common'
import { Action } from '@ngrx/store'

export const UPDATE_PARAMS = '[Search] Update Params'
export const SORT_BY = '[Search] Sort By'
export const ADD_RESULTS = '[Search] Add Results'
export const CLEAR_RESULTS = '[Search] Clear Results'
export const REQUEST_MORE_RESULTS = '[Search] Request More Results'

export class UpdateParams implements Action {
  readonly type = UPDATE_PARAMS

  constructor(public payload: SearchParams) {}
}

export class SortBy implements Action {
  readonly type = SORT_BY

  constructor(public sortBy: string) {}
}

export class AddResults implements Action {
  readonly type = ADD_RESULTS

  constructor(public payload: RecordSimple[]) {}
}

export class ClearResults implements Action {
  readonly type = CLEAR_RESULTS

  constructor() {}
}

export class RequestMoreResults implements Action {
  readonly type = REQUEST_MORE_RESULTS

  constructor() {}
}

export type SearchActions =
  | UpdateParams
  | SortBy
  | AddResults
  | ClearResults
  | RequestMoreResults
