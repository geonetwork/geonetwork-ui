import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Inject,
  Optional,
  ViewChild,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { InternalLinkCardComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import {
  PreviousNextButtonsComponent,
  BlockListComponent,
} from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'datahub-record-internal-links',
  templateUrl: './record-internal-links.component.html',
  styleUrls: ['./record-internal-links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PreviousNextButtonsComponent,
    BlockListComponent,
    InternalLinkCardComponent,
  ],
})
export class RecordInternalLinksComponent {
  @Input() records: CatalogRecord[]
  @Input() title: string
  @Input() titleIsSectionTitle = false
  @ViewChild(BlockListComponent) list: BlockListComponent

  recordUrlGetter = this.getRecordUrl.bind(this)

  constructor(
    @Optional()
    @Inject(RECORD_DATASET_URL_TOKEN)
    private recordDatasetUrlTemplate: string,
    @Optional()
    @Inject(RECORD_SERVICE_URL_TOKEN)
    private recordServiceUrlTemplate: string,
    @Optional()
    @Inject(RECORD_REUSE_URL_TOKEN)
    private recordReuseUrlTemplate: string
  ) {}

  getRecordUrl(metadata: CatalogRecord) {
    const tokenMap = {
      dataset: this.recordDatasetUrlTemplate,
      service: this.recordServiceUrlTemplate,
      reuse: this.recordReuseUrlTemplate,
    }
    if (
      !this.recordDatasetUrlTemplate &&
      !this.recordServiceUrlTemplate &&
      !this.recordReuseUrlTemplate
    )
      return null
    const urlKind = tokenMap[metadata.kind]
    return urlKind.replace('${uuid}', metadata.uniqueIdentifier)
  }
}
