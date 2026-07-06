import { Directive, ElementRef, inject, Input } from '@angular/core'

@Directive({
  selector: '[gnUiFieldFocus]',
  standalone: true,
  exportAs: 'fieldFocus',
})
export class FieldFocusDirective {
  @Input() gnUiFieldFocusGlowClass = 'gn-ui-field-focus-glow'

  private el = inject(ElementRef)

  public focusField(focusInnerTarget = true) {
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

      host.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (!focusInnerTarget) {
        return
      }
      const target =
        host.querySelector<HTMLElement>(
          'input, textarea, select, [contenteditable="true"]'
        ) ??
        host.querySelector<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      target?.focus({ preventScroll: true })
    })
  }
}
