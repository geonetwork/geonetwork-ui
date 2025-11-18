import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-record-preview-text',
  templateUrl: './record-preview-text.component.html',
  styleUrls: ['./record-preview-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RecordPreviewComponent, TranslateDirective],
})
export class RecordPreviewTextComponent extends RecordPreviewComponent {}
