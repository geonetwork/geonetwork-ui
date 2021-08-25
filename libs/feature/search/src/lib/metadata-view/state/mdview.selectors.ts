import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MD_VIEW_FEATURE_STATE_KEY, MdViewState } from './mdview.reducer'

export const getMdViewState = createFeatureSelector<MdViewState>(
  MD_VIEW_FEATURE_STATE_KEY
)

export const getMdViewUuid = createSelector(
  getMdViewState,
  (state: MdViewState) => state.uuid
)
export const getMdViewPreview = createSelector(
  getMdViewState,
  (state: MdViewState) => state.preview
)
export const getMdViewFull = createSelector(
  getMdViewState,
  (state: MdViewState) => state.full
)
export const getMdViewLoading = createSelector(
  getMdViewState,
  (state: MdViewState) => state.loading
)
export const getMdViewError = createSelector(
  getMdViewState,
  (state: MdViewState) => state.error
)
