import { Component, EventEmitter, Input, Output } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { CommonModule } from '@angular/common'

export const placeholder = 'dropFile'
marker('dropFile')

@Component({
  selector: 'gn-ui-drag-and-drop-file-input',
  templateUrl: './drag-and-drop-file-input.component.html',
  styleUrls: ['./drag-and-drop-file-input.component.css'],
  standalone: true,
  imports: [NgxDropzoneModule, CommonModule],
})
export class DragAndDropFileInputComponent {
  @Input() placeholder = placeholder
  @Input() accept = '*'
  @Output() fileChange = new EventEmitter<any>()
  selectedFile: File = null

  get fileName(): string | null {
    return this.selectedFile && this.selectedFile.name
  }

  selectFile(event) {
    this.selectedFile = event.addedFiles[0]

    this.fileChange.emit(this.selectedFile)
  }
}
