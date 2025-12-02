import { ViewportScroller } from '@angular/common'
import {
  importProvidersFrom,
  NgModule,
  provideNgReflectAttributes,
  inject,
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { Router, RouterModule } from '@angular/router'
import {
  LOGIN_URL,
  METADATA_LANGUAGE,
  provideGn4,
  provideRepositoryUrl,
} from '@geonetwork-ui/api/repository'
import {
  ORGANIZATION_PAGE_URL_TOKEN,
  ORGANIZATION_URL_TOKEN,
} from '@geonetwork-ui/feature/catalog'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import {
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  FeatureRecordModule,
  WEB_COMPONENT_EMBEDDER_URL,
} from '@geonetwork-ui/feature/record'
import {
  DefaultRouterModule,
  ROUTE_PARAMS,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_REUSE,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
  RouterService,
  SearchRouterContainerDirective,
} from '@geonetwork-ui/feature/router'
import {
  FeatureSearchModule,
  FILTER_GEOMETRY,
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import { LANGUAGES_LIST } from '@geonetwork-ui/ui/catalog'
import { THUMBNAIL_PLACEHOLDER } from '@geonetwork-ui/ui/elements'
import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from '@geonetwork-ui/ui/map'
import {
  getGlobalConfig,
  getMapContextLayerFromConfig,
  getOptionalMapConfig,
  getOptionalSearchConfig,
  getThemeConfig,
  TRANSLATE_WITH_OVERRIDES_CONFIG,
} from '@geonetwork-ui/util/app-config'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  getGeometryFromGeoJSON,
  handleScrollOnNavigation,
  PROXY_PATH,
  ThemeService,
} from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { SearchPageComponent } from './home/search/search-page/search-page.component'
import { OrganizationPageComponent } from './organization/organization-page/organization-page.component'
import {
  MAX_FEATURE_COUNT,
  REUSE_FORM_URL,
} from './record/record-data-preview/record-data-preview.component'
import { RecordPageComponent } from './record/record-page/record-page.component'
import { DatahubRouterService } from './router/datahub-router.service'

export const metaReducers: MetaReducer[] = !environment.production ? [] : []

// https://github.com/nrwl/nx/issues/191
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'disabled',
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
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: RecordPageComponent,
      serviceRouteComponent: RecordPageComponent,
      reuseRouteComponent: RecordPageComponent,
      organizationRouteComponent: OrganizationPageComponent,
    }),
    SearchRouterContainerDirective,
  ],
  providers: [
    provideNgReflectAttributes(),
    { provide: RouterService, useClass: DatahubRouterService },
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(FeatureRecordModule),
    importProvidersFrom(FeatureEditorModule),
    provideI18n(TRANSLATE_WITH_OVERRIDES_CONFIG),
    provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
    importProvidersFrom(EffectsModule.forRoot()),
    provideGn4(),
    provideAnimations(),
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
    {
      provide: RECORD_DATASET_URL_TOKEN,
      useValue: `${ROUTER_ROUTE_DATASET}/\${uuid}`,
    },
    {
      provide: RECORD_SERVICE_URL_TOKEN,
      useValue: `${ROUTER_ROUTE_SERVICE}/\${uuid}`,
    },
    {
      provide: RECORD_REUSE_URL_TOKEN,
      useValue: `${ROUTER_ROUTE_REUSE}/\${uuid}`,
    },
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
    {
      provide: REUSE_FORM_URL,
      useFactory: () => getGlobalConfig().REUSE_FORM_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  private router = inject(Router)
  private viewportScroller = inject(ViewportScroller)

  constructor() {
    // Disable automatic scroll restoration to avoid race conditions
    this.viewportScroller.setHistoryScrollRestoration('manual')
    handleScrollOnNavigation(this.router, this.viewportScroller)

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
