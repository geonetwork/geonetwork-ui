import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule } from '@ngx-translate/core'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainSearchComponent } from './main-search/main-search.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideRepositoryUrl } from '@geonetwork-ui/api/repository'

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
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    FeatureSearchModule,
    FeatureCatalogModule,
    UiLayoutModule,
    FeatureMapModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [provideRepositoryUrl(environment.API_BASE_PATH)],
  bootstrap: [AppComponent],
})
export class AppModule {}
