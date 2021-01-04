import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { LibCatalogModule } from '@lib/catalog'
import { I18nModule, TRANSLATE_GEONETWORK_CONFIG } from '@lib/common'
import { BASE_PATH } from '@lib/gn-api'
import { LibSearchModule } from '@lib/search'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_GEONETWORK_CONFIG),
    LibSearchModule,
    LibCatalogModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: '/geonetwork/srv/api',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en')
    translate.use('en')
  }
}
