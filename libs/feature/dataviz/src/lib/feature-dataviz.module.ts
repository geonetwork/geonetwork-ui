import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { GeoTableViewComponent } from './geo-table-view/geo-table-view.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

@NgModule({
  imports: [CommonModule, UiLayoutModule, FeatureMapModule, UiMapModule],
  declarations: [GeoTableViewComponent],
  exports: [GeoTableViewComponent],
})
export class FeatureDatavizModule {}
