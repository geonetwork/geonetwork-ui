import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { LogService } from '@lib/common'

export interface UploadData {
  file: File
  error?: string
}

@Component({
  selector: 'app-upload-data-component',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  file: File = null
  haveRights = false

  @Output() uploadData = new EventEmitter<UploadData>()

  constructor(private logService: LogService) {}

  ngOnInit(): void {}

  fileChange(file) {
    this.file = file
  }

  handleUploadBtnClick() {
    if (!this.haveRights) {
      this.emitUploadData(null, 'User hast rights to send this data')

      return
    }

    if (!this.file) {
      this.emitUploadData(null, 'User didnt select file!')
      return
    }

    this.emitUploadData(this.file)
  }

  emitUploadData(file: File, msgErr?: string) {
    if (msgErr) {
      this.logService.error(msgErr)
    }

    this.uploadData.emit({
      file,
      error: msgErr,
    })
  }
}
