import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { MetadataRecord, ResultsListLayout } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent {
  @Input() records: MetadataRecord[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  layoutEnum = ResultsListLayout
}
