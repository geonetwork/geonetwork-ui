import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UploadDataComponent } from './components/upload-data/upload-data.component'

const routes: Routes = [
  { path: '', component: UploadDataComponent },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
