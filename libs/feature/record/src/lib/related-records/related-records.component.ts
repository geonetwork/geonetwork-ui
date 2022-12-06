import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-related-records',
  templateUrl: './related-records.component.html',
  styleUrls: ['./related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordsComponent {
  @Input() records: MetadataRecord[]
}
