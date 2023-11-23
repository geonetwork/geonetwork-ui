import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from 'libs/common/domain/src/lib/model/record'

@Component({
  selector: 'datahub-record-related-records',
  templateUrl: './record-related-records.component.html',
  styleUrls: ['./record-related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordRelatedRecordsComponent {
  @Input() records: CatalogRecord[]
}
