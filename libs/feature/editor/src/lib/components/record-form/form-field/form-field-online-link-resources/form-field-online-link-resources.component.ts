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
import {
  OnlineLinkResource,
  OnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import {
  FileInputComponent,
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

@Component({
  selector: 'gn-ui-form-field-online-link-resources',
  templateUrl: './form-field-online-link-resources.component.html',
  styleUrls: ['./form-field-online-link-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileInputComponent,
    CommonModule,
    SortableListComponent,
    OnlineResourceCardComponent,
    TextInputComponent,
    TextAreaComponent,
    UrlInputComponent,
    TranslateDirective,
  ],
})
export class FormFieldOnlineLinkResourcesComponent {
  @Input() metadataUuid: string
  @Input() set value(onlineResources: Array<OnlineResource>) {
    this.allResources = onlineResources
    this.linkResources = onlineResources.filter(
      (res): res is OnlineLinkResource => res.type === 'link'
    )
  }
  @Output() valueChange: EventEmitter<Array<OnlineResource>> =
    new EventEmitter()

  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<OnlineResource>

  private allResources: OnlineResource[] = []
  linkResources: OnlineLinkResource[] = []
  uploadProgress?: number = undefined
  uploadSubscription: Subscription = null

  protected MAX_UPLOAD_SIZE_MB = MAX_UPLOAD_SIZE_MB

  constructor(
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private platformService: PlatformServiceInterface,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

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
            const newResource: OnlineLinkResource = {
              type: 'link',
              url: new URL(event.attachment.url),
              name: event.attachment.fileName,
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

  handleUrlChange(url: string) {
    try {
      const name = url.split('/').pop()
      const newLink: OnlineLinkResource = {
        type: 'link',
        url: new URL(url),
        name,
      }
      this.valueChange.emit([...this.allResources, newLink])
    } catch (e) {
      this.handleError(e as Error)
    }
  }

  handleResourcesChange(items: unknown[]) {
    const links = items as OnlineResource[]
    const newResources = [
      ...this.allResources.filter((r) => r.type !== 'link'),
      ...links,
    ]
    this.valueChange.emit(newResources)
  }

  handleResourceModify(resource: OnlineLinkResource, index: number) {
    this.openEditDialog(resource, index)
  }

  private handleError(error: Error) {
    this.uploadProgress = undefined
    this.cd.detectChanges()
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

  private openEditDialog(resource: OnlineLinkResource, index: number) {
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
        const newLinks = [...this.linkResources]
        newLinks.splice(index, 1, resourceCopy)
        this.valueChange.emit([
          ...this.allResources.filter((r) => r.type !== 'link'),
          ...newLinks,
        ])
      })
  }
}
