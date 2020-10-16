import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
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
