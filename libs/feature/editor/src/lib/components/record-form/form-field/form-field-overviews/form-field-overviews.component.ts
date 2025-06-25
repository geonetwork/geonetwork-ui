import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'
import { ImageInputComponent } from '@geonetwork-ui/ui/elements'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { MAX_UPLOAD_SIZE_MB } from '../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-overviews',
  templateUrl: './form-field-overviews.component.html',
  styleUrls: ['./form-field-overviews.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ImageInputComponent],
})
export class FormFieldOverviewsComponent {
  @Input() metadataUuid: string
  @Input() value: Array<GraphicOverview>
  @Output() valueChange: EventEmitter<Array<GraphicOverview>> =
    new EventEmitter()

  uploadProgress = undefined
  uploadSubscription: Subscription = null

  protected MAX_UPLOAD_SIZE_MB = MAX_UPLOAD_SIZE_MB

  get firstOverview() {
    return (
      this.value[0] ?? {
        url: null,
        description: '',
      }
    )
  }

  constructor(
    private platformService: PlatformServiceInterface,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
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
            this.emitOverview({
              url: event.attachment.url,
              description: event.attachment.fileName.replace(/\.[^/.]+$/, ''),
            })
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
      const filename = url.split('/').pop()
      this.emitOverview({
        url: new URL(url),
        description: filename,
      })
    } catch (e) {
      this.handleError(e as Error)
    }
  }

  handleAltTextChange(newAltText: string) {
    this.emitOverview({
      url: this.firstOverview.url,
      description: newAltText,
    })
  }

  handleDelete() {
    this.emitOverview(null)
  }

  emitOverview(overView: GraphicOverview | null) {
    this.valueChange.emit(overView ? [overView] : [])
  }

  private handleError = (error: Error) => {
    this.uploadProgress = undefined
    this.cd.markForCheck()
    this.notificationsService.showNotification(
      {
        type: 'error',
        title: this.translateService.instant(
          'editor.record.resourceError.title'
        ),
        text: `${this.translateService.instant(
          'editor.record.resourceError.body'
        )} ${error.message}`,
        closeMessage: this.translateService.instant(
          'editor.record.resourceError.closeMessage'
        ),
      },
      undefined,
      error
    )
  }
}
