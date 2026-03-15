import { Injectable } from '@angular/core'
import { TitleStrategy } from '@angular/router'

@Injectable()
export class NoopTitleStrategy extends TitleStrategy {
  updateTitle() {
    // do not update the page title at all
  }
}
