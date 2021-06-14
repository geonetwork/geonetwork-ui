import { Component, Input, OnInit } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'ui-record-preview',
  template: '',
})
export class RecordPreviewComponent implements OnInit {
  @Input() record: RecordSummary
  @Input() linkTarget = '_blank'

  constructor() {}

  ngOnInit(): void {}

  get isViewable() {
    return this.record.viewable
  }
  get isDownloadable() {
    return this.record.downloadable
  }
}
