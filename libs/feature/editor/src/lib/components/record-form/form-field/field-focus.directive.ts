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
 * `gnUiFieldFocusActive` becomes true it
 *   1. glows the host by toggling a CSS class (`gnUiFieldFocusGlowClass`, animation
 *      defined in the consuming component's stylesheet),
 *   2. scrolls the host into view (`gnUiFieldFocusScroll`), and
 *   3. places the text cursor in the host's main input (`gnUiFieldFocusCursor`).
 * It is fire-and-forget: the owner of `gnUiFieldFocusActive` resets that trigger
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
  @Input() gnUiFieldFocusActive = false
  @Input() gnUiFieldFocusScroll = true
  @Input() gnUiFieldFocusCursor = true
  @Input() gnUiFieldFocusGlowClass = 'gn-ui-field-focus-glow'

  private el = inject(ElementRef)

  // Trigger from ngOnChanges (not an input setter): Angular writes all inputs
  // for the change-detection pass before calling ngOnChanges.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['gnUiFieldFocusActive']?.currentValue) {
      this.focusField()
    }
  }

  private focusField() {
    // Defer the whole effect to a macrotask. Doing it during the
    // change-detection pass that mounts a freshly switched-to page would force
    // a synchronous reflow (`offsetWidth`, to restart the animation) mid-mount,
    // which makes the sibling fields play their entry transition and flash.
    // Running after the page has rendered avoids that, and also lets the field
    // be laid out before we scroll to / focus it.
    setTimeout(() => {
      const host = this.el.nativeElement as HTMLElement
      const glowClass = this.gnUiFieldFocusGlowClass

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

      if (this.gnUiFieldFocusScroll) {
        host.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (this.gnUiFieldFocusCursor) {
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
