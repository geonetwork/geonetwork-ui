import { RecordSummary } from '@geonetwork-ui/util/shared'
import { Action, createReducer, on } from '@ngrx/store'
import * as MdViewActions from './mdview.actions'

export const MD_VIEW_FEATURE_STATE_KEY = 'mdView'

export interface MdViewState {
  uuid?: string
  preview?: RecordSummary
  full?: RecordSummary
  loading?: boolean
  error: string | null
}

export const initialMdviewState: MdViewState = {
  error: null,
  loading: false,
}

const mdViewReducer = createReducer(
  initialMdviewState,
  on(MdViewActions.loadFull, (state, { uuid }) => ({
    ...state,
    uuid,
    loading: true,
  })),
  on(MdViewActions.setPreview, (state, { preview }) => ({ ...state, preview })),
  on(MdViewActions.loadFullSuccess, (state, { full }) => ({
    ...state,
    full,
    loading: false,
  })),
  on(MdViewActions.loadFullFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(MdViewActions.close, (state) => {
    const { uuid, preview, full, ...stateWithoutMd } = state
    return {
      ...stateWithoutMd,
    }
  })
)

export function reducer(state: MdViewState | undefined, action: Action) {
  return mdViewReducer(state, action)
}
