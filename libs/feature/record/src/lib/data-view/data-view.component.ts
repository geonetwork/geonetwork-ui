import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { getLinkLabel, getLinkPriority } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest, of } from 'rxjs'
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import {
  ChartViewComponent,
  TableViewComponent,
} from '@geonetwork-ui/feature/dataviz'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
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
    TranslateModule,
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
  @Output() chartConfig$ = new BehaviorSubject<DatavizConfigurationModel>(null)
  cacheActive$ = this.mdViewFacade.isHighUpdateFrequency$.pipe(
    map((highF) => !highF)
  )
  hidePreview = false
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

  constructor(private mdViewFacade: MdViewFacade) {}

  setChartConfig(event: DatavizConfigurationModel) {
    this.mdViewFacade.setChartConfig(event)
  }

  selectLink(linkAsString: string) {
    const link: DatasetOnlineResource = JSON.parse(linkAsString)
    link.url = new URL(link.url)
    this.excludeWfs$
      .pipe(
        tap((excludeWfs) => {
          this.hidePreview =
            link['accessServiceProtocol'] === 'wfs' && excludeWfs ? true : false
          this.selectedLink$.next(link)
        })
      )
      .subscribe()
  }
}
