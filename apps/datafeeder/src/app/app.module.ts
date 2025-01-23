import { BrowserModule } from '@angular/platform-browser'
import { importProvidersFrom, NgModule } from '@angular/core'
import { ApiModule, Configuration } from '@geonetwork-ui/data-access/datafeeder'
import {
  ProgressBarComponent,
  UiWidgetsModule,
} from '@geonetwork-ui/ui/widgets'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UploadDataComponent } from './presentation/components/upload-data/upload-data.component'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { UploadDataRulesComponent } from './presentation/components/upload-data-rules/upload-data-rules.component'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { DatasetValidationPageComponent } from './presentation/pages/dataset-validation-page/dataset-validation-page'
import { DataImportValidationMapPanelComponent } from './presentation/components/data-import-validation-map-panel/data-import-validation-map-panel.component'
import { AnalysisProgressPageComponent } from './presentation/pages/analysis-progress-page/analysis-progress.page'
import { UploadDataErrorDialogComponent } from './presentation/components/svg/upload-data-error-dialog/upload-data-error-dialog.component'
import { UploadDataBackgroundComponent } from './presentation/components/svg/upload-data-background/upload-data-background.component'
import { UploadDataIllustrationComponent } from './presentation/components/svg/upload-data-illustration/upload-data-illustration.component'
import { AnalysisProgressIllustrationsComponent } from './presentation/components/svg/analysis-progress-illustrations/analysis-progress-illustrations.component'
import { FormsPageComponent } from './presentation/pages/forms-page/forms-page.component'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { PublishPageComponent } from './presentation/pages/publish-page/publish-page.component'
import { PublishPageIllustrationComponent } from './presentation/components/svg/publish-page-illustration/publish-page-illustration.component'
import { SuccessPublishPageComponent } from './presentation/pages/success-publish-page/success-publish-page.component'
import { SuccessPublishPageIllustrationComponent } from './presentation/components/svg/success-publish-page-illustration/success-publish-page-illustration.component'
import { SummarizePageComponent } from './presentation/pages/summarize-page/summarize-page.component'
import { SummarizeIllustrationComponent } from './presentation/components/svg/summarize-illustration/summarize-illustration.component'
import { SummarizeBackgroundComponent } from './presentation/components/svg/summarize-background/summarize-background.component'
import { DATAFEEDER_STATE_KEY, reducer } from './store/datafeeder.reducer'
import { FeatureAuthModule } from '@geonetwork-ui/feature/auth'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DatasetValidationCsvPageComponent } from './presentation/pages/dataset-validation-csv-page/dataset-validation-csv-page'

export function apiConfigurationFactory() {
  return new Configuration({
    withCredentials: true,
    basePath: environment.apiUrl,
  })
}

@NgModule({
  declarations: [
    AppComponent,
    UploadDataPageComponent,
    UploadDataComponent,
    UploadDataRulesComponent,
    AnalysisProgressPageComponent,
    DatasetValidationPageComponent,
    DatasetValidationCsvPageComponent,
    DataImportValidationMapPanelComponent,
    UploadDataErrorDialogComponent,
    UploadDataBackgroundComponent,
    UploadDataIllustrationComponent,
    AnalysisProgressIllustrationsComponent,
    FormsPageComponent,
    PublishPageComponent,
    PublishPageIllustrationComponent,
    SuccessPublishPageComponent,
    SuccessPublishPageIllustrationComponent,
    SummarizePageComponent,
    SummarizeIllustrationComponent,
    SummarizeBackgroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiInputsModule,
    UiWidgetsModule,
    HttpClientModule,
    UtilI18nModule,
    FeatureEditorModule,
    BrowserAnimationsModule,
    ApiModule.forRoot(apiConfigurationFactory),
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    StoreModule.forRoot({
      [DATAFEEDER_STATE_KEY]: reducer,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ connectInZone: true })
      : [],
    ProgressBarComponent,
  ],
  providers: [importProvidersFrom(FeatureAuthModule)],
  bootstrap: [AppComponent],
})
export class AppModule {}
