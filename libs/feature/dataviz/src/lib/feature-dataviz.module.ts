import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { GeoTableViewComponent } from './geo-table-view/geo-table-view.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { FigureContainerComponent } from './figure/figure-container/figure-container.component'
import { ChartContainerComponent } from './chart/chart-container/chart-container.component'

@NgModule({
  imports: [CommonModule, UiLayoutModule, FeatureMapModule, UiMapModule],
  declarations: [
    GeoTableViewComponent,
    FigureContainerComponent,
    ChartContainerComponent,
  ],
  exports: [
    GeoTableViewComponent,
    FigureContainerComponent,
    ChartContainerComponent,
  ],
})
export class FeatureDatavizModule {}
