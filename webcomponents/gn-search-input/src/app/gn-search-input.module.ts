import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import {
  apiConfiguration,
  GnSearchInputComponent,
} from './gn-search-input.component'
import { CommonModule } from '../../../common.module'
import { Configuration } from '@lib/gn-api'

@NgModule({
  declarations: [GnSearchInputComponent],
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
export class GnSearchInputModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customButton = createCustomElement(GnSearchInputComponent, {
      injector: this.injector,
    })
    customElements.define('gn-search-input', customButton)
  }
}
