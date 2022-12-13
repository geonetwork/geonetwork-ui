import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { DashboardMenuItem } from '../dashboard.model'
import { SetActiveMenu } from './dashboard.actions'
import { getActiveMenu } from './dashboard.selectors'

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  activeMenu$ = this.store.pipe(select(getActiveMenu))

  setActiveMenu(activeMenu: DashboardMenuItem) {
    this.store.dispatch(SetActiveMenu({ activeMenu }))
  }

  constructor(private store: Store) {}
}
