import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { MetadataQualityDisplay } from '@geonetwork-ui/ui/elements'
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
  metadataQualityDisplay: MetadataQualityDisplay = {} as MetadataQualityDisplay

  constructor(public mdViewFacade: MdViewFacade) {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = {
      widget: cfg.ENABLED && cfg.DISPLAY_WIDGET_IN_DETAIL !== false,
      title: cfg.DISPLAY_TITLE,
      description: cfg.DISPLAY_DESCRIPTION,
      contact: cfg.DISPLAY_CONTACT,
      keywords: cfg.DISPLAY_KEYWORDS,
      legalConstraints: cfg.DISPLAY_LEGAL_CONSTRAINTS,
      topic: cfg.DISPLAY_TOPIC,
      updateFrequency: cfg.DISPLAY_UPDATE_FREQUENCY,
      organisation: cfg.DISPLAY_ORGANISATION,
    }
  }
  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
  }
}
