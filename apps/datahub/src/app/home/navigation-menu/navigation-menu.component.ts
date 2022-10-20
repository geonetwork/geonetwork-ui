import { Component, ChangeDetectionStrategy } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import {
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATIONS,
} from '../../router/constants'

marker('datahub.header.news')
marker('datahub.header.datasets')
marker('datahub.header.organisations')

@Component({
  selector: 'datahub-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuComponent {
  displayMobileMenu = false
  tabLinks = [
    {
      link: `${ROUTER_ROUTE_NEWS}`,
      label: 'datahub.header.news',
    },
    {
      link: `${ROUTER_ROUTE_SEARCH}`,
      label: 'datahub.header.datasets',
    },
    {
      link: `${ROUTER_ROUTE_ORGANISATIONS}`,
      label: 'datahub.header.organisations',
    },
  ]
  activeLabel = this.tabLinks[0].label
  setActiveLabel(el: HTMLElement) {
    this.activeLabel = el.textContent
  }
  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
}
