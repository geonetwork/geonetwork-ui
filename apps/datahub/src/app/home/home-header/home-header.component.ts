import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  ROUTER_ROUTE_SEARCH,
  RouterFacade,
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
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { map } from 'rxjs/operators'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'
import { lastValueFrom } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { sortByFromString } from '@geonetwork-ui/util/shared'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

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
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  bannerKey = 'application-banner'
  translatedBannerMessage$ = this.platformService.translateKey(this.bannerKey)

  constructor(
    public routerFacade: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private platformService: PlatformServiceInterface,
    private fieldsService: FieldsService
  ) {}

  displaySortBadges$ = this.routerFacade.currentRoute$.pipe(
    map(
      (route) =>
        route.url[0].path === ROUTER_ROUTE_NEWS ||
        route.url[0].path === ROUTER_ROUTE_SEARCH
    )
  )

  isAuthenticated$ = this.platformService
    .isAnonymous()
    .pipe(map((isAnonymous) => !isAnonymous))

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
    if (customSearchParameters.sort) {
      const sortBy = sortByFromString(customSearchParameters.sort)
      this.searchService.setSortAndFilters(searchFilters, sortBy)
    } else {
      this.searchService.setFilters(searchFilters)
    }
  }
}
