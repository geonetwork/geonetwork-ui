import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-record-preview-card',
  templateUrl: './record-preview-card.component.html',
  styleUrls: ['./record-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RecordPreviewComponent, ThumbnailComponent],
})
export class RecordPreviewCardComponent extends RecordPreviewComponent {}
