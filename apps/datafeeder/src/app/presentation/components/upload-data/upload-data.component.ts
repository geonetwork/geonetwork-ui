import { Component, EventEmitter, Input, Output } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  UploadDataError,
  UploadDataErrorType,
} from '../svg/upload-data-error-dialog/upload-data-error-dialog.component'
import { FileUploadApiService } from '@geonetwork-ui/data-access/datafeeder'

marker('datafeeder.upload.error.title.noRightsToSendData')
marker('datafeeder.upload.error.title.fileHasntSelected')
marker('datafeeder.upload.error.title.fileSize')
marker('datafeeder.upload.error.subtitle.fileSize')
marker('datafeeder.upload.error.title.fileFormat')
marker('datafeeder.upload.error.subtitle.fileFormat')
marker('datafeeder.upload.error.title.cantOpenFile')
marker('datafeeder.upload.error.subtitle.cantOpenFile')

@Component({
  selector: 'gn-ui-upload-data-component',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent {
  file: File = null
  haveRights = false
  uploading = false
  // Edge use uncommon 'application/x-zip-compressed' mime type
  acceptedMimeType = [
    '.zip',
    'application/zip',
    'application/x-zip-compressed',
    'text/csv',
  ]

  @Input() maxFileSizeMb: number
  @Output() errors$ = new EventEmitter<UploadDataError>()
  @Output() jobId$ = new EventEmitter<string>()

  constructor(private fileUploadApiService: FileUploadApiService) {}

  fileChange(file) {
    this.file = file
  }

  handleUploadBtnClick() {
    if (!this.file) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.fileHasntSelected',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      })
    } else if (!this.haveRights) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.noRightsToSendData',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      })
    } else if (this.file.size > 1048576 * this.maxFileSizeMb) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.fileSize',
        subtitle: 'datafeeder.upload.error.subtitle.fileSize',
        type: UploadDataErrorType.MAX_SIZE,
      })
    } else if (!this.isFileFormatValid(this.file)) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.fileFormat',
        subtitle: 'datafeeder.upload.error.subtitle.fileFormat',
        type: UploadDataErrorType.FILE_FORMAT,
      })
    } else {
      this.uploadFile_(this.file)
    }
  }

  private emitErrors_(error: UploadDataError) {
    this.errors$.emit(error)
  }

  private uploadFile_(file: File) {
    this.uploading = true
    this.fileUploadApiService.uploadFiles([file]).subscribe(
      (job) => {
        this.jobId$.emit(job.jobId)
        this.uploading = false
      },
      () => {
        this.uploading = false
        this.emitErrors_({
          title: 'datafeeder.upload.error.title.cantOpenFile',
          subtitle: 'datafeeder.upload.error.subtitle.cantOpenFile',
          type: UploadDataErrorType.OPEN_FILE,
        })
      }
    )
  }

  private isFileFormatValid(file: File): boolean {
    return this.acceptedMimeType.includes(file.type)
  }
}
