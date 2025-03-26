import { DOCUMENT } from '@angular/common'
import { importProvidersFrom, Inject, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router, RouterModule } from '@angular/router'
import {
  FeatureCatalogModule,
  OrganisationsComponent,
  ORGANIZATION_PAGE_URL_TOKEN,
  ORGANIZATION_URL_TOKEN,
} from '@geonetwork-ui/feature/catalog'
import {
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  FeatureRecordModule,
  GN_UI_VERSION,
  WEB_COMPONENT_EMBEDDER_URL,
  RecordMetaComponent,
} from '@geonetwork-ui/feature/record'
import {
  DefaultRouterModule,
  ROUTE_PARAMS,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_SEARCH,
  RouterService,
} from '@geonetwork-ui/feature/router'
import {
  FeatureSearchModule,
  FILTER_GEOMETRY,
  RECORD_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import {
  THUMBNAIL_PLACEHOLDER,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { GpfApiDlComponent } from '@geonetwork-ui/feature/record'
import {
  getGlobalConfig,
  getMapContextLayerFromConfig,
  getOptionalMapConfig,
  getOptionalSearchConfig,
  getThemeConfig,
  TRANSLATE_WITH_OVERRIDES_CONFIG,
} from '@geonetwork-ui/util/app-config'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import {
  getGeometryFromGeoJSON,
  PROXY_PATH,
  ThemeService,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { HeaderBadgeButtonComponent } from './home/header-badge-button/header-badge-button.component'
import { HomeHeaderComponent } from './home/home-header/home-header.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { KeyFiguresComponent } from './home/news-page/key-figures/key-figures.component'
import { LastCreatedComponent } from './home/news-page/last-created/last-created.component'
import { NewsPageComponent } from './home/news-page/news-page.component'
import { OrganisationsPageComponent } from './home/organisations-page/organisations-page.component'
import { SearchPageComponent } from './home/search/search-page/search-page.component'
import { SearchFiltersComponent } from './home/search/search-filters/search-filters.component'
import { NavigationBarComponent } from './record/navigation-bar/navigation-bar.component'
import { RecordPageComponent } from './record/record-page/record-page.component'
import { DatahubRouterService } from './router/datahub-router.service'
import { NavigationMenuComponent } from './home/navigation-menu/navigation-menu.component'
import { FormsModule } from '@angular/forms'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import {
  LANGUAGES_LIST,
  LanguageSwitcherComponent,
} from '@geonetwork-ui/ui/catalog'
import {
  LOGIN_URL,
  METADATA_LANGUAGE,
  provideGn4,
  provideRepositoryUrl,
} from '@geonetwork-ui/api/repository'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { LetDirective } from '@ngrx/component'
import { OrganizationPageComponent } from './organization/organization-page/organization-page.component'

import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from '@geonetwork-ui/ui/map'
import {
  matAddOutline,
  matExpandMoreOutline,
  matMenuOutline,
  matMoreHorizOutline,
  matRemoveOutline,
  matStarOutline,
  matWarningAmberOutline,
} from '@ng-icons/material-icons/outline'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { MAX_FEATURE_COUNT } from './record/record-data-preview/record-data-preview.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

export const metaReducers: MetaReducer[] = !environment.production ? [] : []

// https://github.com/nrwl/nx/issues/191
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeHeaderComponent,
    HeaderBadgeButtonComponent,
    SearchFiltersComponent,
    NewsPageComponent,
    OrganisationsPageComponent,
    SearchPageComponent,
    LastCreatedComponent,
    KeyFiguresComponent,
    NavigationMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    !environment.production
      ? StoreDevtoolsModule.instrument({ connectInZone: true })
      : [],
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_WITH_OVERRIDES_CONFIG),
    FeatureSearchModule,
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: RecordPageComponent,
      organizationRouteComponent: OrganizationPageComponent,
    }),
    FeatureRecordModule,
    FeatureCatalogModule,
    UiSearchModule,
    UtilSharedModule,
    UiLayoutModule,
    UiElementsModule,
    UiDatavizModule,
    FormsModule,
    UiInputsModule,
    MatTabsModule,
    UiWidgetsModule,
    RecordMetaComponent,
    LetDirective,
    // FIXME: these imports are required by non-standalone components and should be removed once all components have been made standalone
    NgIconsModule.withIcons({
      matMenuOutline,
      matRemoveOutline,
      matMoreHorizOutline,
      matAddOutline,
      matExpandMoreOutline,
      matStarOutline,
      matWarningAmberOutline,
    }),
    OrganisationsComponent,
    LanguageSwitcherComponent,
    NavigationBarComponent,
    MatButtonToggleModule,
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
    importProvidersFrom(FeatureAuthModule),
    provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
    provideGn4(),
    { provide: RouterService, useClass: DatahubRouterService },
    { provide: GN_UI_VERSION, useValue: environment.version },
    {
      provide: PROXY_PATH,
      useFactory: () => getGlobalConfig().PROXY_PATH,
    },
    {
      provide: LOGIN_URL,
      useFactory: () => getGlobalConfig().LOGIN_URL,
    },
    {
      provide: WEB_COMPONENT_EMBEDDER_URL,
      useFactory: () => getGlobalConfig().WEB_COMPONENT_EMBEDDER_URL,
    },
    {
      provide: METADATA_LANGUAGE,
      useFactory: () => getGlobalConfig().METADATA_LANGUAGE,
    },
    {
      provide: THUMBNAIL_PLACEHOLDER,
      useFactory: () => getThemeConfig().THUMBNAIL_PLACEHOLDER,
    },
    {
      provide: LANGUAGES_LIST,
      useFactory: () => getGlobalConfig().LANGUAGES,
    },
    {
      provide: FILTER_GEOMETRY,
      useFactory: () => {
        if (getOptionalSearchConfig()?.FILTER_GEOMETRY_DATA) {
          return Promise.resolve(
            JSON.parse(getOptionalSearchConfig().FILTER_GEOMETRY_DATA)
          ).then(getGeometryFromGeoJSON)
        }
        if (getOptionalSearchConfig()?.FILTER_GEOMETRY_URL) {
          return fetch(getOptionalSearchConfig().FILTER_GEOMETRY_URL)
            .then((resp) => resp.json())
            .then(getGeometryFromGeoJSON)
            .catch(() =>
              console.log(
                'No spatial filter was applied since a valid geometry could not be found'
              )
            )
        }
        return null
      },
    },
    { provide: RECORD_URL_TOKEN, useValue: `${ROUTER_ROUTE_DATASET}/\${uuid}` },
    {
      provide: ORGANIZATION_PAGE_URL_TOKEN,
      useValue: `${ROUTER_ROUTE_ORGANIZATION}/\${name}`,
    },
    {
      provide: ORGANIZATION_URL_TOKEN,
      useValue: `${ROUTER_ROUTE_SEARCH}?${ROUTE_PARAMS.PUBLISHER}=\${name}`,
    },
    {
      provide: DO_NOT_USE_DEFAULT_BASEMAP,
      useFactory: () => getOptionalMapConfig()?.DO_NOT_USE_DEFAULT_BASEMAP,
    },
    {
      provide: BASEMAP_LAYERS,
      useFactory: () =>
        getOptionalMapConfig()?.MAP_LAYERS.map(getMapContextLayerFromConfig) ??
        [],
    },
    {
      provide: MAP_VIEW_CONSTRAINTS,
      useFactory: () => ({
        maxExtent: getOptionalMapConfig()?.MAX_EXTENT,
        maxZoom: getOptionalMapConfig()?.MAX_ZOOM,
      }),
    },
    {
      provide: MAX_FEATURE_COUNT,
      useFactory: () => getOptionalMapConfig()?.MAX_FEATURE_COUNT,
    },
    {
      provide: EXTERNAL_VIEWER_URL_TEMPLATE,
      useFactory: () => getOptionalMapConfig()?.EXTERNAL_VIEWER_URL_TEMPLATE,
    },
    {
      provide: EXTERNAL_VIEWER_OPEN_NEW_TAB,
      useFactory: () => getOptionalMapConfig()?.EXTERNAL_VIEWER_OPEN_NEW_TAB,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR,
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Rubik', sans-serif",
      getThemeConfig().TITLE_FONT || "'Readex Pro', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL || 'assets/css/default-fonts.css'
    )
    ThemeService.generateBgOpacityClasses(
      'primary',
      getThemeConfig().PRIMARY_COLOR,
      [10, 25, 50, 75, 100]
    )
  }
}
