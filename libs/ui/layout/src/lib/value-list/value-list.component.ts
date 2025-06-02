import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { iconoirList, iconoirReduce } from '@ng-icons/iconoir'
import { MatButtonModule } from '@angular/material/button'
import {
  OverlayModule,
  ConnectedPosition,
  ViewportRuler,
  Overlay,
  ScrollDispatcher,
  CdkScrollable,
} from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { fromEvent, Subscription, throttleTime } from 'rxjs'
import { CdkConnectedOverlay } from '@angular/cdk/overlay'

@Component({
  selector: 'gn-ui-value-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirList, iconoirReduce })],
  templateUrl: './value-list.component.html',
  styles: [],
})
export class ValueListComponent implements AfterViewInit, OnDestroy {
  @Input() values: { label?: string; code?: string }[] = []
  @Input() extraClass = ''
  @Input() scrollContainer!: CdkScrollable
  @ViewChild('iconElement') iconElement!: ElementRef<HTMLElement>
  @ViewChild(CdkConnectedOverlay) connectedOverlay!: CdkConnectedOverlay
  // @Input() scrollContainer!: HTMLElement

  isOpen = false
  overlayPosition: ConnectedPosition = {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  }

  private viewportSub!: Subscription
  protected scrollStrategy = this.overlay.scrollStrategies.reposition()

  private scrollSub!: Subscription

  constructor(
    private readonly viewport: ViewportRuler,
    private scrollDispatcher: ScrollDispatcher,
    private overlay: Overlay
  ) {}

  ngAfterViewInit() {
    if (this.scrollContainer) {
      this.scrollDispatcher.register(this.scrollContainer)
    }

    // this.scrollSub = this.scrollDispatcher
    //   .scrolled(100) // audit time en ms
    //   .subscribe(() => {
    //     console.log('scrolled ----')
    //     const overlayRef = this.connectedOverlay?.overlayRef
    //     if (overlayRef) {
    //       overlayRef.updatePosition()
    //     }
    //   })

    // const element = this.scrollContainer.getElementRef().nativeElement

    // this.scrollSub = fromEvent(element, 'scroll')
    //   .pipe(throttleTime(100))
    //   .subscribe(() => {
    //     console.log('fesfes scrolled ----')
    //     this.connectedOverlay?.overlayRef?.updatePosition()
    //   })

    // if (this.scrollContainer) {
    //   this.scrollSub = fromEvent(this.scrollContainer, 'scroll')
    //     .pipe(throttleTime(100))
    //     .subscribe(() => {
    //       console.log('[Overlay] scroll détecté');
    //       this.connectedOverlay?.overlayRef?.updatePosition();
    //     });
    // }

    this.viewportSub = this.viewport.change().subscribe(() => {
      if (this.isOpen) {
        // this.updateOverlayPosition()
      }
    })
  }

  ngOnDestroy() {
    // this.scrollDispatcher.deregister(this.scrollContainer)
    this.viewportSub?.unsubscribe()
    this.close()
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      // this.updateOverlayPosition()
    }
  }

  close() {
    this.isOpen = false
  }

  private updateOverlayPosition() {
    const rect = this.iconElement.nativeElement.getBoundingClientRect()
    const isNearLeftEdge = rect.left < 190 // same break-point as other component

    this.overlayPosition = {
      originX: isNearLeftEdge ? 'start' : 'end',
      originY: 'top',
      overlayX: isNearLeftEdge ? 'start' : 'end',
      overlayY: 'top',
    }
  }
}
