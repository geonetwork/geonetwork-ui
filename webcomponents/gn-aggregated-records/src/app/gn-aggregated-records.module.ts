import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CommonModule } from '../../../common.module'
import { GnAggregatedRecordsComponent } from './gn-aggregated-records.component'

@NgModule({
  declarations: [GnAggregatedRecordsComponent],
  imports: [
    CommonModule,
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
    customElements.define('gn-aggregated-records', customButton)
  }
}
