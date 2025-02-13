import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { getLinkLabel, getLinkPriority } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
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
  ],
})
export class DataViewComponent {
  @Input() mode: 'table' | 'chart'
  @Input() displaySource = true
  @Output() chartConfig$ = new BehaviorSubject<DatavizConfigurationModel>(null)
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
        this.selectedLink$.next(links[0])
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
    this.selectedLink$.next(link)
  }
}
