import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  EDITOR_DASHBOARD_FEATURE_STATE_KEY,
  EditorDashboardState,
} from './dashboard.reducer'

export const getMdViewState = createFeatureSelector<EditorDashboardState>(
  EDITOR_DASHBOARD_FEATURE_STATE_KEY
)

export const getActiveMenu = createSelector(
  getMdViewState,
  (state: EditorDashboardState) => state.activeMenu
)
