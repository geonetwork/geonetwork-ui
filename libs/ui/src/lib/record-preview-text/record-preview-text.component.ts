import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import type { RecordSummary } from '@lib/common'

@Component({
  selector: 'ui-record-preview-text',
  templateUrl: './record-preview-text.component.html',
  styleUrls: ['./record-preview-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewTextComponent implements OnInit {
  @Input() record: RecordSummary
  constructor() {}

  ngOnInit(): void {}
}
