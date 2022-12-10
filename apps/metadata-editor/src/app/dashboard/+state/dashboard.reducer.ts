import { Action, createReducer, on } from '@ngrx/store'
import { DashboardMenuItem } from '../dashboard.model'
import { SetActiveMenu } from './dashboard.actions'

export const EDITOR_DASHBOARD_FEATURE_STATE_KEY = 'editor-dashboard'

export interface EditorDashboardState {
  activeMenu: DashboardMenuItem
}

export const initialEditorDashboardState: EditorDashboardState = {
  activeMenu: 'my-org',
}

const dashboardReducer = createReducer(
  initialEditorDashboardState,
  on(SetActiveMenu, (state, { activeMenu }) => ({
    ...state,
    activeMenu,
  }))
)

export function reducer(
  state: EditorDashboardState | undefined,
  action: Action
) {
  return dashboardReducer(state, action)
}
