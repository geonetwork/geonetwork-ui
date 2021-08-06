import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MapComponent } from './components/map/map.component'

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [MapComponent],
})
export class UiMapModule {}
