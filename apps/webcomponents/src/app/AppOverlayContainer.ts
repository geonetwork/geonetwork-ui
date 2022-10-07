import { OverlayContainer } from '@angular/cdk/overlay'
import { Platform } from '@angular/cdk/platform'
import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, OnDestroy } from '@angular/core'

@Injectable()
export class AppOverlayContainer extends OverlayContainer implements OnDestroy {
  private selector: string

  constructor(
    @Inject(DOCUMENT) private document: Document,
    platform: Platform
  ) {
    super(document, platform)
  }

  setSelector(selector: string) {
    this.selector = selector
  }
  ngOnDestroy() {
    super.ngOnDestroy()
  }

  protected _createContainer(): void {
    const container: HTMLDivElement = this.document.createElement('div')
    container.classList.add('app-overlay-container')
    const element: Element | null = this.document
      .querySelector(this.selector)
      .shadowRoot.querySelector('#angular-app-root')
    if (element !== null) {
      element.appendChild(container)
      this._containerElement = container
    }
  }
}
