import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import {
  MdViewFacade,
  RecordMetaComponent,
} from '@geonetwork-ui/feature/record'
import {
  getMetadataQualityConfig,
  MetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { RecordMetadataComponent } from '../record-metadata/record-metadata.component'
import { HeaderRecordComponent } from '../header-record/header-record.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecordMetadataComponent,
    HeaderRecordComponent,
    RecordMetaComponent,
  ],
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
