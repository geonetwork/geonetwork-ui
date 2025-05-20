import { Injectable, Inject } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { DOCUMENT } from '@angular/common'
import { Platform } from '@angular/cdk/platform'
import { OverlayContainerTargetService } from './overlay-container-target.service'

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {
  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(Platform) private platform: Platform,
    private targetService: OverlayContainerTargetService
  ) {
    console.log(
      'CustomOverlayContainerCustomOverlayContainerCustomOverlayContainer ----'
    )
    super(document, platform)
  }

  protected _createContainer(): void {
    const container = this._document.createElement('div')
    container.classList.add('cdk-overlay-container')

    const parentElement = this._document.querySelector(
      this.targetService.getSelector()
    )

    console.log(
      '_createContainer _createContainer_createContainer',
      parentElement
    )

    if (parentElement) {
      parentElement.appendChild(container)
    } else {
      this._document.body.appendChild(container)
    }

    this._containerElement = container
  }
}
