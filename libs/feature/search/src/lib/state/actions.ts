import {
  EsRequestAggTermPatch,
  MetadataRecord,
  RequestFields,
  SearchFilters,
  StateConfigFilters,
} from '@geonetwork-ui/util/shared'
import { Action } from '@ngrx/store'
import { SearchStateParams } from './reducer'

export const ADD_SEARCH = '[Search] Add search instance'

export const SET_FILTERS = '[Search] Set Filters'
export const SET_CONFIG_FILTERS = '[Search] Set config filters'
export const UPDATE_FILTERS = '[Search] Update Filters'
export const SET_SEARCH = '[Search] Set overall search configuration'
export const SET_FAVORITES_ONLY = '[Search] Favorites Only'
export const SET_SORT_BY = '[Search] Sort By'
export const SET_PAGINATION = '[Search] Set pagination'
export const PAGINATE = '[Search] Paginate'
export const SCROLL = '[Search] Scroll'
export const SET_RESULTS_LAYOUT = '[Search] Set results layout'
export const ADD_RESULTS = '[Search] Add Results'
export const CLEAR_PAGINATION = '[Search] Clear Paging'
export const CLEAR_RESULTS = '[Search] Clear Results'
export const REQUEST_MORE_RESULTS = '[Search] Request More Results'
export const SET_RESULTS_AGGREGATIONS = '[Search] Set Results Aggregations'
export const SET_RESULTS_HITS = '[Search] Set Results hits'
export const SET_CONFIG_AGGREGATIONS = '[Search] Set Config Aggregations'
export const SET_CONFIG_REQUEST_FIELDS = '[Search] Set Config requested fields'
export const REQUEST_MORE_ON_AGGREGATION =
  '[Search] Request More On Aggregation'
export const SET_INCLUDE_ON_AGGREGATION = '[Search] Set term include'
export const UPDATE_REQUEST_AGGREGATION_TERM =
  '[Search] Update request aggregation term'
export const PATCH_RESULTS_AGGREGATIONS = '[Search] Patch Results Aggregations'
export const SET_ERROR = '[Search] Set Error'
export const CLEAR_ERROR = '[Search] Clear Error'

export const DEFAULT_SEARCH_KEY = 'default'

export abstract class AbstractAction {
  id?: string
  protected constructor(id?: string) {
    this.id = id || DEFAULT_SEARCH_KEY
  }
}

export class AddSearch implements Action {
  readonly type = ADD_SEARCH
  constructor(public id: string) {}
}

export class SetConfigFilters extends AbstractAction implements Action {
  readonly type = SET_CONFIG_FILTERS

  constructor(public payload: StateConfigFilters, id?: string) {
    super(id)
  }
}

export class SetFilters extends AbstractAction implements Action {
  readonly type = SET_FILTERS

  constructor(public payload: SearchFilters, id?: string) {
    super(id)
  }
}

export class UpdateFilters extends AbstractAction implements Action {
  readonly type = UPDATE_FILTERS

  constructor(public payload: SearchFilters, id?: string) {
    super(id)
  }
}

export class SetSearch extends AbstractAction implements Action {
  readonly type = SET_SEARCH

  constructor(public payload: SearchStateParams, id?: string) {
    super(id)
  }
}

export class SetFavoritesOnly extends AbstractAction implements Action {
  readonly type = SET_FAVORITES_ONLY
  constructor(public favoritesOnly: boolean, id?: string) {
    super(id)
  }
}
export class SetSortBy extends AbstractAction implements Action {
  readonly type = SET_SORT_BY
  constructor(public sortBy: string, id?: string) {
    super(id)
  }
}

export class SetPagination extends AbstractAction implements Action {
  readonly type = SET_PAGINATION
  constructor(public from: number, public size: number, id?: string) {
    super(id)
  }
}

export class Paginate extends AbstractAction implements Action {
  readonly type = PAGINATE
  constructor(public delta: number, id?: string) {
    super(id)
  }
}

export class ClearPagination extends AbstractAction implements Action {
  readonly type = CLEAR_PAGINATION

  constructor(id?: string) {
    super(id)
  }
}

export class Scroll extends AbstractAction implements Action {
  readonly type = SCROLL
  constructor(id?: string) {
    super(id)
  }
}

export class SetResultsLayout extends AbstractAction implements Action {
  readonly type = SET_RESULTS_LAYOUT

  constructor(public resultsLayout: string, id?: string) {
    super(id)
  }
}

export class AddResults extends AbstractAction implements Action {
  readonly type = ADD_RESULTS

  constructor(public payload: MetadataRecord[], id?: string) {
    super(id)
  }
}

export class ClearResults extends AbstractAction implements Action {
  readonly type = CLEAR_RESULTS

  constructor(id?: string) {
    super(id)
  }
}

export class RequestMoreResults extends AbstractAction implements Action {
  readonly type = REQUEST_MORE_RESULTS

  constructor(id?: string) {
    super(id)
  }
}

export class SetResultsAggregations extends AbstractAction implements Action {
  readonly type = SET_RESULTS_AGGREGATIONS

  constructor(public payload: any, id?: string) {
    super(id)
  }
}

export class SetResultsHits extends AbstractAction implements Action {
  readonly type = SET_RESULTS_HITS
  constructor(public payload: any, id?: string) {
    super(id)
  }
}

export class SetConfigAggregations extends AbstractAction implements Action {
  readonly type = SET_CONFIG_AGGREGATIONS
  constructor(public payload: any, id?: string) {
    super(id)
  }
}

export class SetConfigRequestFields extends AbstractAction implements Action {
  readonly type = SET_CONFIG_REQUEST_FIELDS
  constructor(public payload: RequestFields, id?: string) {
    super(id)
  }
}

export class RequestMoreOnAggregation extends AbstractAction implements Action {
  readonly type = REQUEST_MORE_ON_AGGREGATION
  constructor(public key: string, public increment: number, id?: string) {
    super(id)
  }
}

export class SetIncludeOnAggregation extends AbstractAction implements Action {
  readonly type = SET_INCLUDE_ON_AGGREGATION
  constructor(public key: string, public include: string, id?: string) {
    super(id)
  }
}

export class UpdateRequestAggregationTerm
  extends AbstractAction
  implements Action
{
  readonly type = UPDATE_REQUEST_AGGREGATION_TERM
  constructor(
    public key: string,
    public patch: EsRequestAggTermPatch,
    id?: string
  ) {
    super(id)
  }
}

export class PatchResultsAggregations extends AbstractAction implements Action {
  readonly type = PATCH_RESULTS_AGGREGATIONS

  constructor(public key: string, public payload: any, id?: string) {
    super(id)
  }
}

export class SetError extends AbstractAction implements Action {
  readonly type = SET_ERROR

  constructor(public code: number, public message: string, id?: string) {
    super(id)
  }
}

export class ClearError extends AbstractAction implements Action {
  readonly type = CLEAR_ERROR

  constructor(id?: string) {
    super(id)
  }
}

export type SearchActions =
  | AddSearch
  | SetConfigFilters
  | SetFilters
  | UpdateFilters
  | SetSearch
  | SetFavoritesOnly
  | SetSortBy
  | SetPagination
  | Paginate
  | Scroll
  | SetResultsLayout
  | AddResults
  | ClearPagination
  | ClearResults
  | RequestMoreResults
  | SetResultsAggregations
  | SetResultsHits
  | SetConfigAggregations
  | SetConfigRequestFields
  | RequestMoreOnAggregation
  | SetIncludeOnAggregation
  | UpdateRequestAggregationTerm
  | PatchResultsAggregations
  | SetError
  | ClearError
