import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { NgxDropzoneComponent, NgxDropzoneModule } from 'ngx-dropzone'
import { NgIcon } from '@ng-icons/core'
import { megabytesToBytes } from '@geonetwork-ui/util/shared'

export const placeholder = 'dropFile'
marker('dropFile')

export type DragAndDropFileInputError = 'invalid-extension' | 'file-too-large'

@Component({
  selector: 'gn-ui-drag-and-drop-file-input',
  templateUrl: './drag-and-drop-file-input.component.html',
  styleUrls: ['./drag-and-drop-file-input.component.css'],
  standalone: true,
  imports: [NgxDropzoneModule, NgIcon],
})
export class DragAndDropFileInputComponent {
  @Input() placeholder = placeholder
  @Input() accept = '*'
  @Input() maxFileSizeMb: number | null = null
  @Input() icon: string | null = null
  @Input() dropzoneBackgroundColor: string | null = null
  @Input() textClass = ''
  @Input() extraClass = ''

  @Output() fileChange = new EventEmitter<File>()
  @Output() errorChange = new EventEmitter<DragAndDropFileInputError>()

  selectedFile: File = null

  @ViewChild(NgxDropzoneComponent) private dropzone: NgxDropzoneComponent

  get fileName(): string | null {
    return this.selectedFile && this.selectedFile.name
  }

  get maxFileSizeBytes(): number | null {
    return typeof this.maxFileSizeMb === 'number'
      ? megabytesToBytes(this.maxFileSizeMb)
      : null
  }

  selectFile(event) {
    if (event.rejectedFiles?.length) {
      const reason = event.rejectedFiles[0].reason
      this.errorChange.emit(
        reason === 'size' ? 'file-too-large' : 'invalid-extension'
      )
      return
    }
    this.selectedFile = event.addedFiles[0]
    this.fileChange.emit(this.selectedFile)
  }

  openFileSelector() {
    this.dropzone.showFileSelector()
  }

  clear() {
    this.selectedFile = null
  }
}
