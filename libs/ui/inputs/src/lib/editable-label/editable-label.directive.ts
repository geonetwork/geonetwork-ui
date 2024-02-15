import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core'

@Directive({
  selector: '[gnUiEditableLabel]',
  standalone: true,
})
export class EditableLabelDirective implements AfterViewInit {
  @Output() editableLabelChanged = new EventEmitter<string>()
  @Input() gnUiEditableLabel?: boolean

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.gnUiEditableLabel !== false) {
      const appendedInput = this.renderer.createElement('input')

      this.renderer.setStyle(appendedInput, 'background', 'inherit')
      this.renderer.setStyle(appendedInput, 'color', 'inherit')
      this.renderer.setStyle(appendedInput, 'font', 'inherit')
      this.renderer.setStyle(appendedInput, 'border', 'inherit')
      this.renderer.setStyle(appendedInput, 'width', '100%')
      this.renderer.setStyle(appendedInput, 'padding', 'inherit')
      this.renderer.setStyle(appendedInput, 'margin', '0')
      this.renderer.setStyle(appendedInput, 'height', 'inherit')
      this.renderer.setStyle(appendedInput, 'line-height', 'inherit')
      this.renderer.setStyle(appendedInput, 'text-decoration', 'inherit')

      const hostContent = this.el.nativeElement.textContent || ''
      const formattedContent = hostContent.replace(/\s+/g, ' ').trim()
      this.renderer.setProperty(appendedInput, 'value', formattedContent)
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '')

      this.renderer.listen(appendedInput, 'input', (event) => {
        this.editableLabelChanged.emit(event.target.value)
      })

      this.renderer.appendChild(this.el.nativeElement, appendedInput)
    }
  }
}
