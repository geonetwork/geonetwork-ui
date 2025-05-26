import { CdkOverlayOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { MatMenuTrigger } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTooltipModule } from '@angular/material/tooltip'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCloudUpload } from '@ng-icons/iconoir'
import { matCheckCircleOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { combineLatest, Observable, of, Subscription } from 'rxjs'
import { catchError, map, skip, switchMap, take } from 'rxjs/operators'
import { DateService } from '@geonetwork-ui/util/shared'

export type RecordSaveStatus = 'saving' | 'upToDate' | 'hasChanges'
@Component({
  selector: 'md-editor-publish-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TranslateDirective,
    TranslatePipe,
    NgIconComponent,
    CdkOverlayOrigin,
  ],
  providers: [
    provideIcons({ iconoirCloudUpload, matCheckCircleOutline }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishButtonComponent implements OnDestroy {
  subscription = new Subscription()
  status$: Observable<RecordSaveStatus> = combineLatest([
    this.facade.changedSinceSave$,
    this.facade.saving$,
    this.facade.isPublished$,
  ]).pipe(
    map(([changedSinceSave, saving, isPublished]) => {
      if (saving) {
        return 'saving'
      }
      if (changedSinceSave || !isPublished) {
        return 'hasChanges'
      }
      return 'upToDate'
    })
  )

  record$ = this.facade.record$

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  @ViewChild('actionMenuButton', { read: ElementRef })
  actionMenuButton!: ElementRef
  @ViewChild('template') template!: TemplateRef<HTMLElement>
  private overlayRef!: OverlayRef

  isActionMenuOpen = false
  publishWarning = null

  constructor(
    private facade: EditorFacade,
    private recordsApiService: RecordsApiService,
    private platformService: PlatformServiceInterface,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private dateService: DateService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  confirmPublish() {
    this.saveRecord()
    this.closeMenu()
  }

  cancelPublish() {
    if (this.overlayRef) {
      this.closeMenu()
    }
  }

  closeMenu() {
    this.isActionMenuOpen = false
    this.overlayRef.dispose()
    this.cdr.markForCheck()
  }

  openConfirmationMenu() {
    this.isActionMenuOpen = true
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.actionMenuButton)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ])

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })

    const portal = new TemplatePortal(this.template, this.viewContainerRef)

    this.overlayRef.attach(portal)

    this.overlayRef.backdropClick().subscribe(() => {
      this.cancelPublish()
    })
  }

  verifyPublishConditions() {
    this.facade.hasRecordChanged$
      .pipe(
        skip(1),
        take(1),
        catchError(() => of({ user: undefined, date: undefined }))
      )
      .subscribe((hasChanged) => {
        if (hasChanged?.date) {
          this.publishWarning = hasChanged
          this.openConfirmationMenu()
        } else {
          this.saveRecord()
        }
      })

    this.facade.record$
      .pipe(
        take(1),
        map((record) => {
          this.facade.checkHasRecordChanged(record)
        })
      )
      .subscribe()
  }

  saveRecord() {
    this.facade.saveRecord()
    this.facade.saveSuccess$
      .pipe(
        take(1),
        switchMap(() =>
          combineLatest([this.platformService.getMe(), this.record$]).pipe(
            take(1)
          )
        ),
        switchMap(([userId, record]) =>
          this.recordsApiService.setRecordOwnership(
            record.uniqueIdentifier,
            0,
            Number(userId.id)
          )
        )
      )
      .subscribe()
  }

  formatDate(date: Date): string {
    return this.dateService.formatDate(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }
}
