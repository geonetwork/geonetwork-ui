import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { downgradeImage, megabytesToBytes } from '@geonetwork-ui/util/shared'
import { firstValueFrom } from 'rxjs'
import { ButtonComponent } from '../button/button.component'
import { FilesDropDirective } from '../files-drop/files-drop.directive'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

@Component({
  selector: 'gn-ui-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    FilesDropDirective,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
})
export class ImageInputComponent {
  @Input() maxSizeMB: number
  @Input() previewUrl?: string
  @Input() altText?: string
  @Input() uploadProgress?: number
  @Input() uploadError?: boolean
  @Output() fileChange: EventEmitter<File> = new EventEmitter()
  @Output() urlChange: EventEmitter<string> = new EventEmitter()
  @Output() uploadCancel: EventEmitter<void> = new EventEmitter()
  @Output() delete: EventEmitter<void> = new EventEmitter()
  @Output() altTextChange: EventEmitter<string> = new EventEmitter()

  dragFilesOver = false
  showUrlInput = false
  downloadError = false
  showAltTextInput = false

  urlInputValue?: string
  lastUploadType?: 'file' | 'url'
  lastUploadContent?: string | File

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  getPrimaryText() {
    if (this.uploadError) {
      return marker('input.image.uploadErrorLabel')
    }
    if (this.uploadProgress) {
      return marker('input.image.uploadProgressLabel')
    }
    return marker('input.image.selectFileLabel')
  }

  getSecondaryText() {
    if (this.uploadError) {
      return marker('input.image.uploadErrorRetry')
    }
    if (this.uploadProgress) {
      return marker('input.image.uploadProgressCancel')
    }
    return marker('input.image.dropFileLabel')
  }

  handleDragFilesOver(dragFilesOver: boolean) {
    if (!this.showUrlInput) {
      this.dragFilesOver = dragFilesOver
      this.cd.markForCheck()
    }
  }

  handleDropFiles(files: File[]) {
    if (!this.showUrlInput) {
      const validFiles = this.filterTypeImage(files)
      if (validFiles.length > 0) {
        this.resizeAndEmit(validFiles[0])
      }
    }
  }

  handleFileInput(event: Event) {
    const inputFiles = Array.from((event.target as HTMLInputElement).files)
    const validFiles = this.filterTypeImage(inputFiles)
    if (validFiles.length > 0) {
      this.resizeAndEmit(validFiles[0])
    }
  }

  displayUrlInput() {
    this.uploadCancel.emit()
    this.showUrlInput = true
  }

  handleUrlChange(event: Event) {
    this.downloadError = false
    this.urlInputValue = (event.target as HTMLInputElement).value
  }

  async downloadUrl() {
    const name = this.urlInputValue.split('/').pop()

    try {
      const response = await firstValueFrom(
        this.http.head(this.urlInputValue, { observe: 'response' })
      )
      if (
        response.headers.get('content-type')?.startsWith('image/') &&
        parseInt(response.headers.get('content-length')) <
          megabytesToBytes(this.maxSizeMB)
      ) {
        this.http.get(this.urlInputValue, { responseType: 'blob' }).subscribe({
          next: (blob) => {
            this.cd.markForCheck()
            const file = new File([blob], name)
            this.fileChange.emit(file)
          },
          error: () => {
            this.downloadError = true
            this.cd.markForCheck()
            this.urlChange.emit(this.urlInputValue)
          },
        })
      }
    } catch {
      this.downloadError = true
      this.cd.markForCheck()
      return
    }
  }

  handleSecondaryTextClick() {
    if (this.uploadError) {
      this.handleRetry()
    } else if (this.uploadProgress) {
      this.handleCancel()
    }
  }

  handleCancel() {
    this.uploadCancel.emit()
  }

  handleRetry() {
    switch (this.lastUploadType) {
      case 'file':
        this.fileChange.emit(this.lastUploadContent as File)
        break
      case 'url':
        this.urlChange.emit(this.lastUploadContent as string)
        break
    }
  }

  handleDelete() {
    this.delete.emit()
  }

  toggleAltTextInput() {
    this.showAltTextInput = !this.showAltTextInput
  }

  handleAltTextChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.altTextChange.emit(input.value)
  }

  private filterTypeImage(files: File[]) {
    return files.filter((file) => {
      return file.type.startsWith('image/')
    })
  }

  private resizeAndEmit(imageToResize: File) {
    const maxSizeBytes = megabytesToBytes(this.maxSizeMB)
    downgradeImage(imageToResize, maxSizeBytes).then((resizedImage) => {
      const fileToEmit = new File([resizedImage], imageToResize.name)
      this.fileChange.emit(fileToEmit)
    })
  }
}
