import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { AnalysisProgressPageComponent } from './presentation/pages/analysis-progress-page/analysis-progress.page'
import { DatasetValidationPageComponent } from './presentation/pages/dataset-validation-page/dataset-validation-page'
import { FormsPageComponent } from './presentation/pages/forms-page/forms-page.component'
import { PublishPageComponent } from './presentation/pages/publish-page/publish-page.component'
import { SuccessPublishPageComponent } from './presentation/pages/success-publish-page/success-publish-page.component'
import { SummarizePageComponent } from './presentation/pages/summarize-page/summarize-page.component'

const routes: Routes = [
  { path: '', component: UploadDataPageComponent },
  {
    path: ':id',
    component: AnalysisProgressPageComponent,
  },
  {
    path: ':id/validation',
    component: DatasetValidationPageComponent,
  },
  {
    path: ':id/step/:stepId',
    component: FormsPageComponent,
  },
  {
    path: ':id/publish',
    component: PublishPageComponent,
  },
  {
    path: ':id/publishok',
    component: SuccessPublishPageComponent,
  },
  {
    path: ':id/confirm',
    component: SummarizePageComponent,
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
