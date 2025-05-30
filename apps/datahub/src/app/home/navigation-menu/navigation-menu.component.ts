import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  ROUTER_ROUTE_SEARCH,
  RouterFacade,
} from '@geonetwork-ui/feature/router'
import { map } from 'rxjs/operators'
import {
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANIZATIONS,
} from '../../router/constants'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { matMenuOutline } from '@ng-icons/material-icons/outline'

marker('datahub.header.news')
marker('datahub.header.datasets')
marker('datahub.header.organizations')

@Component({
  selector: 'datahub-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
    provideIcons({
      matMenuOutline,
    }),
  ],
})
export class NavigationMenuComponent {
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
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
      link: `${ROUTER_ROUTE_ORGANIZATIONS}`,
      label: 'datahub.header.organizations',
    },
  ]

  activeLink$ = this.routerFacade.currentRoute$.pipe(
    map(
      (route) =>
        this.tabLinks.find((tab) => tab.link === route.url[0].path) || {
          link: '',
          label: '',
        }
    )
  )

  constructor(private routerFacade: RouterFacade) {}

  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
}
