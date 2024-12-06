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

@NgModule({
  providers: [
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
      })
    ),
  ],
})
export class StandaloneSearchModule {
  constructor() {
    const recordsRepository = inject(RecordsRepositoryInterface)
    const platformService = inject(PlatformServiceInterface)
    window['GNUI'] = {
      recordsRepository,
      platformService,
    }
  }

  ngDoBootstrap() {
      console.log(`[geonetwork-ui] GeoNetwork-UI Standalone Search v${} loaded`)
  }
}
