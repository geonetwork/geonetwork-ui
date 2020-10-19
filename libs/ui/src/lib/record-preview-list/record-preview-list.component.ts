import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { RecordSummary } from '@lib/common'

@Component({
  selector: 'ui-record-preview-list',
  templateUrl: './record-preview-list.component.html',
  styleUrls: ['./record-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewListComponent implements OnInit {
  @Input() record: RecordSummary
  constructor() {}

  get isViewable() {
    return this.record.viewable
  }
  get isDownloadable() {
    return this.record.downloadable
  }

  ngOnInit(): void {}
}
