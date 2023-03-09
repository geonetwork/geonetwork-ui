import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { GeoTableViewComponent } from './geo-table-view/geo-table-view.component'
import { FigureContainerComponent } from './figure/figure-container/figure-container.component'
import {
  ChartComponent,
  TableComponent,
  UiDatavizModule,
} from '@geonetwork-ui/ui/dataviz'
import { TableViewComponent } from './table-view/table-view.component'
import { ChartViewComponent } from './chart-view/chart-view.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

@NgModule({
  imports: [
    CommonModule,
    FeatureMapModule,
    UiMapModule,
    UiDatavizModule,
    TableComponent,
    UiWidgetsModule,
    TranslateModule,
    ChartComponent,
    UiInputsModule,
  ],
  declarations: [
    GeoTableViewComponent,
    FigureContainerComponent,
    TableViewComponent,
    ChartViewComponent,
  ],
  exports: [
    GeoTableViewComponent,
    FigureContainerComponent,
    TableViewComponent,
    ChartViewComponent,
  ],
})
export class FeatureDatavizModule {}
