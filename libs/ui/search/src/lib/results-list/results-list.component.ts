import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { RecordSummary, ResultsListLayout } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent {
  @Input() records: RecordSummary[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  layoutEnum = ResultsListLayout
}
