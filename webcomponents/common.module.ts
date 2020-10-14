import { NgModule } from '@angular/core'
import { I18nModule } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { apiConfiguration } from './base.component'

/**
 * this module should be imported by all WebComponent modules
 */
@NgModule({
  declarations: [],
  imports: [I18nModule],
  providers: [
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
  ],
})
export class CommonModule {
  constructor() {}

  ngDoBootstrap() {}
}
