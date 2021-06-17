import { Component, Input } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-record-preview',
  template: '',
})
export class RecordPreviewComponent {
  @Input() record: RecordSummary
  @Input() linkTarget = '_blank'

  get isViewable() {
    return this.record.viewable
  }
  get isDownloadable() {
    return this.record.downloadable
  }
}
