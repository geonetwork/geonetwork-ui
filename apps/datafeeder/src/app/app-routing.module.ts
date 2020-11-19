import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { AnalysisProgressPageComponent } from './presentation/pages/analysis-progress-page/analysis-progress.page'
import { DatasetValidationPageComponent } from './presentation/pages/dataset-validation-page/dataset-validation-page'

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
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
