import { QueryParamsHandling } from '@angular/router'
import { createAction, props } from '@ngrx/store'

export interface RouterGoActionPayload {
  path: string
  query?: Record<string, unknown>
  queryParamsHandling?: QueryParamsHandling
}

export const goAction = createAction(
  '[Router] Go',
  props<RouterGoActionPayload>()
)
export const backAction = createAction('[Router] Back')
export const forwardAction = createAction('[Router] Forward')
