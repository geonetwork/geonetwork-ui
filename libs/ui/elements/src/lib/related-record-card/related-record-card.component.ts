import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { CatalogRecord } from 'libs/common/domain/src/lib/model/record'

@Component({
  selector: 'gn-ui-related-record-card',
  templateUrl: './related-record-card.component.html',
  styleUrls: ['./related-record-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordCardComponent {
  @Input() record: CatalogRecord
}
