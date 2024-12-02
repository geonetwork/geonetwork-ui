import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { combineLatest, Observable } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCloudUpload } from '@ng-icons/iconoir'
import { matCheckCircleOutline } from '@ng-icons/material-icons/outline'
import { MatMenuTrigger } from '@angular/material/menu'
import {
  CdkOverlayOrigin,
  CdkConnectedOverlay,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'

export type RecordSaveStatus = 'saving' | 'upToDate' | 'hasChanges'
@Component({
  selector: 'md-editor-publish-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TranslateModule,
    NgIconComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
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
export class PublishButtonComponent {
  @Input() publishWarning = []
  status$: Observable<RecordSaveStatus> = combineLatest([
    this.facade.changedSinceSave$,
    this.facade.saving$,
  ]).pipe(
    map(([changedSinceSave, saving]) => {
      if (saving) {
        return 'saving'
      }
      if (changedSinceSave) {
        return 'hasChanges'
      }
      return 'upToDate'
    })
  )

  record$ = this.facade.record$

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger

  @ViewChild('actionMenuButton', { read: ElementRef })
  actionMenuButton!: ElementRef
  @ViewChild('template') template!: TemplateRef<any>
  private overlayRef!: OverlayRef

  isActionMenuOpen = false

  constructor(
    private facade: EditorFacade,
    private recordsApiService: RecordsApiService,
    private platformService: PlatformServiceInterface,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  confirmPublish() {
    this.saveRecord()
  }

  cancelPublish() {
    if (this.overlayRef) {
      this.isActionMenuOpen = false
      this.overlayRef.dispose()
      this.cdr.markForCheck()
    }
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

  publishRecord() {
    if (this.publishWarning.length) {
      this.openConfirmationMenu()
    } else {
      this.saveRecord()
    }
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
}
