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
import { iconoirList, iconoirReduce } from '@ng-icons/iconoir'
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
  styleUrls: ['./value-list.component.css'],
})
export class ValueListComponent implements AfterViewInit, OnDestroy {
  @Input() values: { label?: string; code?: string }[] = []
  @Input() extraClass = ''
  @Input() cdkScrollContainer!: CdkScrollable
  @Input() scrollContainer!: ElementRef

  @ViewChild('originRef') originRef!: ElementRef

  protected isOpen = false
  protected isVisible = true
  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ]

  private firstCheck = true
  private intersectionObserver: IntersectionObserver

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.cdkScrollContainer) {
      this.scrollDispatcher.register(this.cdkScrollContainer)
    }

    const container = this.scrollContainer.nativeElement
    const target = this.originRef.nativeElement

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 1

        // Ignorer la première émission si visible est false
        if (this.firstCheck && !visible) {
          this.firstCheck = false
          return
        }

        this.firstCheck = false

        if (this.isVisible !== visible) {
          this.isVisible = visible
          this.cdr.detectChanges()
        }

        if (!visible) {
          console.log(
            '❗️Element sort partiellement ou complètement du conteneur'
          )
        } else {
          console.log('✅ Element entièrement visible dans le conteneur')
        }
      },
      {
        root: container,
        threshold: 1.0,
      }
    )

    this.intersectionObserver.observe(target)
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect()
    this.scrollDispatcher.deregister(this.cdkScrollContainer)
  }

  openOverlay() {
    this.isOpen = true
  }

  closeOverlay() {
    this.isOpen = false
  }
}
