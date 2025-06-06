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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  ButtonComponent,
  FilesDropDirective,
  TextInputComponent,
  UrlInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { downgradeImage, megabytesToBytes } from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  iconoirBin,
  iconoirFramePlusIn,
  iconoirLink,
  iconoirMediaImage,
  iconoirMediaImageXmark,
  iconoirPlus,
} from '@ng-icons/iconoir'
import { TranslatePipe } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { ImageOverlayPreviewComponent } from '../image-overlay-preview/image-overlay-preview.component'

@Component({
  selector: 'gn-ui-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FilesDropDirective,
    MatProgressSpinnerModule,
    TranslatePipe,
    UrlInputComponent,
    TextInputComponent,
    NgIconComponent,
    ImageOverlayPreviewComponent,
  ],
  providers: [
    provideIcons({
      iconoirMediaImage,
      iconoirFramePlusIn,
      iconoirMediaImageXmark,
      iconoirBin,
      iconoirPlus,
      iconoirLink,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class ImageInputComponent {
  private _altText?: string

  @Input() previewUrl?: string
  @Input()
  get altText(): string | undefined {
    return this._altText
  }
  set altText(value: string | undefined) {
    if (value !== 'KO' && this._altText === 'KO') {
      //This is a dataset rollback after upload error
      this.resetErrors()
    }
    this._altText = value
  }

  @Input() maxSizeMB: number
  @Input() uploadProgress?: number
  @Input() uploadError?: boolean
  @Input() disabled?: boolean = false
  @Output() fileChange: EventEmitter<File> = new EventEmitter()
  @Output() urlChange: EventEmitter<string> = new EventEmitter()
  @Output() uploadCancel: EventEmitter<void> = new EventEmitter()
  @Output() delete: EventEmitter<void> = new EventEmitter()
  @Output() altTextChange: EventEmitter<string> = new EventEmitter()

  dragFilesOver = false
  showUrlInput = false
  imageFileError = this.uploadError
  showAltTextInput = false
  pendingAltText: string

  get isUploadInProgress() {
    return this.uploadProgress !== undefined
  }

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  getIsActionBlocked() {
    return this.isUploadInProgress || this.disabled
  }

  getPrimaryText() {
    if (this.imageFileError) {
      return marker('input.image.uploadErrorLabel')
    }
    if (this.uploadProgress) {
      return marker('input.image.uploadProgressLabel')
    }
    return marker('input.image.selectFileLabel')
  }

  getSecondaryText() {
    if (this.imageFileError) {
      return '\u00A0' // (only to keep same spacing, next step is to handle "Retry")
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
    this.resetErrors()
    const validFiles = this.filterTypeImage(files)
    if (validFiles.length > 0) {
      this.showUrlInput = false
      this.resizeAndEmit(validFiles[0])
    } else {
      this.imageFileError = true
      this.handleAltTextChange('KO')
    }
  }

  handleFileInput(event: Event) {
    this.resetErrors()
    const inputFiles = Array.from((event.target as HTMLInputElement).files)
    const validFiles = this.filterTypeImage(inputFiles)
    if (validFiles.length > 0) {
      this.resizeAndEmit(validFiles[0])
    } else {
      this.imageFileError = true
      this.handleAltTextChange('KO')
    }
  }

  displayUrlInput() {
    this.uploadCancel.emit()
    this.showUrlInput = true
  }

  async downloadUrl(url: string) {
    this.resetErrors()
    const name = url.split('/').pop()
    try {
      const response = await firstValueFrom(
        this.http.head(url, { observe: 'response' })
      )
      if (
        response.headers.get('content-type')?.startsWith('image/') &&
        parseInt(response.headers.get('content-length')) <
          megabytesToBytes(this.maxSizeMB)
      ) {
        this.http.get(url, { responseType: 'blob' }).subscribe({
          next: (blob) => {
            this.cd.markForCheck()
            const file = new File([blob], name)
            this.fileChange.emit(file)
          },
          error: () => {
            this.imageFileError = true
            this.handleAltTextChange('KO')
            this.cd.markForCheck()
            this.urlChange.emit(url)
          },
        })
      }
    } catch {
      this.imageFileError = true
      this.handleAltTextChange('KO')
      this.cd.markForCheck()
      return
    }
  }

  handleSecondaryTextClick(event: Event) {
    if (this.uploadProgress) {
      this.handleCancelUpload()
      event.preventDefault()
    }
  }

  handleCancelUpload() {
    this.uploadCancel.emit()
  }

  handleDelete() {
    this.delete.emit()
  }

  resetErrors() {
    this.imageFileError = false
    this.uploadError = false
  }

  toggleAltTextInput() {
    this.showAltTextInput = !this.showAltTextInput
  }

  handleAltTextChange(altText: string) {
    this.altTextChange.emit(altText)
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
