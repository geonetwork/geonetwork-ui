import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RecordPreviewComponent } from '@geonetwork-ui/ui/search'
import { stripHtml } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-record-preview-datahub',
  templateUrl: './record-preview-datahub.component.html',
  styleUrls: ['./record-preview-datahub.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewDatahubComponent
  extends RecordPreviewComponent
  implements OnInit
{
  abstract: string
  ngOnInit() {
    super.ngOnInit()
    this.abstract = stripHtml(this.record.abstract)
  }
}
