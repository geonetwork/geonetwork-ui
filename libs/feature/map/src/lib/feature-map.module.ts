import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { defaultMapOptions, FEATURE_MAP_OPTIONS } from './constant'
import { MapInstanceDirective } from './manager/map-instance.directive'
import { MapContextComponent } from './map-context/component/map-context.component'

@NgModule({
  declarations: [MapContextComponent, MapInstanceDirective],
  exports: [MapContextComponent, MapInstanceDirective],
  imports: [CommonModule, UiMapModule],
  providers: [
    {
      provide: FEATURE_MAP_OPTIONS,
      useValue: defaultMapOptions,
    },
  ],
})
export class FeatureMapModule {}
