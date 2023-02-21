import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { GeoTableViewComponent } from './geo-table-view/geo-table-view.component'
import { FigureContainerComponent } from './figure/figure-container/figure-container.component'
import { TableComponent, UiDatavizModule } from '@geonetwork-ui/ui/dataviz'

@NgModule({
  imports: [
    CommonModule,
    FeatureMapModule,
    UiMapModule,
    UiDatavizModule,
    TableComponent,
  ],
  declarations: [GeoTableViewComponent, FigureContainerComponent],
  exports: [GeoTableViewComponent, FigureContainerComponent],
})
export class FeatureDatavizModule {}
