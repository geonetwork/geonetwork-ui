import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { RecordSummary, ResultsListLayout } from '@lib/common'

@Component({
  selector: 'ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent implements OnInit {
  @Input() records: RecordSummary[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Output() mdSelect = new EventEmitter<RecordSummary>()
  layoutEnum = ResultsListLayout

  constructor() {}

  ngOnInit(): void {}
}
