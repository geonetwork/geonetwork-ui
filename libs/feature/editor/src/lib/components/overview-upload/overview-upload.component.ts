import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-overview-upload',
  standalone: true,
  imports: [CommonModule, UiInputsModule],
  templateUrl: './overview-upload.component.html',
  styleUrls: ['./overview-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewUploadComponent {
  @Input() metadataUuid: string
  _overview: GraphicOverview | null
  @Input()
  set overview(value: GraphicOverview | null) {
    this._overview = value
    if (this._overview) {
      this.recordsApiService.getAllResources(this.metadataUuid).subscribe({
        next: (resources) => {
          const resource = resources.find(
            (r) => r.url === this._overview.url.toString()
          )
          if (resource) {
            this.resourceFileName = resource.filename
          }
        },
        error: this.errorHandle,
      })
      this.resourceUrl = this._overview.url.toString()
      this.altText = this._overview.description
    } else {
      this.resourceUrl = ''
      this.resourceFileName = ''
      this.altText = ''
    }
  }

  @Output() overviewChange = new EventEmitter<GraphicOverview | null>()

  resourceUrl: string
  resourceFileName: string
  altText: string

  constructor(
    private recordsApiService: RecordsApiService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {}

  handleFileChange(file: File) {
    this.recordsApiService
      .putResource(this.metadataUuid, file, 'public')
      .subscribe({
        next: (resource) => {
          this.overviewChange.emit({
            url: new URL(resource.url),
            description: resource.filename,
          })
        },
        error: this.errorHandle,
      })
  }

  handleUrlChange(url: string) {
    this.recordsApiService
      .putResourceFromURL(this.metadataUuid, url, 'public')
      .subscribe({
        next: (resource) => {
          this.overviewChange.emit({
            url: new URL(resource.url),
            description: resource.filename,
          })
        },
        error: this.errorHandle,
      })
  }

  handleAltTextChange(newAltText: string) {
    this.overviewChange.emit({
      url: new URL(this.resourceUrl),
      description: newAltText,
    })
  }

  handleDelete() {
    this.overviewChange.emit(null)
  }

  private errorHandle = (error) => {
    this.notificationsService.showNotification({
      type: 'error',
      title: this.translateService.instant('editor.record.resourceError.title'),
      text: `${this.translateService.instant(
        'editor.record.resourceError.body'
      )} ${error.message}`,
      closeMessage: this.translateService.instant(
        'editor.record.resourceError.closeMessage'
      ),
    })
  }
}
