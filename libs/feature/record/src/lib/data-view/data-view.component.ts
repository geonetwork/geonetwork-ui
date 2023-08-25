import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { getLinkLabel, MetadataLink } from '@geonetwork-ui/util-shared'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MdViewFacade } from '../state'
import { DatavizConfigurationModel } from '@geonetwork-ui/util/types/data/dataviz-configuration.model'

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
  selectedLink$ = new BehaviorSubject<MetadataLink>(null)

  constructor(private mdViewFacade: MdViewFacade) {}

  setChartConfig(event: DatavizConfigurationModel) {
    this.mdViewFacade.setChartConfig(event)
  }

  selectLink(linkAsString: string) {
    this.selectedLink$.next(JSON.parse(linkAsString) as MetadataLink)
  }
}
