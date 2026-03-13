import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matZoomOutMap } from '@ng-icons/material-icons/baseline'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'

@Component({
  selector: 'gn-ui-image-overlay-preview',
  templateUrl: './image-overlay-preview.component.html',
  styleUrls: ['./image-overlay-preview.component.css'],
  standalone: true,
  imports: [ContentGhostComponent, ThumbnailComponent, ButtonComponent, NgIcon],
  viewProviders: [
    provideIcons({ matZoomOutMap }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class ImageOverlayPreviewComponent {
  @Input() imageUrl: string
  @Output() isPlaceholderShown = new EventEmitter<boolean>()

  @ViewChild('imageTemplate') imageTemplate: TemplateRef<HTMLElement>

  private overlay = inject(Overlay)
  private viewContainerRef = inject(ViewContainerRef)
  private overlayRef: OverlayRef

  openLightbox() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
    const scrollStrategy = this.overlay.scrollStrategies.block()

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-black/80',
      positionStrategy,
      scrollStrategy,
    })
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose())
    const portal = new TemplatePortal(this.imageTemplate, this.viewContainerRef)
    this.overlayRef.attach(portal)
  }

  closeLightbox() {
    this.overlayRef?.dispose()
  }
}
