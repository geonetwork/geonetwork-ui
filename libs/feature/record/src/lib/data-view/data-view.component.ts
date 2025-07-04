import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { getLinkLabel, getLinkPriority } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { DatavizChartConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import {
  DatasetOnlineResource,
  DatasetServiceDistribution,
} from '@geonetwork-ui/common/domain/model/record'
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
  _selectedView = ''
  @Input() set selectedView(value: string) {
    this._selectedView = value
    if (value !== 'map') {
      this.linkSelected.emit(this.selectedLink$.value)
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
    tap((links) => {
      if (links.indexOf(this.selectedLink$.value) === -1) {
        this.selectLink(JSON.stringify(links[0]))
      }
    }),
    map((links) =>
      links.map((link) => ({
        label: getLinkLabel(link),
        value: JSON.stringify(link),
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

  selectLink(linkAsString: string) {
    const link: DatasetOnlineResource = JSON.parse(linkAsString)
    if (this._selectedView && this._selectedView !== 'map') {
      this.linkSelected.emit(link)
    }
    link.url = new URL(link.url)
    this.selectedLink$.next(link)
  }
}
