import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import type { RecordSummary } from '@lib/common'

@Component({
  selector: 'ui-record-preview-card',
  templateUrl: './record-preview-card.component.html',
  styleUrls: ['./record-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewCardComponent implements OnInit {
  @Input() record: RecordSummary
  constructor() {}

  ngOnInit(): void {}
}
