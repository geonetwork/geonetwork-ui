import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
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
} from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { Subscription } from 'rxjs'

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

  @ViewChild('iconElement') iconElement!: ElementRef<HTMLElement>

  isOpen = false
  overlayPosition: ConnectedPosition = {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  }

  private viewportSub!: Subscription

  constructor(
    private readonly ngZone: NgZone,
    private readonly viewport: ViewportRuler
  ) {}

  ngAfterViewInit() {
    this.viewportSub = this.viewport.change().subscribe(() => {
      if (this.isOpen) {
        this.updateOverlayPosition()
      }
    })
  }

  ngOnDestroy() {
    this.viewportSub?.unsubscribe()
    this.close()
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.updateOverlayPosition()
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
