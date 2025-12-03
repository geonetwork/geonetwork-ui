import { OverlayContainer } from '@angular/cdk/overlay'
import { Platform } from '@angular/cdk/platform'
import { DOCUMENT } from '@angular/common'

import { Injectable, inject } from '@angular/core'

@Injectable()
export class WebcomponentOverlayContainer extends OverlayContainer {
  private document: Document

  private componentRoot: HTMLElement

  constructor() {
    const document = inject<Document>(DOCUMENT)
    const platform = inject(Platform)

    super(document, platform)

    this.document = document
  }

  setRoot(componentRoot: HTMLElement) {
    this.componentRoot = componentRoot
  }

  protected _createContainer(): void {
    const container: HTMLDivElement = this.document.createElement('div')
    container.classList.add('gn-ui-overlay-container')
    if (!this.componentRoot) {
      throw new Error(
        'Angular CDK OverlayContainer was used without proper initialization.'
      )
    }
    this.componentRoot.appendChild(container)
    this._containerElement = container
  }
}
