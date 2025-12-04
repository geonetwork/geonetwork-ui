import { DOCUMENT, inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private dom = inject(DOCUMENT)

  updateCanonicalUrl() {
    const head = this.dom.getElementsByTagName('head')[0]
    let element: HTMLLinkElement =
      this.dom.querySelector(`link[rel='canonical']`) || null
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement
      head.appendChild(element)
    }
    element.setAttribute('rel', 'canonical')
    element.setAttribute(
      'href',
      this.dom.location.origin + this.dom.location.pathname //should include query params or not?
    )
  }
}
