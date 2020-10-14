import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { WcCommonModule } from '../../../wc-common.module'
import { GnAggregatedRecordsComponent } from './gn-aggregated-records.component'
import { UiModule } from '@lib/ui'
import { CommonModule } from '@angular/common'
import { I18nModule } from '@lib/common'

@NgModule({
  declarations: [GnAggregatedRecordsComponent],
  imports: [
    WcCommonModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    UiModule,
    CommonModule,
    I18nModule,
  ],
})
export class GnAggregatedRecordsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customButton = createCustomElement(GnAggregatedRecordsComponent, {
      injector: this.injector,
    })
    customElements.define('gn-aggregated-records', customButton)
  }
}
