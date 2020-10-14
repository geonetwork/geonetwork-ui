import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { RecordSimple, ResultsListLayout } from '@lib/common'

@Component({
  selector: 'ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent implements OnInit {
  @Input() records: RecordSimple[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayout = ResultsListLayout.BLOCK
  layoutEnum = ResultsListLayout

  constructor() {}

  ngOnInit(): void {}
}
