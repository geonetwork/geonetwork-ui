import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class OverlayContainerTargetService {
  private selector = '#custom-overlay-container'

  getSelector(): string {
    return this.selector
  }

  setSelector(selector: string) {
    this.selector = selector
  }
}
