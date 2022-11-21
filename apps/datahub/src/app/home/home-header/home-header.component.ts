import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MetadataRecord, SortByEnum } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import {
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATIONS,
} from '../../router/constants'

marker('datahub.header.myfavorites')
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

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`

  ROUTE_NEWS = `${ROUTER_ROUTE_NEWS}`
  ROUTE_SEARCH = `${ROUTER_ROUTE_SEARCH}`
  ROUTE_ORGANISATIONS = `${ROUTER_ROUTE_ORGANISATIONS}`
  SORT_BY_PARAMS = SortByEnum

  constructor(
    public routerFacade: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  isAuthenticated$ = this.authService
    .authReady()
    .pipe(map((user) => !!user?.id))

  onFuzzySearchSelection(record: MetadataRecord) {
    this.routerFacade.goToMetadata(record)
  }

  listFavorites(toggled: boolean): void {
    this.searchFacade.setFavoritesOnly(toggled)
  }

  clearSearchAndSort(param: SortByEnum): void {
    this.searchService.setSearch({})
    this.searchService.setSortBy(param)
  }
}
