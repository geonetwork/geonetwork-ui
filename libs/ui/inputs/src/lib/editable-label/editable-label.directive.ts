import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core'

@Directive({
  selector: '[gnUiEditableLabel]',
  standalone: true,
})
export class EditableLabelDirective implements OnChanges, AfterViewInit {
  @Input() gnUiEditableLabel?: string
  @Output() editableLabelChanged = new EventEmitter<string>()

  appendedInput: HTMLInputElement

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    if (this.appendedInput) {
      this.renderer.setProperty(
        this.appendedInput,
        'value',
        this.gnUiEditableLabel
      )
    }
  }

  ngAfterViewInit() {
    if (this.gnUiEditableLabel !== undefined) {
      this.appendedInput = this.renderer.createElement('input')

      this.renderer.setStyle(this.appendedInput, 'background', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'color', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'font', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'border', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'width', '100%')
      this.renderer.setStyle(this.appendedInput, 'padding', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'margin', '0')
      this.renderer.setStyle(this.appendedInput, 'height', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'line-height', 'inherit')
      this.renderer.setStyle(this.appendedInput, 'text-decoration', 'inherit')

      this.renderer.setProperty(
        this.appendedInput,
        'value',
        this.gnUiEditableLabel
      )

      this.renderer.listen(this.appendedInput, 'input', (event) => {
        this.editableLabelChanged.emit(event.target.value)
      })

      this.renderer.appendChild(this.el.nativeElement, this.appendedInput)
    }
  }
}
