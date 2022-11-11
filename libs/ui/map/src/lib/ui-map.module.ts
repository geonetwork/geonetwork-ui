import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureDetailComponent } from './components/feature-detail/feature-detail.component'

@NgModule({
  declarations: [FeatureDetailComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [FeatureDetailComponent],
})
export class UiMapModule {}
