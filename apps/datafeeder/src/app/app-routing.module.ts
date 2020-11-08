import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UploadDataComponent } from './components/upload-data/upload-data.component'

const routes: Routes = [
  { path: '', redirectTo: 'georchestra/import', pathMatch: 'full' },
  { path: 'georchestra/import', component: UploadDataComponent },
  { path: '**', redirectTo: 'georchestra/import' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
