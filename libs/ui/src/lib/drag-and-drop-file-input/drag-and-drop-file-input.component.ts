import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'ui-drag-and-drop-file-input',
  templateUrl: './drag-and-drop-file-input.component.html',
  styleUrls: ['./drag-and-drop-file-input.component.css'],
})
export class DragAndDropFileInputComponent implements OnInit {
  @Input() placeholder = 'Nom de mon fichier'
  @Input() cssClassesForLabel = 'text-black'
  @Input() cssClassesForInput = ''
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
