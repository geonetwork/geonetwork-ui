import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import {
  MetadataQualityConfig,
  getMetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPageComponent implements OnDestroy {
  metadataQualityDisplay: boolean

  constructor(public mdViewFacade: MdViewFacade) {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }
  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
  }
}
