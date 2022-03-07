import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: 'img[gnUiImage]',
})
export class ImageDirective {
  @Input() placeholder: string
  @HostListener('error')
  usePlaceholder() {
    this.el.nativeElement.src = this.placeholder
  }
  constructor(private el: ElementRef) {}
}
