import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { metaReducers } from '../../../datahub/src/app/app.module'
import { environment } from '../../../datahub/src/environments/environment'

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
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
  ],
  exports: [MatIconModule],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: getGlobalConfig().GN4_API_URL,
        }),
    },
  ],
})
export class AppCommonModule {}
