import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core'

/**
 * Dumb, presentational directive applied on a host element. When
 * `fieldFocusActive` becomes true it
 *   1. glows the host by toggling a CSS class (`fieldFocusGlowClass`, animation
 *      defined in the consuming component's stylesheet),
 *   2. scrolls the host into view (`fieldFocusScroll`), and
 *   3. places the text cursor in the host's main input (`fieldFocusCursor`).
 * It is fire-and-forget: the owner of `fieldFocusActive` resets that trigger
 * (see RecordFormComponent). Page-switching stays in the owner — a per-page
 * directive cannot bring its own off-page field on screen — but once the field
 * is on the current page (created right after the switch), the directive owns
 * revealing it.
 *
 * Scroll/cursor can be turned off so the same glow can be reused elsewhere —
 * e.g. the quality panel rows, which only want the background flash.
 */
@Directive({
  selector: '[gnUiFieldFocus]',
  standalone: true,
})
export class FieldFocusDirective implements OnChanges {
  @Input() fieldFocusActive = false
  @Input() fieldFocusScroll = true
  @Input() fieldFocusCursor = true
  @Input() fieldFocusGlowClass = 'gn-ui-field-focus-glow'

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
    const glowClass = this.fieldFocusGlowClass

    // Remove + reflow + re-add so the animation restarts even if it is still
    // running from a previous focus (re-clicking the same criterion).
    host.classList.remove(glowClass)
    void host.offsetWidth
    host.classList.add(glowClass)
    host.addEventListener(
      'animationend',
      () => host.classList.remove(glowClass),
      { once: true }
    )

    if (!this.fieldFocusScroll && !this.fieldFocusCursor) {
      return
    }

    // Defer so the field is laid out (incl. after a page switch) before
    // revealing it; scroll first, then place the cursor without re-scrolling.
    setTimeout(() => {
      if (this.fieldFocusScroll) {
        host.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (this.fieldFocusCursor) {
        // Prefer a real text input (skipping buttons, so e.g. the rich-text
        // editor wins over its preview toggle), then fall back to any focusable
        // control such as the trigger button of a dropdown (topics/themes).
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
