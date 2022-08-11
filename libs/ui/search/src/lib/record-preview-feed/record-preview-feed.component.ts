import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-feed',
  templateUrl: './record-preview-feed.component.html',
  styleUrls: ['./record-preview-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewFeedComponent extends RecordPreviewComponent {}
