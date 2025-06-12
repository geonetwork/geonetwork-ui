import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  OnlineResource,
  ServiceEndpoint,
} from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import {
  FileInputComponent,
  SwitchToggleComponent,
  SwitchToggleOption,
  TextAreaComponent,
  TextInputComponent,
  UrlInputComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  ModalDialogComponent,
  SortableListComponent,
} from '@geonetwork-ui/ui/layout'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { MAX_UPLOAD_SIZE_MB } from '../../../../fields.config'
import { OnlineResourceCardComponent } from '../../../online-resource-card/online-resource-card.component'
import { OnlineServiceResourceInputComponent } from '../../../online-service-resource-input/online-service-resource-input.component'

type OnlineNotLinkResource =
  | DatasetDownloadDistribution
  | DatasetServiceDistribution
  | ServiceEndpoint

@Component({
  selector: 'gn-ui-form-field-online-resources',
  templateUrl: './form-field-online-resources.component.html',
  styleUrls: ['./form-field-online-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SwitchToggleComponent,
    FileInputComponent,
    OnlineServiceResourceInputComponent,
    UrlInputComponent,
    SortableListComponent,
    OnlineResourceCardComponent,
    TextInputComponent,
    TextAreaComponent,
    TranslateDirective,
  ],
})
export class FormFieldOnlineResourcesComponent {
  @Input() metadataUuid: string
  @Input() set value(onlineResources: Array<OnlineResource>) {
    this.allResources = onlineResources
    this.notLinkResources = onlineResources.filter(
      (res): res is OnlineNotLinkResource => res.type !== 'link'
    )
  }
  @Output() valueChange: EventEmitter<Array<OnlineResource>> =
    new EventEmitter()

  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<OnlineResource>

  typeOptions: SwitchToggleOption[] = [
    {
      label: marker('editor.record.form.field.onlineResource.toggle.dataset'),
      value: 'download',
      checked: true,
    },
    {
      label: marker('editor.record.form.field.onlineResource.toggle.service'),
      value: 'service',
      checked: false,
    },
  ]
  selectedType: 'download' | 'service' = 'download'

  private allResources: OnlineResource[] = []
  notLinkResources: OnlineNotLinkResource[] = []
  uploadProgress = undefined
  uploadSubscription: Subscription = null
  newService = <DatasetServiceDistribution>{
    type: 'service',
    accessServiceProtocol: 'ogcFeatures',
    identifierInService: '',
    url: undefined,
  }

  protected MAX_UPLOAD_SIZE_MB = MAX_UPLOAD_SIZE_MB

  constructor(
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private platformService: PlatformServiceInterface,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  onSelectedTypeChange(selectedType: unknown) {
    this.selectedType = selectedType as 'download' | 'service'
  }

  handleFileChange(file: File) {
    this.uploadProgress = 0
    this.uploadSubscription = this.platformService
      .attachFileToRecord(this.metadataUuid, file)
      .subscribe({
        next: (event) => {
          if (event.type === 'progress') {
            this.uploadProgress = event.progress
            this.cd.detectChanges()
          } else if (event.type === 'success') {
            this.uploadProgress = undefined
            this.cd.detectChanges()
            const newResource: DatasetDownloadDistribution = {
              type: 'download',
              url: new URL(event.attachment.url),
              name: event.attachment.fileName,
              sizeBytes: event.sizeBytes, // WARNING: this is the only time that sizeBytes is set
            }
            this.valueChange.emit([...this.allResources, newResource])
          }
        },
        error: (error: Error) => this.handleError(error),
      })
  }

  handleUploadCancel() {
    if (this.uploadSubscription) {
      this.uploadProgress = undefined
      this.uploadSubscription.unsubscribe()
    }
  }

  handleDownloadUrlChange(url: string) {
    try {
      const name = url.split('/').pop()
      const newLink: DatasetDownloadDistribution = {
        type: 'download',
        url: new URL(url),
        name,
      }
      this.valueChange.emit([...this.allResources, newLink])
    } catch (e) {
      this.handleError(e as Error)
    }
  }

  handleServiceChange(service: DatasetServiceDistribution) {
    this.valueChange.emit([...this.allResources, service])
  }

  handleResourcesChange(items: unknown[]) {
    const notLinks = items as OnlineNotLinkResource[]
    const newResources = [
      ...this.allResources.filter((r) => r.type === 'link'),
      ...notLinks,
    ]
    this.valueChange.emit(newResources)
  }

  handleResourceModify(resource: OnlineNotLinkResource, index: number) {
    this.openEditDialog(resource, index)
  }

  private handleError(error: Error) {
    this.uploadProgress = undefined
    this.notificationsService.showNotification(
      {
        type: 'error',
        title: this.translateService.instant(
          'editor.record.onlineResourceError.title'
        ),
        text: `${this.translateService.instant(
          'editor.record.onlineResourceError.body'
        )} ${error.message}`,
        closeMessage: this.translateService.instant(
          'editor.record.onlineResourceError.closeMessage'
        ),
      },
      undefined,
      error
    )
  }

  private openEditDialog(resource: OnlineNotLinkResource, index: number) {
    const resourceCopy = {
      ...resource,
    }
    this.dialog
      .open(ModalDialogComponent, {
        width: '800px',
        data: {
          title: this.translateService.instant(
            'editor.record.form.field.onlineResource.dialogTitle'
          ),
          body: this.dialogTemplate,
          bodyContext: resourceCopy,
          confirmText: this.translateService.instant(
            'editor.record.form.field.onlineResource.confirm'
          ),
          cancelText: this.translateService.instant(
            'editor.record.form.field.onlineResource.cancel'
          ),
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        const newNotLinks = [...this.notLinkResources]
        newNotLinks.splice(index, 1, resourceCopy)
        this.valueChange.emit([
          ...this.allResources.filter((r) => r.type === 'link'),
          ...newNotLinks,
        ])
      })
  }
}
