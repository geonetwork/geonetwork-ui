import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Inject,
  Optional,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RelatedRecordCardComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'

@Component({
  selector: 'datahub-record-related-records',
  templateUrl: './record-related-records.component.html',
  styleUrls: ['./record-related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RelatedRecordCardComponent, TranslateModule],
})
export class RecordRelatedRecordsComponent {
  @Input() records: CatalogRecord[]

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
