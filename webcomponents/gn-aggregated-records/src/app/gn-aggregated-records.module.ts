import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { WcCommonModule } from '../../../wc-common.module'
import { GnAggregatedRecordsComponent } from './gn-aggregated-records.component'
import { UiModule } from '@lib/ui'
import { CommonModule } from '@angular/common'

const WC_TAG_NAME = 'gn-aggregated-records'

@NgModule({
  declarations: [GnAggregatedRecordsComponent],
  imports: [
    CommonModule,
    WcCommonModule,
    UiModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
  ],
})
export class GnAggregatedRecordsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customButton = createCustomElement(GnAggregatedRecordsComponent, {
      injector: this.injector,
    })
    if (!customElements.get(WC_TAG_NAME)) {
      customElements.define(WC_TAG_NAME, customButton)
    }
  }
}
