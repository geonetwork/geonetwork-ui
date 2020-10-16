import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { WcCommonModule } from '../../../wc-common.module'
import {
  GnResultsListComponent,
} from './gn-results-list.component'

@NgModule({
  declarations: [GnResultsListComponent],
  imports: [
    WcCommonModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
  ],
})
export class GnResultsListModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customButton = createCustomElement(GnResultsListComponent, {
      injector: this.injector,
    })
    customElements.define('gn-results-list', customButton)
  }
}
