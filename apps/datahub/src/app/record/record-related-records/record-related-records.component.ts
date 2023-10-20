import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'datahub-record-related-records',
  templateUrl: './record-related-records.component.html',
  styleUrls: ['./record-related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordRelatedRecordsComponent {
  @Input() records: CatalogRecord[]
}
