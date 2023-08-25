import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-related-records',
  templateUrl: './related-records.component.html',
  styleUrls: ['./related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordsComponent {
  @Input() records: CatalogRecord[]
}
