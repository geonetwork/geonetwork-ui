import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core'

/**
 * Dumb, presentational directive applied on a `<gn-ui-form-field>` cell. When
 * `fieldFocusActive` becomes true it
 *   1. glows the host by toggling the `gn-ui-field-focus-glow` class (the
 *      animation itself lives in record-form.component.css),
 *   2. scrolls the host into view, and
 *   3. places the text cursor in the field's main input (best effort).
 * It is fire-and-forget: the owner of `fieldFocusActive` resets that trigger
 * (see RecordFormComponent). Page-switching stays in the owner — a per-page
 * directive cannot bring its own off-page field on screen — but once the field
 * is on the current page (created right after the switch), the directive owns
 * revealing it.
 */
@Directive({
  selector: '[gnUiFieldFocus]',
  standalone: true,
})
export class FieldFocusDirective implements OnChanges {
  @Input() fieldFocusActive = false

  private el = inject(ElementRef)

  // Trigger from ngOnChanges (not an input setter): Angular writes all inputs
  // for the change-detection pass before calling ngOnChanges.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['fieldFocusActive']?.currentValue) {
      this.focusField()
    }
  }

  private focusField() {
    const host = this.el.nativeElement as HTMLElement

    // Remove + reflow + re-add so the animation restarts even if it is still
    // running from a previous focus (re-clicking the same criterion).
    host.classList.remove('gn-ui-field-focus-glow')
    void host.offsetWidth
    host.classList.add('gn-ui-field-focus-glow')
    host.addEventListener(
      'animationend',
      () => host.classList.remove('gn-ui-field-focus-glow'),
      { once: true }
    )

    // Prefer a real text input (skipping buttons, so e.g. the rich-text editor
    // wins over its preview toggle), then fall back to any focusable control
    // such as the trigger button of a dropdown (topics/themes).
    const target =
      host.querySelector<HTMLElement>(
        'input, textarea, select, [contenteditable="true"]'
      ) ??
      host.querySelector<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

    // Defer so the field is laid out (incl. after a page switch) before
    // revealing it; scroll first, then place the cursor without re-scrolling.
    setTimeout(() => {
      host.scrollIntoView({ behavior: 'smooth', block: 'start' })
      target?.focus({ preventScroll: true })
    })
  }
}
