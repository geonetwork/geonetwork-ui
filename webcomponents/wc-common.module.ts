import { NgModule } from '@angular/core'
import { I18nModule } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { apiConfiguration, BaseComponent } from './base.component'

/**
 * this module should be imported by all WebComponent modules
 */
@NgModule({
  declarations: [BaseComponent],
  imports: [I18nModule],
  providers: [
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
  ],
})
export class WcCommonModule {
  constructor() {}

  ngDoBootstrap() {}
}
