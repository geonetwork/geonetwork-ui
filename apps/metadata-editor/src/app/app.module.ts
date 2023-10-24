import { importProvidersFrom, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import {
  DefaultRouterModule,
  RouterService,
} from '@geonetwork-ui/feature/router'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { ThemeService } from '@geonetwork-ui/util/shared'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { extModules } from './build-specifics'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { EditorRouterService } from './router.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    DefaultRouterModule.forRoot({
      searchStateId: 'editor',
      searchRouteComponent: DashboardPageComponent,
      recordRouteComponent: null,
    }),
    ...extModules,
  ],
  providers: [
    { provide: RouterService, useClass: EditorRouterService },
    importProvidersFrom(FeatureAuthModule),
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(FeatureCatalogModule),
    importProvidersFrom(FeatureRecordModule),
    importProvidersFrom(UtilI18nModule),
    importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: getGlobalConfig().GN4_API_URL,
        }),
    },
    importProvidersFrom(EffectsModule.forRoot()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR || '#555',
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Rubik', sans-serif",
      getThemeConfig().TITLE_FONT || "'Readex Pro', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL ||
        'https://fonts.googleapis.com/css2?family=Readex+Pro&family=Rubik&display=swap'
    )
  }
}
