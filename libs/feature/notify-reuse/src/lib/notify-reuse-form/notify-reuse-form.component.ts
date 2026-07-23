import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  Overlay,
  OverlayModule,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import {
  CatalogRecord,
  Individual,
  OnlineLinkResource,
  ReuseRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent, TextInputComponent } from '@geonetwork-ui/ui/inputs'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirAppWindow, iconoirPlusCircle } from '@ng-icons/iconoir'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { toSignal } from '@angular/core/rxjs-interop'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

marker('notify.reuse.form.error.title')
marker('notify.reuse.form.error.body')

export const REUSE_FORM_URL = new InjectionToken<string>('reuseFormUrl')

@Component({
  selector: 'gn-ui-notify-reuse-form',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    TextInputComponent,
    ButtonComponent,
    TranslatePipe,
    TranslateDirective,
    NgIcon,
    MatProgressSpinner,
  ],
  templateUrl: './notify-reuse-form.component.html',
  styleUrl: './notify-reuse-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      iconoirAppWindow,
      iconoirPlusCircle,
      matCloseOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class NotifyReuseFormComponent implements OnDestroy {
  private overlay = inject(Overlay)
  private viewContainerRef = inject(ViewContainerRef)
  private scrollStrategies = inject(ScrollStrategyOptions)
  private overlayRef: OverlayRef | null = null
  private recordsRepository = inject(RecordsRepositoryInterface)
  private readonly translate = inject(TranslateService)
  private readonly notificationsService = inject(NotificationsService)
  private readonly platformServiceInterface = inject(PlatformServiceInterface)
  reuseFormUrl = inject(REUSE_FORM_URL, { optional: true })

  me = toSignal(this.platformServiceInterface.getMe())
  initialEmail = computed(() => this.me()?.email)
  templateRef = viewChild<TemplateRef<HTMLElement>>('notifyReuseForm')
  record = input<Partial<CatalogRecord | null>>(null)

  // TODO: use a form() signal once migrated to Angular 22
  title = signal('')
  url = signal('')
  email = signal(this.initialEmail() ?? '')

  titleInput = viewChild<TextInputComponent>('titleInput')
  urlInput = viewChild<TextInputComponent>('urlInput')
  emailInput = viewChild<TextInputComponent>('emailInput')

  loading = signal(false)

  isFormValid = computed(
    () =>
      this.titleInput().isValid() &&
      this.urlInput().isValid() &&
      this.emailInput().isValid()
  )

  clearInputs() {
    this.title.set('')
    this.url.set('')
    this.email.set(this.initialEmail() ?? '')
  }

  toggleOverlay() {
    if (this.overlayRef) {
      this.closeOverlay()
    } else {
      this.openOverlay()
    }
  }

  openOverlay() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerVertically()
      .right('16px')

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.scrollStrategies.noop(),
    })

    this.overlayRef.attach(
      new TemplatePortal(this.templateRef(), this.viewContainerRef)
    )
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay())
  }

  closeOverlay() {
    this.clearInputs()
    this.overlayRef?.dispose()
    this.overlayRef = null
  }

  ngOnDestroy() {
    this.closeOverlay()
  }

  submit() {
    if (!this.isFormValid()) return
    const onlineResource: OnlineLinkResource = {
      type: 'link',
      url: new URL(this.url()),
      name: this.url(),
      description: this.translate.instant('notify.reuse.link.description'),
    }
    const contact: Individual = {
      email: this.email(),
      role: 'point_of_contact',
    }
    const reuseRecord: ReuseRecord = {
      uniqueIdentifier: '',
      kind: 'reuse',
      title: this.title(),
      abstract: '',
      ownerOrganization: { name: '' },
      contacts: [contact],
      contactsForResource: [],
      recordUpdated: new Date(),
      topics: [],
      keywords: [],
      licenses: [],
      legalConstraints: [],
      securityConstraints: [],
      otherConstraints: [],
      overviews: [],
      defaultLanguage: 'en',
      otherLanguages: [],
      lineage: '',
      reuseType: 'application',
      sourceRecords: [
        {
          uuid: this.record()?.uniqueIdentifier ?? '',
          title: this.record()?.title ?? '',
        },
      ],
      onlineResources: [onlineResource],
      spatialExtents: [],
      temporalExtents: [],
    }
    this.loading.set(true)
    this.recordsRepository.saveRecord(reuseRecord, undefined, false).subscribe({
      next: (uniqueIdentifier) => {
        this.loading.set(false)
        this.closeOverlay()
        const baseUrl = `${this.reuseFormUrl ?? ''}`.replace(/\/+$/, '')
        window.open(`${baseUrl}/edit/${uniqueIdentifier}`, '_self')
      },
      error: (err) => {
        this.loading.set(false)
        this.notificationsService.showNotification(
          {
            type: 'error',
            title: this.translate.instant('notify.reuse.form.error.title'),
            text: this.translate.instant('notify.reuse.form.error.body'),
          },
          undefined,
          err
        )
      },
    })
  }
}
