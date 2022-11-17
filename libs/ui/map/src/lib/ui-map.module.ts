import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MapComponent } from './components/map/map.component'
import { FeatureDetailComponent } from './components/feature-detail/feature-detail.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [MapComponent, FeatureDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    TranslateModule.forRoot(),
  ],
  exports: [MapComponent, FeatureDetailComponent],
})
export class UiMapModule {}
