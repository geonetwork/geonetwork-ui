import {
  Directive,
  ElementRef,
  Injector,
  Input,
  afterNextRender,
  booleanAttribute,
  inject,
} from '@angular/core'

@Directive({
  selector: '[gnUiAutofocus]',
  standalone: true,
})
export class AutofocusDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef)
  private injector = inject(Injector)

  @Input({ alias: 'gnUiAutofocus', transform: booleanAttribute })
  set autofocus(active: boolean) {
    if (!active) return
    afterNextRender(() => this.el.nativeElement.focus(), {
      injector: this.injector,
    })
  }
}
