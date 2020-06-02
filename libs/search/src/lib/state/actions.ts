import { SearchParams } from '../model'
import { Action } from '@ngrx/store'

export const UPDATE_PARAMS = '[Search] Update Params'
export const SORT_BY = '[Search] Sort By'

export class UpdateParams implements Action {
  readonly type = UPDATE_PARAMS

  constructor(public payload: SearchParams) {}
}

export class SortBy implements Action {
  readonly type = SORT_BY

  constructor(public sortBy: string) {}
}

export type SearchActions = UpdateParams | SortBy
