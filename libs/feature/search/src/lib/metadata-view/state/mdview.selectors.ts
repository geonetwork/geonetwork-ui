import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MD_VIEW_FEATURE_STATE_KEY, MdviewState } from './mdview.reducer'

export const getMdViewState = createFeatureSelector<MdviewState>(
  MD_VIEW_FEATURE_STATE_KEY
)

export const getMdViewUuid = createSelector(
  getMdViewState,
  (state: MdviewState) => state.uuid
)
