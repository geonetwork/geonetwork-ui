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
        url.searchParams.set('v', `${this.version}`)
        url.searchParams.append('e', `gn-dataset-view-chart`)
        url.searchParams.append('a', `api-url=${this.config.basePath}`)
        url.searchParams.append('a', `dataset-id=${metadata.uniqueIdentifier}`)
        url.searchParams.append('a', `primary-color=#0f4395`)
        url.searchParams.append('a', `secondary-color=#8bc832`)
        url.searchParams.append('a', `main-color=#555`)
        url.searchParams.append('a', `background-color=#fdfbff`)
        url.searchParams.append('a', `aggregation=${aggregation}`)
        url.searchParams.append('a', `x-property=${xProperty}`)
        url.searchParams.append('a', `y-property=${yProperty}`)
        url.searchParams.append('a', `chart-type=${chartType}`)
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
