import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-related-record-card',
  templateUrl: './related-record-card.component.html',
  styleUrls: ['./related-record-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordCardComponent {
  @Input() record: MetadataRecord
}
