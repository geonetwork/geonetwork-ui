import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FilesDropDirective } from '../files-drop/files-drop.directive'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { UrlInputComponent } from '../url-input/url-input.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCloudUpload, iconoirFramePlusIn } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FilesDropDirective,
    MatProgressSpinnerModule,
    UrlInputComponent,
    NgIconComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  providers: [
    provideIcons({
      iconoirCloudUpload,
      iconoirFramePlusIn,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class FileInputComponent {
  @Input() maxSizeMB: number
  @Input() uploadProgress?: number
  @Output() fileChange: EventEmitter<File> = new EventEmitter()
  @Output() urlChange: EventEmitter<string> = new EventEmitter()
  @Output() uploadCancel: EventEmitter<void> = new EventEmitter()
  @Input() disabled? = false

  dragFilesOver = false

  get isUploadInProgress() {
    return this.uploadProgress !== undefined
  }

  constructor(private cd: ChangeDetectorRef) {}

  getPrimaryText() {
    if (this.uploadProgress) {
      return marker('input.file.uploadProgressLabel')
    }
    return marker('input.file.selectFileLabel')
  }

  getSecondaryText() {
    if (this.uploadProgress) {
      return marker('input.file.uploadProgressCancel')
    }
    return marker('input.file.dropFileLabel')
  }

  handleDragFilesOver(dragFilesOver: boolean) {
    this.dragFilesOver = dragFilesOver
    this.cd.markForCheck()
  }

  handleDropFiles(files: File[]) {
    if (files.length > 0) {
      this.fileChange.emit(files[0])
    }
  }

  handleFileInput(event: Event) {
    this.handleDropFiles(Array.from((event.target as HTMLInputElement).files))
  }

  handleUrlChange(url: string | null) {
    if (!url) return
    this.urlChange.emit(url)
  }

  handleSecondaryTextClick(event: Event) {
    if (this.uploadProgress) {
      this.handleCancel()
      event.preventDefault()
    }
  }

  handleCancel() {
    this.uploadCancel.emit()
  }
}
