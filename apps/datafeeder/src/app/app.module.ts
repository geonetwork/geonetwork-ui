import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UploadDataComponent } from './presentation/components/upload-data/upload-data.component'
import { HttpLoaderFactory, I18nModule } from '@lib/common'
import { UiModule } from '@lib/ui'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { UploadDataRulesComponent } from './presentation/components/upload-data-rules/upload-data-rules.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { DatasetValidationPageComponent } from './presentation/pages/dataset-validation-page/dataset-validation-page'
import { DataImportValidationMapPanelComponent } from './presentation/components/data-import-validation-map-panel/data-import-validation-map-panel.component'
import { AnalysisProgressPageComponent } from './presentation/pages/analysis-progress-page/analysis-progress.page'
import { UploadDataErrorDialogComponent } from './presentation/components/svg/upload-data-error-dialog/upload-data-error-dialog.component'
import { UploadDataBackgroundComponent } from './presentation/components/svg/upload-data-background/upload-data-background.component'
import { UploadDataIllustrationComponent } from './presentation/components/svg/upload-data-illustration/upload-data-illustration.component'
import { AnalysisProgressIllustrationsComponent } from './presentation/components/svg/analysis-progress-illustrations/analysis-progress-illustrations.component'

@NgModule({
  declarations: [
    AppComponent,
    UploadDataPageComponent,
    UploadDataComponent,
    UploadDataRulesComponent,
    AnalysisProgressPageComponent,
    DatasetValidationPageComponent,
    DataImportValidationMapPanelComponent,
    UploadDataErrorDialogComponent,
    UploadDataBackgroundComponent,
    UploadDataIllustrationComponent,
    AnalysisProgressIllustrationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18nModule,
    UiModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
