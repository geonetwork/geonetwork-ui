import { DOCUMENT } from '@angular/common'
import { Inject, NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { Event, Router, RouterModule, Scroll } from '@angular/router'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import {
  DefaultRouterModule,
  RouterService,
  ROUTER_ROUTE_DATASET,
} from '@geonetwork-ui/feature/router'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { RESULTS_LAYOUT_CONFIG, UiSearchModule } from '@geonetwork-ui/ui/search'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  getDefaultLang,
  getLangFromBrowser,
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import {
  METADATA_LANGUAGE,
  PROXY_PATH,
  ThemeService,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { filter } from 'rxjs/operators'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { DATAHUB_RESULTS_LAYOUT_CONFIG } from './app.config'
import { HeaderBadgeButtonComponent } from './home/header-badge-button/header-badge-button.component'
import { HeaderRecordComponent } from './record/header-record/header-record.component'
import { RecordPageComponent } from './record/record-page/record-page.component'
import { RecordPreviewDatahubComponent } from './home/search/record-preview-datahub/record-preview-datahub.component'
import { HomeHeaderComponent } from './home/home-header/home-header.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { SearchSummaryComponent } from './home/search/search-summary/search-summary.component'
import { NavigationBarComponent } from './record/navigation-bar/navigation-bar.component'
import {
  THUMBNAIL_PLACEHOLDER,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { NewsPageComponent } from './home/news-page/news-page.component'
import { DatahubRouterService } from './router/datahub-router.service'
import { OrganisationsPageComponent } from './home/organisations-page/organisations-page.component'
import { SearchPageComponent } from './home/search/search-page/search-page.component'
import { LastCreatedComponent } from './home/news-page/last-created/last-created.component'
import { KeyFiguresComponent } from './home/news-page/key-figures/key-figures.component'

export const metaReducers: MetaReducer[] = !environment.production ? [] : []
// https://github.com/nrwl/nx/issues/191

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RecordPreviewDatahubComponent,
    HomeHeaderComponent,
    HeaderBadgeButtonComponent,
    HeaderRecordComponent,
    RecordPageComponent,
    SearchSummaryComponent,
    NavigationBarComponent,
    NewsPageComponent,
    OrganisationsPageComponent,
    SearchPageComponent,
    LastCreatedComponent,
    KeyFiguresComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    FeatureSearchModule,
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: RecordPageComponent,
    }),
    FeatureRecordModule,
    FeatureCatalogModule,
    UiSearchModule,
    UtilSharedModule,
    MatIconModule,
    UiInputsModule,
    UiLayoutModule,
    UiElementsModule,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DATAHUB_RESULTS_LAYOUT_CONFIG },
    { provide: RouterService, useClass: DatahubRouterService },
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: getGlobalConfig().GN4_API_URL,
        }),
    },
    {
      provide: PROXY_PATH,
      useFactory: () => getGlobalConfig().PROXY_PATH,
    },
    {
      provide: METADATA_LANGUAGE,
      useFactory: () => getGlobalConfig().METADATA_LANGUAGE,
    },
    {
      provide: THUMBNAIL_PLACEHOLDER,
      useFactory: () => getThemeConfig().THUMBNAIL_PLACEHOLDER,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    translate: TranslateService,
    router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    translate.setDefaultLang(getDefaultLang())
    translate.use(getLangFromBrowser() || getDefaultLang())
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR,
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Rubik', sans-serif",
      getThemeConfig().TITLE_FONT || "'Readex Pro', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL ||
        'https://fonts.googleapis.com/css2?family=Readex+Pro&family=Rubik&display=swap'
    )
    ThemeService.generateBgOpacityClasses(
      'primary',
      getThemeConfig().PRIMARY_COLOR,
      [10, 25]
    )

    router.events
      .pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
        } else {
          if (e.routerEvent.url.startsWith(`/${ROUTER_ROUTE_DATASET}`)) {
            const recordPageElement = document.getElementById('record-page')
            if (recordPageElement) {
              recordPageElement.scrollTo({
                top: 0,
              })
            }
          }
        }
      })
  }
}
