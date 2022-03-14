import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: 'img[gnUiImageFallback]',
})
export class ImageFallbackDirective {
  @Input() fallbackUrl: string
  @HostListener('error')
  useFallback() {
    this.el.nativeElement.src = this.fallbackUrl
  }
  constructor(private el: ElementRef) {}
}
