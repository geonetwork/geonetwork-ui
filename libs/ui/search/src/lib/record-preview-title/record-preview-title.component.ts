import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-title',
  templateUrl: './record-preview-title.component.html',
  styleUrls: ['./record-preview-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewTitleComponent extends RecordPreviewComponent {}
