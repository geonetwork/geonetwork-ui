import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  BaseReader,
  FetchError,
  FieldAggregation,
  getJsonDataItemsProxy,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'
import {
  DropdownChoice,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs'
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { InputChartType } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import {
  DatasetFeatureCatalog,
  DatasetOnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { ChartComponent } from '@geonetwork-ui/ui/dataviz'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'

marker('chart.type.bar')
marker('chart.type.barHorizontal')
marker('chart.type.line')
marker('chart.type.lineSmooth')
marker('chart.type.pie')

marker('chart.aggregation.sum')
marker('chart.aggregation.max')
marker('chart.aggregation.min')
marker('chart.aggregation.average')
marker('chart.aggregation.count')

@Component({
  selector: 'gn-ui-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DropdownSelectorComponent,
    ChartComponent,
    LoadingMaskComponent,
    PopupAlertComponent,
    TranslatePipe,
  ],
  standalone: true,
})
export class ChartViewComponent {
  public featureCatalog$ = new BehaviorSubject<DatasetFeatureCatalog | null>(
    null
  )
  @Input() set featureCatalog(value: DatasetFeatureCatalog) {
    this.featureCatalog$.next(value)
  }
  @Input() cacheActive = true
  @Input() set link(value: DatasetOnlineResource) {
    this.currentLink$.next(value)
    if (value) {
      this.aggregation$.next('sum')
    }
  }
  private currentLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  @Input() set aggregation(value: FieldAggregation[0]) {
    this.aggregation$.next(value)
  }
  aggregation$ = new BehaviorSubject<FieldAggregation[0]>('sum')

  @Input() set xProperty(value: string) {
    this.xProperty$.next(value)
  }
  xProperty$ = new BehaviorSubject<string>(undefined)

  @Input() set yProperty(value: string) {
    this.yProperty$.next(value)
  }
  yProperty$ = new BehaviorSubject<string>(undefined)

  @Input() set chartType(value: InputChartType) {
    this.chartType$.next(value)
  }
  chartType$ = new BehaviorSubject<InputChartType>('bar')

  @Output() chartConfig$ = combineLatest([
    this.xProperty$.pipe(filter((value) => value !== undefined)),
    this.yProperty$.pipe(filter((value) => value !== undefined)),
    this.aggregation$,
    this.chartType$,
  ]).pipe(
    map(([xProperty, yProperty, aggregation, chartType]) => ({
      aggregation,
      xProperty,
      yProperty,
      chartType,
    }))
  )

  loading = false
  error = null
  errorInfo = null

  typeChoices: DropdownChoice[] = [
    { label: 'chart.type.bar', value: 'bar' },
    { label: 'chart.type.barHorizontal', value: 'bar-horizontal' },
    { label: 'chart.type.line', value: 'line' },
    { label: 'chart.type.lineSmooth', value: 'line-interpolated' },
    { label: 'chart.type.pie', value: 'pie' },
  ]

  get aggregationChoices() {
    if (!this.yProperty$.value) {
      return [{ label: 'chart.aggregation.count', value: 'count' }]
    }
    return [
      { label: 'chart.aggregation.sum', value: 'sum' },
      { label: 'chart.aggregation.max', value: 'max' },
      { label: 'chart.aggregation.min', value: 'min' },
      { label: 'chart.aggregation.average', value: 'average' },
      { label: 'chart.aggregation.count', value: 'count' },
    ] as DropdownChoice[]
  }

  dataset$: Observable<BaseReader> = this.currentLink$.pipe(
    filter((link) => !!link),
    switchMap((link) => {
      this.error = null
      this.loading = true
      if (link.accessRestricted) {
        this.handleError('dataset.error.restrictedAccess')
        return EMPTY
      }
      return this.dataService.getDataset(link, this.cacheActive).pipe(
        catchError((error) => {
          this.handleError(error)
          return EMPTY
        })
      )
    }),
    shareReplay(1)
  )
  properties$ = combineLatest([this.dataset$, this.featureCatalog$]).pipe(
    switchMap(([dataset, catalog]) => this.setProperties(dataset, catalog)),
    shareReplay(1)
  )
  yChoices$ = this.properties$.pipe(
    map((properties) =>
      properties
        .filter((prop) => prop.type === 'number' || prop.type === 'date')
        .map((prop) => ({ value: prop.name, label: prop.label || prop.name }))
    ),
    tap((choices) => {
      if (!choices.find((choice) => choice.value === this.yProperty$.value)) {
        const newProp = choices[0]?.value || ''
        if (!newProp && this.aggregation$.value !== 'count') {
          this.aggregation$.next('count')
        }
        this.yProperty$.next(newProp)
      }
    })
  )
  xChoices$ = this.properties$.pipe(
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
        this.xProperty$.next(choices[0]?.value || '')
      }
    })
  )

  chartData$ = combineLatest([
    this.dataset$,
    this.xProperty$.pipe(filter((value) => value !== undefined)),
    this.yProperty$.pipe(filter((value) => value !== undefined)),
    this.aggregation$,
  ]).pipe(
    filter(([_, x, y]) => !!x || !!y),
    switchMap(([dataset, xProp, yProp, aggregation]) => {
      const fieldAgg: FieldAggregation =
        aggregation === 'count' ? ['count'] : [aggregation, yProp]
      return dataset
        .groupBy(['distinct', xProp])
        .aggregate(fieldAgg)
        .read()
        .catch((error) => {
          this.handleError(error)
          return []
        })
        .finally(() => {
          this.loading = false
        })
    }),
    map(getJsonDataItemsProxy),
    startWith([]),
    shareReplay(1)
  )

  prettyLabel$ = combineLatest([
    this.aggregation$,
    this.properties$,
    this.yProperty$,
  ]).pipe(
    map(([aggregation, properties, yProperty]) => {
      if (aggregation === 'count') return 'count()'
      const prop = properties.find((p) => p.name === yProperty)
      return prop ? `${aggregation}(${prop.label})` : ''
    })
  )

  get labelProperty() {
    if (!this.xProperty$.value) return ''
    return `distinct(${this.xProperty$.value})`
  }
  get valueProperty() {
    if (this.isCountAggregation) return 'count()'
    return `${this.aggregation$.value}(${this.yProperty$.value})`
  }
  get isCountAggregation() {
    return this.aggregation$.value === 'count'
  }

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  setProperties(
    dataset: BaseReader,
    catalog: DatasetFeatureCatalog
  ): Promise<PropertyInfo[]> {
    return dataset.properties
      .then((properties) => {
        return properties.map((p) => {
          if (catalog) {
            const featureAttributes = catalog?.featureTypes[0]?.attributes ?? []
            const matchingAttribute = featureAttributes.find(
              (attr) => attr.name === p.label
            )
            if (matchingAttribute?.code) {
              return { ...p, label: matchingAttribute.code }
            }
            return p
          }
          return p
        })
      })
      .catch((error) => {
        this.handleError(error)
        return []
      })
  }
  handleError(error: FetchError | Error | string) {
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else if (error instanceof Error) {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack || error)
    } else {
      this.error = this.translateService.instant(error)
      console.warn(error)
    }
    this.loading = false
    this.changeDetector.detectChanges()
  }
}
