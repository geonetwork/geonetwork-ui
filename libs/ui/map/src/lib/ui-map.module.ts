import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MapComponent } from './components/map/map.component'
import { MapContextComponent } from './components/map-context/map-context.component'

@NgModule({
  declarations: [MapComponent, MapContextComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [MapComponent, MapContextComponent],
})
export class UiMapModule {}
