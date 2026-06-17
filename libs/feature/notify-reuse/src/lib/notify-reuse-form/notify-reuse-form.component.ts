import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
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
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  iconoirAppWindow,
  iconoirPlusCircle,
  iconoirXmark,
} from '@ng-icons/iconoir'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { SpinningLoaderComponent } from '@geonetwork-ui/ui/widgets'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.notify.reuse.form.error.title')
marker('record.notify.reuse.form.error.body')

export const REUSE_FORM_URL = new InjectionToken<string>('reuseFormUrl')
@Component({
  selector: 'gn-ui-notify-reuse-form',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    TextInputComponent,
    ButtonComponent,
    SpinningLoaderComponent,
    TranslatePipe,
    TranslateDirective,
    NgIcon,
  ],
  templateUrl: './notify-reuse-form.component.html',
  styleUrl: './notify-reuse-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      iconoirAppWindow,
      iconoirPlusCircle,
      iconoirXmark,
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
  reuseFormUrl = inject(REUSE_FORM_URL, { optional: true })

  @ViewChild('notifyReuseForm') templateRef: TemplateRef<unknown>

  @Input() set record(value: Partial<CatalogRecord> | null) {
    this._record = value
    this.email = value?.ownerOrganization?.email ?? ''
  }
  get record() {
    return this._record
  }
  private _record: Partial<CatalogRecord> | null = null

  title = ''
  url = ''
  email = ''
  loading = signal(false)

  get isFormValid() {
    // TODO: validate URL format and email format and display message to user
    return (
      this.title.trim() !== '' &&
      this.url.trim() !== '' &&
      this.email.trim() !== ''
    )
  }

  clearInputs() {
    this.title = ''
    this.url = ''
    this.email = this.record?.ownerOrganization?.email ?? ''
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
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.scrollStrategies.noop(),
    })

    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    )
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay())
  }

  closeOverlay() {
    this.overlayRef?.dispose()
    this.overlayRef = null
  }

  ngOnDestroy() {
    this.closeOverlay()
  }

  submit() {
    if (!this.isFormValid) return
    const onlineResource: OnlineLinkResource = {
      type: 'link',
      url: new URL(this.url),
      name: this.translate.instant('record.notify.reuse.resource.name'),
      description: this.translate.instant(
        'record.notify.reuse.resource.description'
      ),
    }
    const contact: Individual = {
      email: this.email,
      role: 'point_of_contact',
    }
    const reuseRecord: ReuseRecord = {
      uniqueIdentifier: '',
      kind: 'reuse',
      title: this.title,
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
          uuid: this.record?.uniqueIdentifier ?? '',
          title: this.record?.title ?? '',
        },
      ],
      onlineResources: [onlineResource],
      spatialExtents: [],
      temporalExtents: [],
    }
    this.loading.set(true)
    this.recordsRepository.saveRecord(reuseRecord).subscribe({
      next: (uniqueIdentifier) => {
        console.log(
          'Reuse record saved with unique identifier:',
          uniqueIdentifier
        )
        this.loading.set(false)
        this.clearInputs()
        this.closeOverlay()
        const baseUrl = `${this.reuseFormUrl ?? ''}`.replace(/\/+$/, '')
        window.open(`${baseUrl}/edit/${uniqueIdentifier}`, '_self')
      },
      error: (err) => {
        this.loading.set(false)
        this.clearInputs()
        this.closeOverlay()
        this.notificationsService.showNotification(
          {
            type: 'error',
            title: this.translate.instant(
              'record.notify.reuse.form.error.title'
            ),
            text: this.translate.instant('record.notify.reuse.form.error.body'),
          },
          7000,
          err
        )
      },
    })
  }
}
