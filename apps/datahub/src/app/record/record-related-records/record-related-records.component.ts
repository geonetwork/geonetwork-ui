import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RelatedRecordCardComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

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
}
