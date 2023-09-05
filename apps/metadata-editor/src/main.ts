import { HttpClient, HttpClientModule } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { bootstrapApplication } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { provideRouter, RouterModule } from '@angular/router'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { RouterEffects, RouterFacade } from '@geonetwork-ui/feature/router'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { EffectsModule, EffectsRootModule } from '@ngrx/effects'
import {
  provideRouterStore,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { provideStore, ReducerManager, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { AppComponent } from './app/app.component'
import { appRoutes } from './app/app.routes'

import { DashboardSearchService } from './app/dashboard/dashboard-search.service'

// loadAppConfig().then(() => {
//   platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .catch((err) => console.error(err))
// })

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore({ messages: routerReducer }),
    provideRouterStore(),
    SearchFacade,
    DashboardSearchService,
    importProvidersFrom(FeatureAuthModule),
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(ReducerManager),
    importProvidersFrom(UiElementsModule),
    importProvidersFrom(UiSearchModule),
    importProvidersFrom(UiInputsModule),
    importProvidersFrom(FeatureEditorModule),
    importProvidersFrom(UtilI18nModule),
    importProvidersFrom(MatProgressSpinnerModule),
    importProvidersFrom(FeatureCatalogModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
    importProvidersFrom(HttpClient),
    importProvidersFrom(RouterFacade),
    importProvidersFrom(StoreModule.forRoot({})),
    importProvidersFrom(EffectsRootModule),
    //   RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),

    //   // configure NgRx modules
    //   StoreModule.forRoot({
    //     router: routerReducer,
    //     facade: RouterFacade
    //   }),
    //   StoreRouterConnectingModule.forRoot(),
    //   StoreDevtoolsModule.instrument(),
    //   EffectsModule.forRoot([RouterEffects])
    // ),
  ],
})
