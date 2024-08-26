import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  OnlineLinkResource,
  OnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { FileInputComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { OnlineResourceCardComponent } from '../../../online-resource-card/online-resource-card.component'
import { DynamicElement, SortableListComponent } from '@geonetwork-ui/ui/layout'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-form-field-attached-resources',
  templateUrl: './form-field-attached-resources.component.html',
  styleUrls: ['./form-field-attached-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FileInputComponent, CommonModule, SortableListComponent],
})
export class FormFieldAttachedResourcesComponent {
  @Input() metadataUuid: string
  @Input() set value(onlineResources: Array<OnlineResource>) {
    this.allResources = onlineResources
    this.linkResources = onlineResources.filter(
      (res): res is OnlineLinkResource => res.type === 'link'
    )
    this.sortableElements = this.linkResources.map((resource) => ({
      component: OnlineResourceCardComponent,
      inputs: { onlineResource: resource },
    }))
  }
  @Output() valueChange: EventEmitter<Array<OnlineResource>> =
    new EventEmitter()

  private allResources: OnlineResource[] = []
  private linkResources: OnlineLinkResource[] = []
  sortableElements: DynamicElement[] = []
  uploadProgress = undefined
  uploadSubscription: Subscription = null

  constructor(
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private platformService: PlatformServiceInterface,
    private cd: ChangeDetectorRef
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
        error: (error: Error) => this.handleError(error.message),
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
      this.handleError((e as Error).message)
    }
  }

  handleResourcesChange(newList: DynamicElement[]) {
    const links = newList.map(
      (e) => e.inputs.onlineResource as OnlineLinkResource
    )
    const newResources = [
      ...this.allResources.filter((r) => r.type !== 'link'),
      ...links,
    ]
    this.valueChange.emit(newResources)
  }

  private handleError(error: string) {
    this.uploadProgress = undefined
    this.notificationsService.showNotification({
      type: 'error',
      title: this.translateService.instant(
        'editor.record.onlineResourceError.title'
      ),
      text: `${this.translateService.instant(
        'editor.record.onlineResourceError.body'
      )} ${error}`,
      closeMessage: this.translateService.instant(
        'editor.record.onlineResourceError.closeMessage'
      ),
    })
  }
}
