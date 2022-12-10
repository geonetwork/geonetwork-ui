import { ChangeDetectionStrategy, Component } from '@angular/core'
import { map } from 'rxjs/operators'
import { DashboardFacade } from '../+state/dashboard.facade'
import { DashboardMenuItem } from '../dashboard.model'

@Component({
  selector: 'md-editor-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuComponent {
  constructor(private facade: DashboardFacade) {}
  setActive(activeMenu: DashboardMenuItem) {
    this.facade.setActiveMenu(activeMenu)
  }
  isActive$(menu: DashboardMenuItem) {
    return this.facade.activeMenu$.pipe(
      map((activeMenu) => activeMenu === menu)
    )
  }
}
