import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { LogService } from '@lib/common'
import {
  UploadDataError,
  UploadDataErrorType,
} from '../svg/upload-data-error-dialog/upload-data-error-dialog.component'

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

  constructor(private logService: LogService) {}

  ngOnInit(): void {}

  fileChange(file) {
    this.file = file
  }

  handleUploadBtnClick() {
    if (!this.haveRights) {
      this.emitUploadData(null, {
        title: 'No rights to send data',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      })

      return
    }

    if (!this.file) {
      this.emitUploadData(null, {
        title: 'File hasnt selected',
        subtitle: '',
        type: UploadDataErrorType.NONE,
      })
      return
    }

    if (this.file.size > 1048576 * this.maxFileSizeMb) {
      this.emitUploadData(null, {
        title: 'The selected file size is too large',
        subtitle: 'Remember, 30MB maximum',
        type: UploadDataErrorType.MAX_SIZE,
      })

      return
    }

    if (!this.isFileFormatValid(this.file)) {
      this.emitUploadData(null, {
        title: 'The selected file format is not available',
        subtitle:
          'Remember, we accepted SHP, GeoPackage, GeoJSON and Spatialite',
        type: UploadDataErrorType.FILE_FORMAT,
      })
      return
    }

    this.emitUploadData(this.file)
  }

  emitUploadData(file: File, err?: UploadDataError) {
    if (err) {
      this.logService.error(err.title)
    }

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
