import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Optional,
} from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { combineLatest, map } from 'rxjs'
import { MdViewFacade } from '../state'

export const WEB_COMPONENT_EMBEDDER_URL = new InjectionToken<string>(
  'webComponentEmbedderUrl'
)

@Component({
  selector: 'gn-ui-data-view-permalink',
  templateUrl: './data-view-permalink.component.html',
  styleUrls: ['./data-view-permalink.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewPermalinkComponent {
  permalinkUrl$ = combineLatest(
    this.facade.chartConfig$,
    this.facade.metadata$
  ).pipe(
    map(([config, metadata]) => {
      if (config) {
        const { aggregation, xProperty, yProperty, chartType } = config
        const url = new URL(`${this.wcEmbedderBaseUrl}`, window.location.origin)
        url.search = `?e=gn-dataset-view-chart
&a=api-url=${this.config.basePath}
&a=dataset-id=${metadata.uuid}
&a=primary-color=%230f4395
&a=secondary-color=%238bc832
&a=main-color=%23555
&a=background-color=%23fdfbff
&a=aggregation=${aggregation}
&a=x-property=${xProperty}
&a=y-property=${yProperty}
&a=chart-type=${chartType}`
        return url.toString()
      }
      return null
    })
  )

  constructor(
    @Inject(Configuration) private config: Configuration,
    @Optional()
    @Inject(WEB_COMPONENT_EMBEDDER_URL)
    protected wcEmbedderBaseUrl: string,
    private facade: MdViewFacade
  ) {}
}
