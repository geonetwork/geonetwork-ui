import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ChartType } from 'chart.js'
import { BehaviorSubject } from 'rxjs'
import { DATA_MOCK } from './data.mock'

@Component({
  selector: 'gn-ui-data-view-chart',
  templateUrl: './data-view-chart.component.html',
  styleUrls: ['./data-view-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewChartComponent {
  chartData$ = new BehaviorSubject(DATA_MOCK)
  xAxis$ = new BehaviorSubject('id')
  yAxis$ = new BehaviorSubject('pop')
  label$ = new BehaviorSubject('pop par id')
  chartType$ = new BehaviorSubject<ChartType>('bar')
}
