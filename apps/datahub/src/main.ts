import {
  enableProdMode,
  importProvidersFrom,
  provideNgReflectAttributes,
} from '@angular/core'
import { environment } from './environments/environment'
import {
  getGlobalConfig,
  loadAppConfig,
  TRANSLATE_WITH_OVERRIDES_CONFIG,
} from '@geonetwork-ui/util/app-config'
import { enableFallbackWithoutWorker } from '@camptocamp/ogc-client'
import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import {
  provideRouter,
  TitleStrategy,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router'
import { DatahubTemplatePageTitleStrategy } from './app/router/datahub-page-title-strategy.service'
import {
  DATAHUB_CONFIG_PROVIDERS,
  DATAHUB_ROUTER_PROVIDERS,
} from './app/app.providers'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { provideGn4, provideRepositoryUrl } from '@geonetwork-ui/api/repository'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store'

if (environment.production) {
  enableProdMode()
}

loadAppConfig().then(() => {
  if (getGlobalConfig().PROXY_PATH) {
    // disable worker in ogc-client to allow using a proxy with a Referer check
    enableFallbackWithoutWorker()
  }

  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom([
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: false,
              strictActionImmutability: false,
            },
          }
        ),
        !environment.production
          ? StoreDevtoolsModule.instrument({ connectInZone: true })
          : [],
        FeatureSearchModule,
        FeatureRecordModule,
        FeatureEditorModule,
        EffectsModule.forRoot(),
      ]),
      provideRouter(
        [],
        withEnabledBlockingInitialNavigation(),
        withInMemoryScrolling({ scrollPositionRestoration: 'disabled' })
      ),
      provideNgReflectAttributes(),
      {
        provide: TitleStrategy,
        useClass: DatahubTemplatePageTitleStrategy,
      },
      DATAHUB_ROUTER_PROVIDERS,
      DATAHUB_CONFIG_PROVIDERS,
      provideI18n(TRANSLATE_WITH_OVERRIDES_CONFIG),
      provideGn4(),
      provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
    ],
  }).catch((err) => console.error(err))
})
