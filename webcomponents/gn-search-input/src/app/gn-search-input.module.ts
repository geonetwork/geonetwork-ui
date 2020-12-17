import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { I18nModule, TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TranslateModule } from '@ngx-translate/core'
import { GnSearchInputComponent } from './gn-search-input.component'
import { WcCommonModule } from '../../../wc-common.module'

const WC_TAG_NAME = 'gn-search-input'

@NgModule({
  declarations: [GnSearchInputComponent],
  imports: [
    WcCommonModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    I18nModule,
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
  ],
})
export class GnSearchInputModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customButton = createCustomElement(GnSearchInputComponent, {
      injector: this.injector,
    })
    if (!customElements.get(WC_TAG_NAME)) {
      customElements.define(WC_TAG_NAME, customButton)
    }
  }
}
