import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ElementRef,
  TemplateRef,
  ViewChild,
  Injector,
  ChangeDetectorRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { iconoirReduce } from '@ng-icons/iconoir'
import { MatButtonModule } from '@angular/material/button'
import {
  OverlayModule,
  ConnectedPosition,
  ScrollDispatcher,
  CdkScrollable,
  CdkConnectedOverlay,
  OverlayContainer,
} from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
@Component({
  selector: 'gn-ui-cell-popin',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [provideIcons({ iconoirReduce })],
  templateUrl: './cell-popin.component.html',
  styleUrls: [],
})
export class CellPopinComponent implements AfterViewInit, OnDestroy {
  @Input() extraClass = ''
  @Input() cdkScrollContainer!: CdkScrollable
  @Input() scrollContainer!: ElementRef

  @ViewChild('anchorRef') anchorRef!: ElementRef

  protected isOpen = false
  protected isVisible = true
  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
  ]

  private firstCheck = true
  private intersectionObserver: IntersectionObserver

  private _activePopin = true

  @Input()
  set activePopin(active: boolean | undefined) {
    this._activePopin = !!active
    this.updateIntersectionObserver()
  }
  get activePopin(): boolean {
    return this._activePopin
  }

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (!this.activePopin) {
      return
    }

    if (this.cdkScrollContainer) {
      this.scrollDispatcher.register(this.cdkScrollContainer)
    }

    this.updateIntersectionObserver()
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect()
    this.scrollDispatcher.deregister(this.cdkScrollContainer)
  }

  updateIntersectionObserver() {
    if (!this.scrollContainer || !this.anchorRef) {
      return
    }

    if (this.intersectionObserver) {
      this.intersectionObserver?.disconnect()
    }

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 1

        // Ignore first visibility if first time opening it
        if (this.firstCheck && !visible) {
          this.firstCheck = false
          return
        }

        this.firstCheck = false

        if (this.isVisible !== visible) {
          this.isVisible = visible
          this.cdr.detectChanges()
        }
      },
      {
        root: this.scrollContainer.nativeElement,
        threshold: 1.0,
      }
    )

    this.intersectionObserver.observe(this.anchorRef.nativeElement)
  }

  openOverlay() {
    this.isOpen = true
  }

  closeOverlay() {
    this.isOpen = false
  }
}
