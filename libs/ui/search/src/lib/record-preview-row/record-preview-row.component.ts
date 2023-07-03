import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  constructor(protected elementRef: ElementRef) {
    super(elementRef)
  }
}
