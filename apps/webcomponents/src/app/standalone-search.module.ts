import {
  DoBootstrap,
  importProvidersFrom,
  inject,
  Injector,
  NgModule,
  runInInjectionContext,
} from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import {
  DEFAULT_LANG,
  EmbeddedTranslateLoader,
  provideI18n,
  TRANSLATE_DEFAULT_CONFIG,
} from '@geonetwork-ui/util/i18n'
import { TranslateLoader, TranslateService } from '@ngx-translate/core'
import { METADATA_LANGUAGE, provideGn4 } from '@geonetwork-ui/api/repository'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { GEONETWORK_UI_VERSION } from '@geonetwork-ui/util/shared'
import { BrowserModule } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import {
  StandaloneConfiguration,
  standaloneConfigurationObject,
} from './configuration.js'

@NgModule({
  providers: [
    {
      provide: METADATA_LANGUAGE,
      useValue: standaloneConfigurationObject.metadataLanguageFactory,
    },
    provideHttpClient(),
    {
      provide: Configuration,
      useValue: standaloneConfigurationObject.apiConfiguration,
    },
    provideGn4(),
    provideI18n(
      {
        ...TRANSLATE_DEFAULT_CONFIG,
        loader: {
          provide: TranslateLoader,
          useClass: EmbeddedTranslateLoader,
        },
        defaultLanguage: DEFAULT_LANG,
      },
      false // do not load language from localStorage
    ),
    importProvidersFrom(BrowserModule),
  ],
})
export class StandaloneSearchModule implements DoBootstrap {
  private injector = inject(Injector)

  constructor() {
    const injector = this.injector

    if ('GNUI' in window) {
      console.error(
        `[geonetwork-ui] a 'GNUI' global already exists, GeoNetwork-UI Standalone Search v${GEONETWORK_UI_VERSION} could not be loaded!`
      )
      return
    }

    function init(config: StandaloneConfiguration) {
      standaloneConfigurationObject.apiConfiguration.basePath = config.apiUrl
      standaloneConfigurationObject.metadataLanguage =
        config.metadataLanguage ?? null
      runInInjectionContext(injector, () => {
        const translateService = inject(TranslateService)
        if (config.textLanguage === 'browser') {
          translateService.use(translateService.getBrowserLang())
        } else if (typeof config.textLanguage === 'string') {
          translateService.use(config.textLanguage)
        }
      })
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
