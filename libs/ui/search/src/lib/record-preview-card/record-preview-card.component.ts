import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-card',
  templateUrl: './record-preview-card.component.html',
  styleUrls: ['./record-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewCardComponent extends RecordPreviewComponent {}
