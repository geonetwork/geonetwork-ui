import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from '@angular/core'
import { Configuration } from '@geonetwork-ui/data-access/gn4'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import { MdViewFacade } from '../state'
import { CopyTextButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { GEONETWORK_UI_TAG_NAME } from '@geonetwork-ui/util/shared'

export const WEB_COMPONENT_EMBEDDER_URL = new InjectionToken<string>(
  'webComponentEmbedderUrl'
)

@Component({
  selector: 'gn-ui-data-view-permalink',
  templateUrl: './data-view-permalink.component.html',
  styleUrls: ['./data-view-permalink.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CopyTextButtonComponent, TranslatePipe],
})
export class DataViewPermalinkComponent {
  viewType$ = new BehaviorSubject<string>('map')
  @Input()
  set viewType(value: string) {
    this.viewType$.next(value)
  }

  permalinkUrl$ = combineLatest([
    this.viewType$,
    this.facade.chartConfig$,
    this.facade.metadata$,
  ]).pipe(
    map(([viewType, config, metadata]) => {
      const url = new URL(`${this.wcEmbedderBaseUrl}`, window.location.origin)
      url.searchParams.set('v', `${GEONETWORK_UI_TAG_NAME}`)
      if (viewType === 'chart') {
        if (config) {
          const { aggregation, xProperty, yProperty, chartType } = config
          url.searchParams.append('e', `gn-dataset-view-chart`)
          url.searchParams.append('a', `aggregation=${aggregation}`)
          url.searchParams.append('a', `x-property=${xProperty}`)
          url.searchParams.append('a', `y-property=${yProperty}`)
          url.searchParams.append('a', `chart-type=${chartType}`)
        } else {
          return ''
        }
      } else if (viewType === 'table') {
        // table
        url.searchParams.append('e', `gn-dataset-view-table`)
      } else {
        // map
        url.searchParams.append('e', `gn-dataset-view-map`)
      }
      url.searchParams.append('a', `api-url=${this.config.basePath}`)
      url.searchParams.append('a', `dataset-id=${metadata.uniqueIdentifier}`)
      url.searchParams.append('a', `primary-color=#0f4395`)
      url.searchParams.append('a', `secondary-color=#8bc832`)
      url.searchParams.append('a', `main-color=#555`)
      url.searchParams.append('a', `background-color=#fdfbff`)
      return url.toString()
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
