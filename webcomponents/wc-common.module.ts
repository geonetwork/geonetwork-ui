import { NgModule } from '@angular/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { TranslateModule } from '@ngx-translate/core'
import { apiConfiguration, BaseComponent } from './base.component'

/**
 * this module should be imported by all WebComponent modules
 */
@NgModule({
  declarations: [BaseComponent],
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)],
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
