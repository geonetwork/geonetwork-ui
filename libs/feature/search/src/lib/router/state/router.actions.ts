import { createAction, props } from '@ngrx/store'

export interface RouterGoActionPayload {
  path: string
  query?: Record<string, unknown>
}

export const goAction = createAction(
  '[Router] Go',
  props<RouterGoActionPayload>()
)
export const backAction = createAction('[Router] Back')
export const forwardAction = createAction('[Router] Forward')
