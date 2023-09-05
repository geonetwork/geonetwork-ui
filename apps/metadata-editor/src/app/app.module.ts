import { importProvidersFrom, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { AppCommonModule } from './app.common.module'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'
import { DashboardSearchService } from './dashboard/dashboard-search.service'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    SearchFacade,
    DashboardSearchService,
    importProvidersFrom(FeatureAuthModule),
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(FeatureCatalogModule),
    importProvidersFrom(UtilI18nModule),
    importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
    importProvidersFrom(AppCommonModule),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
