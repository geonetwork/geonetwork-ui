import { inject, Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { DashboardMenuItem } from '../dashboard.model.js'
import { SetActiveMenu } from './dashboard.actions.js'
import { getActiveMenu } from './dashboard.selectors.js'

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private store = inject(Store)

  activeMenu$ = this.store.pipe(select(getActiveMenu))

  setActiveMenu(activeMenu: DashboardMenuItem) {
    this.store.dispatch(SetActiveMenu({ activeMenu }))
  }
}
