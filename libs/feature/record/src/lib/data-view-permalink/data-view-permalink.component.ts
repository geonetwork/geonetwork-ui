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
import { GN_UI_VERSION } from '../gn-ui-version.token'

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
  permalinkUrl$ = combineLatest([
    this.facade.chartConfig$,
    this.facade.metadata$,
  ]).pipe(
    map(([config, metadata]) => {
      if (config) {
        const { aggregation, xProperty, yProperty, chartType } = config
        const url = new URL(`${this.wcEmbedderBaseUrl}`, window.location.origin)
        url.search = `?v=${this.version}
&e=gn-dataset-view-chart
&a=api-url%3D${this.config.basePath}
&a=dataset-id%3D${metadata.uniqueIdentifier}
&a=primary-color%3D%230f4395
&a=secondary-color%3D%238bc832
&a=main-color%3D%23555
&a=background-color%3D%23fdfbff
&a=aggregation%3D${aggregation}
&a=x-property%3D${xProperty}
&a=y-property%3D${yProperty}
&a=chart-type%3D${chartType}`
        return url.toString()
      }
      return ''
    })
  )

  constructor(
    @Inject(Configuration) private config: Configuration,
    @Optional()
    @Inject(WEB_COMPONENT_EMBEDDER_URL)
    protected wcEmbedderBaseUrl: string,
    @Inject(GN_UI_VERSION) private version: string,
    private facade: MdViewFacade
  ) {}
}
