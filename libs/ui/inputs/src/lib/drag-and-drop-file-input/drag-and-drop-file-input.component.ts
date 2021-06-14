import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

export const placeholder = 'dropFile'
marker('dropFile')

@Component({
  selector: 'ui-drag-and-drop-file-input',
  templateUrl: './drag-and-drop-file-input.component.html',
  styleUrls: ['./drag-and-drop-file-input.component.css'],
})
export class DragAndDropFileInputComponent implements OnInit {
  @Input() placeholder = placeholder
  @Input() accept = '*'
  @Output() fileChange = new EventEmitter<any>()
  selectedFile: File = null

  get fileName(): string | null {
    return this.selectedFile && this.selectedFile.name
  }

  constructor() {}

  ngOnInit(): void {}

  selectFile(event) {
    this.selectedFile = event.addedFiles[0]

    this.fileChange.emit(this.selectedFile)
  }
}
