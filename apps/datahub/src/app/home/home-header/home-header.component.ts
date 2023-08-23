import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import {
  FieldsService,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import {
  getGlobalConfig,
  getOptionalSearchConfig,
  getThemeConfig,
  SearchConfig,
  SearchPreset,
} from '@geonetwork-ui/util/app-config'
import { SortByEnum, SortByField } from '@geonetwork-ui/common/domain/search'
import { map } from 'rxjs/operators'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'
import { lastValueFrom } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { sortByFromString } from '@geonetwork-ui/util/shared'

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

  ROUTE_SEARCH = `${ROUTER_ROUTE_SEARCH}`
  SORT_BY_PARAMS = SortByEnum
  searchConfig: SearchConfig = getOptionalSearchConfig()
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  constructor(
    public routerFacade: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private authService: AuthService,
    private fieldsService: FieldsService
  ) {}

  displaySortBadges$ = this.routerFacade.currentRoute$.pipe(
    map(
      (route) =>
        route.url[0].path === ROUTER_ROUTE_NEWS ||
        route.url[0].path === ROUTER_ROUTE_SEARCH
    )
  )

  isAuthenticated$ = this.authService
    .authReady()
    .pipe(map((user) => !!user?.id))

  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }

  listFavorites(toggled: boolean): void {
    this.searchFacade.setFavoritesOnly(toggled)
  }

  clearSearchAndSort(sort: SortByField): void {
    this.searchService.setSortAndFilters({}, sort)
  }

  async clearSearchAndFilterAndSort(customSearchParameters: SearchPreset) {
    const searchFilters = await lastValueFrom(
      this.fieldsService.buildFiltersFromFieldValues(
        customSearchParameters.filters
      )
    )
    this.searchService.setSortAndFilters(
      searchFilters,
      sortByFromString(customSearchParameters.sort)
    )
  }
}
