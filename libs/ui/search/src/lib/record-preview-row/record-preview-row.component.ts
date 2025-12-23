import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core'
import { InternalLinkCardComponent } from '@geonetwork-ui/ui/elements'
import { RecordPreviewComponent } from '../record-preview/record-preview.component.js'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [InternalLinkCardComponent],
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  protected elementRef: ElementRef

  size = 'L'
  constructor() {
    const elementRef = inject(ElementRef)

    super(elementRef)
    this.elementRef = elementRef

    this.onResize()
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) this.size = 'S'
    else this.size = 'L'
  }
}
