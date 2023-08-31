import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { DashboardFacade } from '../+state/dashboard.facade'
import { DashboardMenuItem, DashboardMenuItemArray } from '../dashboard.model'

@Component({
  selector: 'md-editor-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuComponent implements OnInit {
  constructor(
    private facade: DashboardFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const activeRoute = this.router.url
    DashboardMenuItemArray.forEach((routeMapping) => {
      if (activeRoute === routeMapping.route) {
        this.setActive(routeMapping.menuItem)
      }
    })
  }

  private setActive(activeMenu: DashboardMenuItem) {
    this.facade.setActiveMenu(activeMenu)
  }

  isActive$(menu: DashboardMenuItem) {
    return this.facade.activeMenu$.pipe(
      map((activeMenu) => activeMenu === menu)
    )
  }

  onClick(destination: string, activeMenu: DashboardMenuItem) {
    this.setActive(activeMenu)
    this.router.navigateByUrl(destination)
  }
}
