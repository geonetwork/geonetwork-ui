import { ViewportScroller } from '@angular/common'
import { importProvidersFrom, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { Router, RouterModule } from '@angular/router'
import {
  LOGIN_URL,
  LOGOUT_URL,
  provideGn4,
  provideRepositoryUrl,
  SETTINGS_URL,
} from '@geonetwork-ui/api/repository'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import {
  DefaultRouterModule,
  RouterService,
  SearchRouterContainerDirective,
} from '@geonetwork-ui/feature/router'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  handleScrollOnNavigation,
  ThemeService,
} from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { extModules } from './build-specifics'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { EditorRouterService } from './router.service'

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
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'disabled',
    }),
    DefaultRouterModule.forRoot({
      searchStateId: 'editor',
      searchRouteComponent: DashboardPageComponent,
      recordRouteComponent: null,
      serviceRouteComponent: null,
      reuseRouteComponent: null,
      organizationRouteComponent: null,
    }),
    ...extModules,
    SearchRouterContainerDirective,
  ],
  providers: [
    { provide: RouterService, useClass: EditorRouterService },
    importProvidersFrom(FeatureSearchModule),
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
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Disable automatic scroll restoration to avoid race conditions
    this.viewportScroller.setHistoryScrollRestoration('manual')
    handleScrollOnNavigation(this.router, this.viewportScroller)

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
