import { NgModule } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
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
import { CreatePageComponent } from './create/create-page.component'
import { DashboardModule } from './dashboard/dashboard.module'
import { EditPageComponent } from './edit/edit-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { FeatureCatalogModule } from '@geonetwork-ui/feature/catalog'

@NgModule({
  declarations: [
    AppComponent,
    EditPageComponent,
    CreatePageComponent,
    SignInPageComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    FeatureSearchModule,
    UiElementsModule,
    UiSearchModule,
    AppCommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiInputsModule,
    FeatureEditorModule,
    UtilI18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    MatProgressSpinnerModule,
    FeatureCatalogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
