import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import {
  FeatureDetailComponent,
  MapContainerComponent,
} from '@geonetwork-ui/ui/map'
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
import { PopupAlertComponent, UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

@NgModule({
  imports: [
    CommonModule,
    FeatureMapModule,
    UiDatavizModule,
    TableComponent,
    UiWidgetsModule,
    TranslateModule,
    ChartComponent,
    UiInputsModule,
    PopupAlertComponent,
    FeatureDetailComponent,
    MapContainerComponent,
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
