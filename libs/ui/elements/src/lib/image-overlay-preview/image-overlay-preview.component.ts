import { Component, EventEmitter, Input, Output } from '@angular/core'
import * as basicLightbox from 'basiclightbox'

@Component({
  selector: 'gn-ui-image-overlay-preview',
  templateUrl: './image-overlay-preview.component.html',
  styleUrls: ['./image-overlay-preview.component.css'],
})
export class ImageOverlayPreviewComponent {
  @Input() imageUrl: string
  @Output() isPlaceholderShown = new EventEmitter<boolean>()
  openLightbox(src: string) {
    basicLightbox.create(`<img src="${src}"/>`).show()
  }
}
