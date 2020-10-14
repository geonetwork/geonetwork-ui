import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import {
  apiConfiguration,
  GnResultsListComponent,
} from './gn-results-list.component'
import { CommonModule } from '../../../common.module'
import { Configuration } from '@lib/gn-api'

@NgModule({
  declarations: [GnResultsListComponent],
  imports: [
    CommonModule,
    LibSearchModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
  ],
  providers: [
    {
      provide: Configuration,
      useValue: apiConfiguration,
    },
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
