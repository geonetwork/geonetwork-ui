import { createAction, props } from '@ngrx/store'
import { DashboardMenuItem } from '../dashboard.model.js'

export const SetActiveMenu = createAction(
  '[Dashboard] Set active menu',
  props<{ activeMenu: DashboardMenuItem }>()
)
