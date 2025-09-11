import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-record-preview-list',
  templateUrl: './record-preview-list.component.html',
  styleUrls: ['./record-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecordPreviewComponent,
    ThumbnailComponent,
    TranslateDirective,
  ],
})
export class RecordPreviewListComponent extends RecordPreviewComponent {}
