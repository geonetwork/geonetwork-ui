import { RecordSummary } from '@geonetwork-ui/util/shared'
import { Action, createReducer, on } from '@ngrx/store'
import * as MdViewActions from './mdview.actions'

export const MD_VIEW_FEATURE_STATE_KEY = 'mdView'

export interface MdViewState {
  uuid?: string
  preview?: RecordSummary
  full?: RecordSummary
}

export const initialMdviewState: MdViewState = {}

const mdViewReducer = createReducer(
  initialMdviewState,
  on(MdViewActions.setUuid, (state, { uuid }) => ({ ...state, uuid })),
  on(MdViewActions.setPreview, (state, { preview }) => ({ ...state, preview })),
  on(MdViewActions.setFull, (state, { full }) => ({ ...state, full }))
)

export function reducer(state: MdViewState | undefined, action: Action) {
  return mdViewReducer(state, action)
}
