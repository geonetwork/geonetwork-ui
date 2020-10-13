import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { BASE_PATH } from '@lib/gn-api'
import { GnSearchInputComponent } from './gn-search-input.component'

@NgModule({
  declarations: [GnSearchInputComponent],
  imports: [LibSearchModule, StoreModule.forRoot({}), EffectsModule.forRoot()],
  providers: [
    {
      provide: BASE_PATH,
      useValue: 'https://apps.titellus.net/geonetwork/srv/api',
    },
  ],
})
export class GnSearchInputModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(GnSearchInputComponent, {
      injector,
    })
    customElements.define('gn-search-input', customButton)
  }

  ngDoBootstrap() {}
}
