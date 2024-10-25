import { Component, EventEmitter, Input, Output } from '@angular/core'
import * as basicLightbox from 'basiclightbox'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matZoomOutMap } from '@ng-icons/material-icons/baseline'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-image-overlay-preview',
  templateUrl: './image-overlay-preview.component.html',
  styleUrls: ['./image-overlay-preview.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ContentGhostComponent,
    ThumbnailComponent,
    ButtonComponent,
    NgIcon,
  ],
  viewProviders: [provideIcons({ matZoomOutMap })],
})
export class ImageOverlayPreviewComponent {
  @Input() imageUrl: string
  @Output() isPlaceholderShown = new EventEmitter<boolean>()
  openLightbox(src: string) {
    basicLightbox.create(`<img src="${src}"/>`).show()
  }
}
