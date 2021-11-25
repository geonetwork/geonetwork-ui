import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { DefaultRouterModule } from '@geonetwork-ui/feature/router'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { RESULTS_LAYOUT_CONFIG, UiSearchModule } from '@geonetwork-ui/ui/search'
import {
  getDefaultLang,
  getLangFromBrowser,
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { PROXY_PATH, UtilSharedModule } from '@geonetwork-ui/util/shared'
import { EffectsModule } from '@ngrx/effects'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { DATAHUB_RESULTS_LAYOUT_CONFIG } from './app.config'
import { MainSearchComponent } from './main-search/main-search.component'
import { RecordPreviewDatahubComponent } from './record-preview-datahub/record-preview-datahub.component'
import { HeaderComponent } from './header/header/header.component'
import { HeaderBadgeButtonComponent } from './header/header-badge-button/header-badge-button.component'

export const metaReducers: MetaReducer[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [
    AppComponent,
    MainSearchComponent,
    RecordPreviewDatahubComponent,
    HeaderComponent,
    HeaderBadgeButtonComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    FeatureSearchModule,
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
    }),
    FeatureRecordModule,
    UiSearchModule,
    UtilSharedModule,
    MatIconModule,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DATAHUB_RESULTS_LAYOUT_CONFIG },
    {
      provide: Configuration,
      useValue: new Configuration({
        basePath: environment.API_BASE_PATH,
      }),
    },
    {
      provide: PROXY_PATH,
      useValue: environment.PROXY_PATH,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(getDefaultLang())
    translate.use(getLangFromBrowser() || getDefaultLang())
  }
}
