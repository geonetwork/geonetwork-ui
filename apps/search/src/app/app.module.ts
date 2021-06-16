import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import {
  getDefaultLang,
  UtilI18nModule,
  TRANSLATE_GEONETWORK_CONFIG,
} from '@geonetwork-ui/util/i18n'
import { BASE_PATH } from '@geonetwork-ui/data-access/gn4'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainSearchComponent } from './main-search/main-search.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [AppComponent, MainSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_GEONETWORK_CONFIG),
    FeatureSearchModule,
    FeatureCatalogModule,
    UiLayoutModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    NoopAnimationsModule,
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
    const lang = getDefaultLang()
    translate.setDefaultLang(lang)
    translate.use(lang)
  }
}
