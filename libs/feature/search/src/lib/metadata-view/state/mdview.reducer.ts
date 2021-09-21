import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { Action, createReducer, on } from '@ngrx/store'
import * as MdViewActions from './mdview.actions'

export const MD_VIEW_FEATURE_STATE_KEY = 'mdView'

export interface MdViewState {
  loadingFull: boolean
  error: string | null
  metadata?: MetadataRecord
}

export const initialMdviewState: MdViewState = {
  error: null,
  loadingFull: false,
}

const mdViewReducer = createReducer(
  initialMdviewState,
  on(MdViewActions.loadFullMetadata, (state) => ({
    ...state,
    loadingFull: true,
  })),
  on(MdViewActions.setIncompleteMetadata, (state, { incomplete }) => ({
    ...state,
    metadata: incomplete,
  })),
  on(MdViewActions.loadFullSuccess, (state, { full }) => ({
    ...state,
    metadata: full,
    loadingFull: false,
  })),
  on(MdViewActions.loadFullFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFull: false,
  })),
  on(MdViewActions.close, (state) => {
    // eslint-disable-next-line
    const { metadata, ...stateWithoutMd } = state
    return stateWithoutMd
  })
)

export function reducer(state: MdViewState | undefined, action: Action) {
  return mdViewReducer(state, action)
}
