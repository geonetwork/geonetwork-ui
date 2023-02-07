import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ChartType, CHART_TYPE_VALUES } from '@geonetwork-ui/ui/layout'
import { BehaviorSubject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DataFacade } from '../state/data.facade'

@Component({
  selector: 'gn-ui-data-view-chart',
  templateUrl: './data-view-chart.component.html',
  styleUrls: ['./data-view-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewChartComponent {
  xAxis$ = new BehaviorSubject('')
  yAxis$ = new BehaviorSubject('')
  axisChoices$ = this.dataFacade.tableData$.pipe(
    map((row) =>
      Object.keys(row[0]).map((property) => ({
        label: property,
        value: property,
      }))
    )
  )
  chartType$ = new BehaviorSubject<ChartType>('bar')
  chartTypeChoices = CHART_TYPE_VALUES.map((property) => ({
    label: property,
    value: property,
  }))

  subscription: Subscription

  constructor(protected dataFacade: DataFacade) {
    this.subscription = this.axisChoices$
      .pipe(map((choices) => choices[0].value))
      .subscribe(this.xAxis$)
    this.subscription.add(
      this.axisChoices$
        .pipe(map((choices) => choices[0].value))
        .subscribe(this.yAxis$)
    )
  }

  selectxAxis(property: string) {
    this.xAxis$.next(property)
  }

  selectyAxis(property: string) {
    this.yAxis$.next(property)
  }

  selectChartType(type: ChartType) {
    this.chartType$.next(type)
  }
}
