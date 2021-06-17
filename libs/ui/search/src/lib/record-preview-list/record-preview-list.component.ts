import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-list',
  templateUrl: './record-preview-list.component.html',
  styleUrls: ['./record-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewListComponent extends RecordPreviewComponent {}
