import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { DatavizConfigurationModel } from '@geonetwork-ui/util/types/data/dataviz-configuration.model'
import { BehaviorSubject } from 'rxjs'

export const WEB_COMPONENT_EMBEDDER_URL = new InjectionToken<string>(
  'webComponentEmbedderUrl'
)

@Component({
  selector: 'gn-ui-permalink',
  templateUrl: './permalink.component.html',
  styleUrls: ['./permalink.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermalinkComponent {
  @Input() set chartConfig(value: DatavizConfigurationModel) {
    if (value) {
      const { aggregation, xProperty, yProperty, chartType } = value
      const url = new URL(`${this.wcEmbedderBaseUrl}`, window.location.origin)
      url.search = `?e=gn-dataset-view-chart
&a=api-url=${this.config.basePath}
&a=primary-color=%230f4395
&a=secondary-color=%238bc832
&a=main-color=%23555
&a=background-color=%23fdfbff
&a=aggregation=${aggregation}
&a=x-property=${xProperty}
&a=y-property=${yProperty}
&a=chart-type=${chartType}`
      this.permalinkUrl$.next(url.toString())
    }
  }

  permalinkUrl$ = new BehaviorSubject<string>(null)

  constructor(
    @Inject(Configuration) private config: Configuration,
    @Optional()
    @Inject(WEB_COMPONENT_EMBEDDER_URL)
    protected wcEmbedderBaseUrl: string
  ) {}
}
