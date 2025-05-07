import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  NgZone,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { iconoirExpand, iconoirReduce } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import { MatButtonModule } from '@angular/material/button'
import { OverlayModule } from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-truncated-text',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    OverlayModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirExpand, iconoirReduce })],
  templateUrl: './truncated-text.component.html',
  styles: [],
})
export class TruncatedTextComponent implements AfterViewInit {
  @Input() text = ''
  @Input() extraClass = ''

  @ViewChild('textElement') textElement: ElementRef<HTMLElement>
  isTextTruncated = false
  isOpen = false
  overlayPosition = {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  }
  private readonly resizeObserver: ResizeObserver
  private readonly mutationObserver: MutationObserver

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => this.checkTextTruncation())
    })

    this.mutationObserver = new MutationObserver(() => {
      this.ngZone.run(() => this.checkTextTruncation())
    })
  }

  ngAfterViewInit() {
    const element = this.textElement.nativeElement
    this.resizeObserver?.observe(element)
    this.mutationObserver?.observe(element.parentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    this.checkTextTruncation()
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect()
    this.mutationObserver?.disconnect()
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.updateOverlayPosition()
    }
  }

  private updateOverlayPosition() {
    const element = this.textElement.nativeElement
    const rect = element.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const isMobile = viewportWidth < 640
    const overlayWidth = isMobile ? 190 : 320
    const isNearLeftEdge = rect.left < overlayWidth

    this.overlayPosition = {
      originX: isNearLeftEdge ? 'start' : 'end',
      originY: 'top',
      overlayX: isNearLeftEdge ? 'start' : 'end',
      overlayY: 'top',
    }
  }

  close() {
    this.isOpen = false
  }

  private checkTextTruncation() {
    const element = this.textElement.nativeElement

    this.isTextTruncated = element.scrollWidth > element.clientWidth
    this.cd.detectChanges()
  }
}
