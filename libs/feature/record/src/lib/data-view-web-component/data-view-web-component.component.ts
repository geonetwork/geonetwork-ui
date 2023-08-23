import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { MdViewFacade } from '../state'
import { combineLatest, map } from 'rxjs'

@Component({
  selector: 'gn-ui-data-view-web-component',
  templateUrl: './data-view-web-component.component.html',
  styleUrls: ['./data-view-web-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewWebComponentComponent {
  webComponentHtml$ = combineLatest(
    this.facade.chartConfig$,
    this.facade.metadata$
  ).pipe(
    map(([config, metadata]) => {
      if (config) {
        const { aggregation, xProperty, yProperty, chartType } = config
        return `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist/gn-wc.js"></script>
<gn-dataset-view-chart
        api-url="${new URL(
          this.config.basePath,
          window.location.origin
        ).toString()}"
        dataset-id="${metadata.uniqueIdentifier}"
        aggregation="${aggregation}"
        x-property="${xProperty}"
        y-property="${yProperty}"
        chart-type="${chartType}"
        primary-color="#0f4395"
        secondary-color="#8bc832"
        main-color="#555"
        background-color="#fdfbff"
        main-font="'Inter', sans-serif"
        title-font="'DM Serif Display', serif"
></gn-dataset-view-chart>`
      }
      return ''
    })
  )

  constructor(
    @Inject(Configuration) private config: Configuration,
    private facade: MdViewFacade
  ) {}
}
