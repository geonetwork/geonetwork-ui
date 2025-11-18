import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-card',
  templateUrl: './record-preview-card.component.html',
  styleUrls: ['./record-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ThumbnailComponent],
})
export class RecordPreviewCardComponent extends RecordPreviewComponent {}
