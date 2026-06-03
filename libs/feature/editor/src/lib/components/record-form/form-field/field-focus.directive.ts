import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core'

@Directive({
  selector: '[gnUiFieldFocus]',
  standalone: true,
})
export class FieldFocusDirective implements OnChanges {
  @Input() gnUiFieldFocusActive = false
  @Input() gnUiFieldFocusScroll = true
  @Input() gnUiFieldFocusCursor = true
  @Input() gnUiFieldFocusGlowClass = 'gn-ui-field-focus-glow'

  private el = inject(ElementRef)

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gnUiFieldFocusActive']?.currentValue) {
      this.focusField()
    }
  }

  private focusField() {
    setTimeout(() => {
      const host = this.el.nativeElement as HTMLElement
      const glowClass = this.gnUiFieldFocusGlowClass

      host.classList.remove(glowClass)
      void host.offsetWidth
      host.classList.add(glowClass)
      host.addEventListener(
        'animationend',
        () => host.classList.remove(glowClass),
        { once: true }
      )

      if (this.gnUiFieldFocusScroll) {
        host.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (this.gnUiFieldFocusCursor) {
        const target =
          host.querySelector<HTMLElement>(
            'input, textarea, select, [contenteditable="true"]'
          ) ??
          host.querySelector<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        target?.focus({ preventScroll: true })
      }
    })
  }
}
