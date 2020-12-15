import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { LogService } from '@lib/common'
import {
  UploadDataError,
  UploadDataErrorType,
} from '../svg/upload-data-error-dialog/upload-data-error-dialog.component'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

export interface UploadData {
  file: File
  error?: UploadDataError
}

const VALID_FILE_EXTENSIONS = ['shp', 'json', 'gpkg', 'db']

@Component({
  selector: 'app-upload-data-component',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  file: File = null
  haveRights = false

  @Input() maxFileSizeMb: number
  @Output() uploadData = new EventEmitter<UploadData>()

  constructor(
    private logService: LogService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  fileChange(file) {
    this.file = file
  }

  handleUploadBtnClick() {
    if (!this.haveRights) {
      this.translateAndEmitUploadData(null, {
        title: 'datafeeder.upload.error.title.noRightsToSendData',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      }).subscribe()

      return
    }

    if (!this.file) {
      this.translateAndEmitUploadData(null, {
        title: 'datafeeder.upload.error.title.fileHasntSelected',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      }).subscribe()
      return
    }

    if (this.file.size > 1048576 * this.maxFileSizeMb) {
      this.translateAndEmitUploadData(null, {
        title: 'datafeeder.upload.error.title.fileSize',
        subtitle: 'datafeeder.upload.error.subtitle.fileSize',
        type: UploadDataErrorType.MAX_SIZE,
      }).subscribe()

      return
    }

    if (!this.isFileFormatValid(this.file)) {
      this.translateAndEmitUploadData(null, {
        title: 'datafeeder.upload.error.title.fileFormat',
        subtitle: 'datafeeder.upload.error.subtitle.fileFormat',
        type: UploadDataErrorType.FILE_FORMAT,
      }).subscribe()
      return
    }

    this.translateAndEmitUploadData(this.file).subscribe()
  }

  translateAndEmitUploadData(
    file: File,
    err?: UploadDataError
  ): Observable<void> {
    if (err) {
      this.logService.error(err.title)

      return new Observable<void>((result) => {
        this.translateService.get(err.title).subscribe((title) => {
          err.title = title
          console.log(title)

          if (!err.subtitle) {
            this.emitUploadData(file, err)
            result.complete()

            return
          }

          this.translateService.get(err.subtitle).subscribe((subtitle) => {
            err.subtitle = subtitle

            this.emitUploadData(file, err)

            result.complete()
          })
        })
      })
    }

    return new Observable<void>((result) => {
      this.emitUploadData(file, err)
      result.complete()
    })
  }

  private emitUploadData(file: File, err?: UploadDataError) {
    this.uploadData.emit({
      file,
      error: err,
    })
  }

  private isFileFormatValid(file: File): boolean {
    const fileExt = file.name.split('.').pop()
    return !!VALID_FILE_EXTENSIONS.find(
      (ext) => !ext.localeCompare(fileExt.toLocaleLowerCase())
    )
  }
}
