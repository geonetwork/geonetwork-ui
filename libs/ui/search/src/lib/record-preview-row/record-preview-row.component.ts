import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  size = 'L'
  constructor(protected elementRef: ElementRef) {
    super(elementRef)
    this.onResize()
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) this.size = 'S'
    else this.size = 'L'
  }
}
