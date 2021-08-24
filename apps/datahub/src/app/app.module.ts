import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import {
  FeatureSearchModule,
  MdViewModule,
} from '@geonetwork-ui/feature/search'
import {
  TRANSLATE_GEONETWORK_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_GEONETWORK_CONFIG),
    FeatureSearchModule,
    MdViewModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    const lang = 'fr'
    translate.setDefaultLang(lang)
    translate.use(lang)
  }
}
