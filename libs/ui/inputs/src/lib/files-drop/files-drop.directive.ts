import { Directive, HostListener, Output, EventEmitter } from '@angular/core'

@Directive({
  selector: '[gnUiFilesDrop]',
  standalone: true,
})
export class FilesDropDirective {
  @Output() dragFilesOver: EventEmitter<boolean> = new EventEmitter()
  @Output() dropFiles: EventEmitter<File[]> = new EventEmitter()

  dragEnterCounter = 0

  @HostListener('dragenter', ['$event'])
  _onDragEnter(event: DragEvent) {
    event.preventDefault()
    this.dragEnterCounter++
    this.dragFilesOver.emit(true)
  }

  @HostListener('dragover', ['$event'])
  _onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  @HostListener('dragleave', ['$event'])
  _onDragLeave(event: DragEvent) {
    event.preventDefault()
    this.dragEnterCounter = Math.max(0, this.dragEnterCounter - 1)
    if (this.dragEnterCounter === 0) {
      this.dragFilesOver.emit(false)
    }
  }

  @HostListener('drop', ['$event'])
  _onDrop(event: DragEvent) {
    event.preventDefault()
    this.dragEnterCounter = 0
    this.dragFilesOver.emit(false)

    const files = Array.from(event.dataTransfer.files)
    if (files.length > 0) {
      this.dropFiles.emit(files)
    }
  }
}
