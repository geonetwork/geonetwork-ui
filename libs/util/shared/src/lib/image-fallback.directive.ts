import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core'

@Directive({
  selector: 'img[gnUiImageFallback]',
  standalone: true,
})
export class ImageFallbackDirective {
  private el = inject(ElementRef)

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
}
