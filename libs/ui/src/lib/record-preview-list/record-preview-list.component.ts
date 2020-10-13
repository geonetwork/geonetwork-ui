import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import type { RecordSimple } from '@lib/search'

@Component({
  selector: 'ui-record-preview-list',
  templateUrl: './record-preview-list.component.html',
  styleUrls: ['./record-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewListComponent implements OnInit {
  @Input() record: RecordSimple
  constructor() {}

  ngOnInit(): void {}
}
