import { importProvidersFrom, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import {
  DefaultRouterModule,
  RouterService,
} from '@geonetwork-ui/feature/router'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { ThemeService } from '@geonetwork-ui/util/shared'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { extModules } from './build-specifics'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { EditorRouterService } from './router.service'
import {
  LOGIN_URL,
  LOGOUT_URL,
  provideGn4,
  provideRepositoryUrl,
  SETTINGS_URL,
} from '@geonetwork-ui/api/repository'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
      serviceRouteComponent: null,
      reuseRouteComponent: null,
      organizationRouteComponent: null,
    }),
    ...extModules,
  ],
  providers: [
    { provide: RouterService, useClass: EditorRouterService },
    importProvidersFrom(FeatureAuthModule),
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(FeatureCatalogModule),
    importProvidersFrom(FeatureRecordModule),
    importProvidersFrom(FeatureEditorModule),
    provideI18n(),
    provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
    importProvidersFrom(EffectsModule.forRoot()),
    provideGn4(),
    provideAnimations(),
    {
      provide: LOGIN_URL,
      useFactory: () => getGlobalConfig().LOGIN_URL,
    },
    {
      provide: LOGOUT_URL,
      useFactory: () => getGlobalConfig().LOGOUT_URL,
    },
    {
      provide: SETTINGS_URL,
      useFactory: () => getGlobalConfig().SETTINGS_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ThemeService.applyCssVariables(
      getThemeConfig().PRIMARY_COLOR,
      getThemeConfig().SECONDARY_COLOR,
      getThemeConfig().MAIN_COLOR,
      getThemeConfig().BACKGROUND_COLOR,
      getThemeConfig().MAIN_FONT || "'Inter', sans-serif",
      getThemeConfig().TITLE_FONT || "'Petrona', sans-serif",
      getThemeConfig().FONTS_STYLESHEET_URL || 'assets/css/default-fonts.css'
    )
  }
}
