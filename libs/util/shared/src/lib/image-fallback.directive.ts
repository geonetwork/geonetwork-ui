import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: 'img[gnUiImageFallback]',
  standalone: true,
})
export class ImageFallbackDirective {
  @Input() fallbackUrl: string
  @HostListener('error')
  useFallback() {
    const fallbackUrl = new URL(
      this.fallbackUrl,
      window.location.toString()
    ).toString()
    if (this.el.nativeElement.src !== fallbackUrl) {
      this.el.nativeElement.src = fallbackUrl
    }
  }
  constructor(private el: ElementRef) {}
}
