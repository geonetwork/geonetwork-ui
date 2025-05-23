import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { MdViewFacade } from '../state'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import { CopyTextButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { GEONETWORK_UI_TAG_NAME } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-data-view-web-component',
  templateUrl: './data-view-web-component.component.html',
  styleUrls: ['./data-view-web-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CopyTextButtonComponent, TranslatePipe],
})
export class DataViewWebComponentComponent {
  viewType$ = new BehaviorSubject<string>('map')
  @Input()
  set viewType(value: string) {
    this.viewType$.next(value)
  }
  webComponentHtml$ = combineLatest(
    this.viewType$,
    this.facade.chartConfig$,
    this.facade.metadata$
  ).pipe(
    map(([viewType, config, metadata]) => {
      if (viewType === 'chart') {
        if (config) {
          const { aggregation, xProperty, yProperty, chartType } = config
          return `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-${
            GEONETWORK_UI_TAG_NAME
          }/gn-wc.js"></script>
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
      } else if (viewType === 'table') {
        return `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-${
          GEONETWORK_UI_TAG_NAME
        }/gn-wc.js"></script>
  <gn-dataset-view-table
          api-url="${new URL(
            this.config.basePath,
            window.location.origin
          ).toString()}"
          dataset-id="${metadata.uniqueIdentifier}"
          primary-color="#0f4395"
          secondary-color="#8bc832"
          main-color="#555"
          background-color="#fdfbff"
          main-font="'Inter', sans-serif"
          title-font="'DM Serif Display', serif"
  ></gn-dataset-view-table>`
      } else {
        return `<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-${
          GEONETWORK_UI_TAG_NAME
        }/gn-wc.js"></script>
<gn-dataset-view-map
        api-url="${new URL(
          this.config.basePath,
          window.location.origin
        ).toString()}"
        dataset-id="${metadata.uniqueIdentifier}"
        primary-color="#0f4395"
        secondary-color="#8bc832"
        main-color="#555"
        background-color="#fdfbff"
        main-font="'Inter', sans-serif"
        title-font="'DM Serif Display', serif"
></gn-dataset-view-map>`
      }
    })
  )

  constructor(
    @Inject(Configuration) private config: Configuration,
    private facade: MdViewFacade
  ) {}
}
