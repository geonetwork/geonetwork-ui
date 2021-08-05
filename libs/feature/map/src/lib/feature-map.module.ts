import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { MapContainerDirective } from './manager/map.container.directive'
import { MapContextComponent } from './map-context/component/map-context.component'

@NgModule({
  declarations: [MapContextComponent, MapContainerDirective],
  exports: [MapContextComponent, MapContainerDirective],
  imports: [CommonModule, UiMapModule],
})
export class FeatureMapModule {}
