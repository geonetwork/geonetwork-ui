import { NgModule } from '@angular/core'
import { I18nModule } from '@lib/common'

/**
 * this module should be imported by all WebComponent modules
 */
@NgModule({
  declarations: [],
  imports: [I18nModule],
})
export class CommonModule {
  constructor() {}

  ngDoBootstrap() {}
}
