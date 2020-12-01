import { Component, Input, OnInit } from '@angular/core'

export enum UploadDataErrorType {
  NONE,
  MAX_SIZE,
  FILE_FORMAT,
}

export interface UploadDataError {
  title: string
  subtitle: string
  type?: UploadDataErrorType
}

@Component({
  selector: 'app-upload-data-error-dialog',
  templateUrl: './upload-data-error-dialog.component.html',
  styleUrls: ['./upload-data-error-dialog.component.css'],
})
export class UploadDataErrorDialogComponent implements OnInit {
  @Input() error: UploadDataError

  constructor() {}

  ngOnInit(): void {}
}
