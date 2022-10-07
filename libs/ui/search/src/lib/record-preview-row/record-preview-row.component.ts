import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { stripHtml } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent
  extends RecordPreviewComponent
  implements OnInit
{
  abstract: string
  ngOnInit() {
    super.ngOnInit()
    this.abstract = stripHtml(this.record.abstract)
  }
}
