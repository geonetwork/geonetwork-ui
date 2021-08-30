import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { FeatureDatavizModule } from '@geonetwork-ui/feature/dataviz'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import {
  getDefaultLang,
  UtilI18nModule,
  TRANSLATE_GEONETWORK_CONFIG,
} from '@geonetwork-ui/util/i18n'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
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
    FeatureMapModule,
    UiMapModule,
    FeatureDatavizModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: Configuration,
      useValue: new Configuration({
        basePath: environment.API_BASE_PATH,
      }),
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
