import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { AnalysisProgressPageComponent } from './presentation/pages/analysis-progress-page/analysis-progress.page'
import { DatasetValidationPageComponent } from './presentation/pages/dataset-validation-page/dataset-validation-page'
import { FormsPageComponent } from './presentation/pages/forms-page/forms-page.component'
import { PublishPageComponent } from './presentation/pages/publish-page/publish-page.component'
import { SuccessPublishPageComponent } from './presentation/pages/success-publish-page/success-publish-page.component'
import { SummarizePageComponent } from './presentation/pages/summarize-page/summarize-page.component'
import { PublicationLockGuard } from './router/publication-lock.guard'
import { PublicationStatusGuard } from './router/publication-status.guard'
import { UploadProgressGuard } from './router/upload-progress.guard'
import { UploadStatusGuard } from './router/upload-status.guard'
import { DatasetValidationCsvPageComponent } from './presentation/pages/dataset-validation-csv-page/dataset-validation-csv-page'

const routes: Routes = [
  { path: '', component: UploadDataPageComponent },
  {
    path: ':id',
    component: AnalysisProgressPageComponent,
    canActivate: [UploadStatusGuard, UploadProgressGuard],
  },
  {
    path: ':id/validation',
    component: DatasetValidationPageComponent,
    canActivate: [UploadStatusGuard, PublicationLockGuard],
  },
  {
    path: ':id/validation-csv',
    component: DatasetValidationCsvPageComponent,
    canActivate: [UploadStatusGuard, PublicationLockGuard],
  },
  {
    path: ':id/step/:stepId',
    component: FormsPageComponent,
    canActivate: [UploadStatusGuard, PublicationLockGuard],
  },
  {
    path: ':id/confirm',
    component: SummarizePageComponent,
    canActivate: [UploadStatusGuard, PublicationLockGuard],
  },
  {
    path: ':id/publish',
    component: PublishPageComponent,
    canActivate: [UploadStatusGuard, PublicationStatusGuard],
  },
  {
    path: ':id/publishok',
    component: SuccessPublishPageComponent,
    canActivate: [UploadStatusGuard, PublicationStatusGuard],
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
