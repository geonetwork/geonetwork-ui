import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { getLinkLabel } from '@geonetwork-ui/util/shared'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/dataviz-configuration.model'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent {
  @Input() mode: 'table' | 'chart'
  @Output() chartConfig$ = new BehaviorSubject<DatavizConfigurationModel>(null)
  compatibleDataLinks$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(map(([dataLinks, geoDataLinks]) => [...dataLinks, ...geoDataLinks]))
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
  selectedLink$ = new BehaviorSubject<DatasetDistribution>(null)

  constructor(private mdViewFacade: MdViewFacade) {}

  setChartConfig(event: DatavizConfigurationModel) {
    this.mdViewFacade.setChartConfig(event)
  }

  selectLink(linkAsString: string) {
    const link: DatasetDistribution = JSON.parse(linkAsString)
    link.url = new URL(link.url)
    this.selectedLink$.next(link)
  }
}
