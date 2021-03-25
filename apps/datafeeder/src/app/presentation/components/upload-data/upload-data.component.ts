import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  UploadDataError,
  UploadDataErrorType,
} from '../svg/upload-data-error-dialog/upload-data-error-dialog.component'
import { FileUploadApiService } from '@lib/datafeeder-api'

@Component({
  selector: 'app-upload-data-component',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  file: File = null
  haveRights = false
  uploading = false
  acceptedMimeType = ['application/zip']

  @Input() maxFileSizeMb: number
  @Output() errors$ = new EventEmitter<UploadDataError>()
  @Output() jobId$ = new EventEmitter<string>()

  constructor(private fileUploadApiService: FileUploadApiService) {}

  ngOnInit(): void {}

  fileChange(file) {
    this.file = file
  }

  handleUploadBtnClick() {
    if (!this.haveRights) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.noRightsToSendData',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      })
    } else if (!this.file) {
      this.emitErrors_({
        title: 'datafeeder.upload.error.title.fileHasntSelected',
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
    this.fileUploadApiService.uploadFiles([file]).subscribe((job) => {
      this.jobId$.emit(job.jobId)
      this.uploading = false
    })
  }

  private isFileFormatValid(file: File): boolean {
    return this.acceptedMimeType.includes(file.type)
  }
}
