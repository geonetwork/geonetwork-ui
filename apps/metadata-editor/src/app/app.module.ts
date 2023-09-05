import { importProvidersFrom, NgModule } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterModule, RouterOutlet } from '@angular/router'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
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
    RouterOutlet,
    AppCommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
  ],
  providers: [
    SearchFacade,
    DashboardSearchService,
    importProvidersFrom(FeatureAuthModule),
    importProvidersFrom(FeatureSearchModule),
    importProvidersFrom(UiElementsModule),
    importProvidersFrom(UiSearchModule),
    importProvidersFrom(UiInputsModule),
    importProvidersFrom(FeatureEditorModule),
    importProvidersFrom(UtilI18nModule),
    importProvidersFrom(MatProgressSpinnerModule),
    importProvidersFrom(FeatureCatalogModule),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
