import { importProvidersFrom, inject, NgModule } from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import {
  EmbeddedTranslateLoader,
  TRANSLATE_DEFAULT_CONFIG,
} from '@geonetwork-ui/util/i18n'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { apiConfiguration } from './components/base.component'
import { provideGn4 } from '@geonetwork-ui/api/repository'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { GEONETWORK_UI_VERSION } from '@geonetwork-ui/util/shared'
import { BrowserModule } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'

@NgModule({
  providers: [
    provideHttpClient(),
    provideGn4(),
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        ...TRANSLATE_DEFAULT_CONFIG,
        loader: {
          provide: TranslateLoader,
          useClass: EmbeddedTranslateLoader,
        },
      }),
      BrowserModule,
      // theses shouldn't be needed; we rely on them for the Org service and Avatar service which should both be provided by `providedGn4`
      FeatureCatalogModule,
      FeatureAuthModule
    ),
  ],
})
export class StandaloneSearchModule {
  constructor() {
    function init(url) {
      apiConfiguration.basePath = url
    }
    const recordsRepository = inject(RecordsRepositoryInterface)
    const platformService = inject(PlatformServiceInterface)
    window['GNUI'] = {
      recordsRepository,
      platformService,
      init,
    }
  }

  ngDoBootstrap() {
    console.log(
      `[geonetwork-ui] GeoNetwork-UI Standalone Search v${GEONETWORK_UI_VERSION} loaded`
    )
  }
}
