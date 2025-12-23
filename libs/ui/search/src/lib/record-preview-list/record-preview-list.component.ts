import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { TranslateDirective } from '@ngx-translate/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component.js'

@Component({
  selector: 'gn-ui-record-preview-list',
  templateUrl: './record-preview-list.component.html',
  styleUrls: ['./record-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ThumbnailComponent, TranslateDirective],
})
export class RecordPreviewListComponent extends RecordPreviewComponent {}
