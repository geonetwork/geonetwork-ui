import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  ROUTER_ROUTE_SEARCH,
  RouterFacade,
} from '@geonetwork-ui/feature/router'
import {
  FieldsService,
  FuzzySearchComponent,
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
import { ROUTER_ROUTE_NEWS } from '../../router/constants.js'
import { lastValueFrom, of } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { sortByFromString } from '@geonetwork-ui/util/shared'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { CommonModule } from '@angular/common'
import { ApplicationBannerComponent } from '@geonetwork-ui/ui/elements'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { HeaderBadgeButtonComponent } from '../header-badge-button/header-badge-button.component.js'
import { RouterLink } from '@angular/router'
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component.js'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matStarOutline } from '@ng-icons/material-icons/outline'

marker('datahub.header.myfavorites')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ApplicationBannerComponent,
    TranslatePipe,
    TranslateDirective,
    HeaderBadgeButtonComponent,
    RouterLink,
    NavigationMenuComponent,
    LanguageSwitcherComponent,
    FuzzySearchComponent,
  ],
  providers: [
    provideIcons({
      matStarOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class HomeHeaderComponent {
  routerFacade = inject(RouterFacade)
  searchFacade = inject(SearchFacade)
  private searchService = inject(SearchService)
  private platformService = inject(PlatformServiceInterface)
  private fieldsService = inject(FieldsService)

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

  showFavoritesButton$ = this.platformService.supportsAuthentication()
    ? this.isAuthenticated$
    : of(false)

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
