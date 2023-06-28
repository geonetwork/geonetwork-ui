import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import {
  getOptionalSearchConfig,
  getThemeConfig,
  SearchConfig,
} from '@geonetwork-ui/util/app-config'
import {
  MetadataRecord,
  RawCustomSearchFilters,
  SearchFilters,
  SortByEnum,
} from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import { ROUTER_ROUTE_NEWS } from '../../router/constants'

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

  constructor(
    public routerFacade: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private authService: AuthService
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

  private mapArrayIntoSearchFiltersObject(
    customSearchParameters: RawCustomSearchFilters
  ): SearchFilters {
    const searchFilters = {}
    for (const [key, value] of Object.entries(customSearchParameters)) {
      if (value instanceof Array) {
        const searchFilterProperty = {}
        customSearchParameters[key].forEach((element) => {
          searchFilterProperty[element] = true
        })
        searchFilters[key] = searchFilterProperty
      } else if (key === 'any' && value) {
        searchFilters[key] = value
      }
    }

    return searchFilters
  }

  onFuzzySearchSelection(record: MetadataRecord) {
    this.routerFacade.goToMetadata(record)
  }

  listFavorites(toggled: boolean): void {
    this.searchFacade.setFavoritesOnly(toggled)
  }

  clearSearchAndSort(sort: SortByEnum): void {
    this.searchService.setSortAndFilters({}, sort)
  }

  clearSearchAndFilterAndSort(customSearchParameters: any): void {
    this.searchService.setSortAndFilters(
      this.mapArrayIntoSearchFiltersObject(customSearchParameters),
      customSearchParameters._sort
    )
  }
}
