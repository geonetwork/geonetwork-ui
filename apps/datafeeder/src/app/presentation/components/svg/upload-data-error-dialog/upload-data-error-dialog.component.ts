import { Component, Input } from '@angular/core'

export enum UploadDataErrorType {
  NONE,
  MAX_SIZE,
  FILE_FORMAT,
  ANALYSIS,
  OPEN_FILE,
}

export interface UploadDataError {
  title: string
  subtitle: string
  type?: UploadDataErrorType
}

@Component({
  selector: 'gn-ui-upload-data-error-dialog',
  templateUrl: './upload-data-error-dialog.component.html',
  styleUrls: ['./upload-data-error-dialog.component.css'],
})
export class UploadDataErrorDialogComponent {
  @Input() error: UploadDataError
  @Input() maxFileSizeMb: number
}
