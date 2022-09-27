import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATIONS,
} from '../../router/constants'

marker('datahub.header.myfavorites')
marker('datahub.header.connex')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  @Input() expandRatio: number

  searchInputRouteValue$ = this.routerFacade.anySearch$.pipe(
    map((any) => ({ title: any }))
  )
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`

  ROUTE_NEWS = `${ROUTER_ROUTE_NEWS}`
  ROUTE_SEARCH = `${ROUTER_ROUTE_SEARCH}`
  ROUTE_ORGANISATIONS = `${ROUTER_ROUTE_ORGANISATIONS}`

  constructor(
    public routerFacade: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  currentRoutePath$ = this.routerFacade.currentRoute$.pipe(
    map((route) => route.url[0].path)
  )

  isAuthenticated$ = this.authService
    .authReady()
    .pipe(map((user) => !!user?.id))

  displayFavoritesBadge$: Observable<boolean> = combineLatest(
    this.currentRoutePath$,
    this.isAuthenticated$
  ).pipe(
    map(([path, authenticated]) => path === this.ROUTE_SEARCH && authenticated)
  )
  onFuzzySearchSelection(record: MetadataRecord) {
    this.routerFacade.goToMetadata(record)
  }

  updateSearch(): void {
    this.searchService.updateSearch({})
  }

  listFavorites(toggled: boolean): void {
    this.searchFacade.setFavoritesOnly(toggled)
  }
}
