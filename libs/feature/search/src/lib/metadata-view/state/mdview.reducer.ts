import { Action, createReducer, on } from '@ngrx/store'
import * as MdViewActions from './mdview.actions'

export const MD_VIEW_FEATURE_STATE_KEY = 'mdView'

export interface MdviewState {
  uuid?: string
}

export const initialMdviewState: MdviewState = {}

const mdViewReducer = createReducer(
  initialMdviewState,
  on(MdViewActions.setUuid, (state, { uuid }) => ({ ...state, uuid }))
)

export function reducer(state: MdviewState | undefined, action: Action) {
  return mdViewReducer(state, action)
}
