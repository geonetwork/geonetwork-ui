import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  Injector,
  ChangeDetectorRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { DOCUMENT } from '@angular/common'
import { Platform } from '@angular/cdk/platform'

import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { iconoirList, iconoirReduce } from '@ng-icons/iconoir'
import { MatButtonModule } from '@angular/material/button'
import {
  OverlayModule,
  ConnectedPosition,
  Overlay,
  ScrollDispatcher,
  CdkScrollable,
} from '@angular/cdk/overlay'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  OverlayRef,
  CdkConnectedOverlay,
  OverlayContainer,
} from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { ComponentPortal } from '@angular/cdk/portal'
import { CustomOverlayContainer } from './custom-overlay-container'
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
  providers: [
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    provideIcons({ iconoirList, iconoirReduce }),
  ],
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css'],
})
export class ValueListComponent implements AfterViewInit, OnDestroy {
  @Input() values: { label?: string; code?: string }[] = []
  @Input() extraClass = ''
  @Input() scrollContainer!: CdkScrollable
  @Input() vcRefMarker!: ViewContainerRef
  @Input() zecontainer!: ElementRef
  // @ViewChild(CdkConnectedOverlay) connectedOverlay!: CdkConnectedOverlay

  @ViewChild('simpleOverlay', { static: true })
  simpleOverlayTemplate!: TemplateRef<any>

  @ViewChild('originRef') originRef!: ElementRef

  protected isOpen = false
  protected isVisible = true
  firstCheck = true
  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ]
  protected scrollStrategy: any //= this.overlay.scrollStrategies.reposition()
  private overlayRef?: OverlayRef
  private overlay: Overlay
  private intersectionObserver: IntersectionObserver

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private injector: Injector,
    private overlayContainer: OverlayContainer,
    private overlayService: Overlay,
    private cdr: ChangeDetectorRef
  ) {
    // const overlayContainer = injector.get(
    //   OverlayContainer
    // ) as CustomOverlayContainer

    // this.overlay = injector.get(
    //   Overlay
    // )

    const localInjector = Injector.create({
      providers: [
        {
          provide: OverlayContainer,
          useClass: CustomOverlayContainer,
          deps: [DOCUMENT, Platform],
        },
      ],
      parent: this.injector,
    })

    // Récupérer Overlay depuis l'injecteur local
    this.overlay = localInjector.get(Overlay)

    this.scrollStrategy = this.overlay.scrollStrategies.noop()
  }

  ngAfterViewInit() {
    if (this.scrollContainer) {
      this.scrollDispatcher.register(this.scrollContainer)
    }

    const container = this.zecontainer.nativeElement
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
    this.scrollDispatcher.deregister(this.scrollContainer)
  }

  toggleOverlay() {
    this.isOpen = !this.isOpen
  }

  close() {
    this.isOpen = false
    this.closeOverlay()
  }

  openOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.originRef.nativeElement) // HTMLElement ou ElementRef
      .withFlexibleDimensions(true)
      .withPush(false)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
        },
      ])
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: 'my-highest-overlay',
      // backdropClass: 'cdk-overlay-transparent-backdrop',
    })
    // Option 1 : afficher un composant Angular
    const portal = new TemplatePortal(
      this.simpleOverlayTemplate,
      this.vcRefMarker
    )
    this.overlayRef.attach(portal)

    // this.overlayRef.backdropClick().subscribe(() => {
    //   this.overlayRef?.dispose()
    // })
  }

  closeOverlay(): void {
    this.overlayRef.dispose()
  }
}
