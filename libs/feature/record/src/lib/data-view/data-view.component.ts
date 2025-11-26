import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  getLinkId,
  getLinkLabel,
  getLinkPriority,
} from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { DatavizChartConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import {
  ChartViewComponent,
  TableViewComponent,
} from '@geonetwork-ui/feature/dataviz'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'

@Component({
  selector: 'gn-ui-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DropdownSelectorComponent,
    TableViewComponent,
    TranslateDirective,
    TranslatePipe,
    ChartViewComponent,
    PopupAlertComponent,
  ],
})
export class DataViewComponent {
  @Input() mode: 'table' | 'chart'
  @Input() displaySource = true
  @Input() set exceedsLimit(value: boolean) {
    this.excludeWfs$.next(value)
  }
  linkMap: Map<string, DatasetOnlineResource> = new Map()
  _selectedView = ''
  _chartConfig = null
  _selectedChoice = null
  @Input() set selectedView(value: string) {
    this._selectedView = value
    if (this.mode === value) {
      this.linkSelected.emit(this.selectedLink$.value)
    }
  }
  @Input() set datavizConfig(value: {
    view?: string
    source?: DatasetOnlineResource
    chartConfig?: DatavizChartConfigModel
  }) {
    if ((value && value.view === 'table') || value.view === 'chart') {
      this._selectedView = value.view
    }
    if (this.mode === value.view) {
      if (!value.source) {
        this.linkSelected.emit(this.selectedLink$.value)
      } else {
        this._chartConfig = value.chartConfig
        this._selectedChoice = getLinkId(value.source)
        this.selectedLink$.next(value.source)
      }
    }
  }
  @Output() chartConfig$ = new BehaviorSubject<DatavizChartConfigModel>(null)
  @Output() linkSelected = new EventEmitter<DatasetOnlineResource>()
  cacheActive$ = this.mdViewFacade.isHighUpdateFrequency$.pipe(
    map((highF) => !highF)
  )
  excludeWfs$ = new BehaviorSubject(false)
  compatibleDataLinks$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(([dataLinks, geoDataLinks]) => {
      const a = [...dataLinks, ...geoDataLinks]
      a.sort((a, b) => getLinkPriority(b) - getLinkPriority(a))
      return a
    })
  )
  dropdownChoices$ = this.compatibleDataLinks$.pipe(
    tap((links: DatasetOnlineResource[]) => {
      this.linkMap.clear()
      links.forEach((link: DatasetOnlineResource) =>
        this.linkMap.set(getLinkId(link), link)
      )
      if (!links.some((l) => l.url === this.selectedLink$.value?.url)) {
        this.selectLink(getLinkId(links[0]))
      }
    }),
    map((links) =>
      links.map((link: DatasetOnlineResource) => ({
        label: getLinkLabel(link),
        value: getLinkId(link),
      }))
    )
  )
  selectedLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  hidePreview$ = this.excludeWfs$.pipe(
    map((excludeWfs) => this.mode === 'chart' && excludeWfs)
  )

  constructor(private mdViewFacade: MdViewFacade) {}

  setChartConfig(event: DatavizChartConfigModel) {
    this.mdViewFacade.setChartConfig(event)
  }

  selectLink(linkId: string) {
    const link = this.linkMap.get(linkId)
    if (this._selectedView && this._selectedView === this.mode) {
      this.linkSelected.emit(link)
    }
    this.selectedLink$.next(link)
  }
}
