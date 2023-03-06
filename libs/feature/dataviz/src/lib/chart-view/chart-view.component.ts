import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { InputChartType } from '@geonetwork-ui/ui/dataviz'
import { DataService } from '../service/data.service'
import {
  BaseReader,
  FieldAggregation,
  getJsonDataItemsProxy,
} from '@geonetwork-ui/data-fetcher'

@Component({
  selector: 'gn-ui-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartViewComponent {
  @Input() set link(value: MetadataLink) {
    this.currentLink$.next(value)
  }
  private currentLink$ = new BehaviorSubject<MetadataLink>(null)

  loading = false
  error = null

  typeChoices = [
    { label: 'bar chart', value: 'bar' },
    { label: 'bar chart (horizontal)', value: 'bar-horizontal' },
    { label: 'line chart', value: 'line' },
    { label: 'smooth line', value: 'line-interpolated' },
    { label: 'pie chart', value: 'pie' },
  ] as const
  aggregationChoices = [
    { label: 'sum', value: 'sum' },
    { label: 'max', value: 'max' },
    { label: 'min', value: 'min' },
    { label: 'average', value: 'average' },
    { label: 'count', value: 'count' },
  ] as const

  dataset$: Observable<BaseReader> = this.currentLink$.pipe(
    filter((link) => !!link),
    switchMap((link) => {
      this.error = null
      this.loading = true
      return this.dataService.getDataset(link).pipe(
        catchError((error) => {
          this.error = error.message
          console.warn(error.stack || error.message)
          return EMPTY
        }),
        finalize(() => {
          this.loading = false
        })
      )
    }),
    shareReplay(1)
  )
  yChoices$ = this.dataset$.pipe(
    switchMap((dataset) => dataset.properties),
    map((properties) =>
      properties
        .filter((prop) => prop.type === 'number' || prop.type === 'date')
        .map((prop) => ({ value: prop.name, label: prop.label || prop.name }))
    ),
    tap((choices) => {
      if (!choices.find((choice) => choice.value === this.yProperty$.value)) {
        this.yProperty$.next(choices[0].value)
      }
    })
  )
  xChoices$ = this.dataset$.pipe(
    switchMap((dataset) => dataset.properties),
    map((properties) =>
      properties
        .filter((prop) => prop.type === 'string')
        .map((prop) => ({
          value: prop.name,
          label: prop.label || prop.name,
        }))
    ),
    tap((choices) => {
      if (!choices.find((choice) => choice.value === this.xProperty$.value)) {
        this.xProperty$.next(choices[0].value)
      }
    })
  )
  chartType: InputChartType = 'bar'
  xProperty$ = new BehaviorSubject<string>('')
  yProperty$ = new BehaviorSubject<string>('')
  aggregation$ = new BehaviorSubject<FieldAggregation[0]>('sum')

  chartData$ = combineLatest([
    this.dataset$,
    this.xProperty$.pipe(filter((value) => !!value)),
    this.yProperty$.pipe(filter((value) => !!value)),
    this.aggregation$,
  ]).pipe(
    switchMap(([dataset, xProp, yProp, aggregation]) => {
      const fieldAgg: FieldAggregation =
        aggregation === 'count' ? ['count'] : [aggregation, yProp]
      return dataset.groupBy(['distinct', xProp]).aggregate(fieldAgg).read()
    }),
    map(getJsonDataItemsProxy),
    startWith([]),
    shareReplay(1)
  )

  get labelProperty() {
    return `distinct(${this.xProperty$.value})`
  }
  get valueProperty() {
    if (this.isCountAggregation) return 'count()'
    return `${this.aggregation$.value}(${this.yProperty$.value})`
  }
  get isCountAggregation() {
    return this.aggregation$.value === 'count'
  }

  constructor(private dataService: DataService) {}
}
