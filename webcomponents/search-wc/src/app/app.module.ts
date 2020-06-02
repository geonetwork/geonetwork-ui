import { BrowserModule } from '@angular/platform-browser'
import { Injector, NgModule } from '@angular/core'

import { createCustomElement } from '@angular/elements'
import { SearchComponent } from '@lib/search'

@NgModule({
  declarations: [SearchComponent],
  entryComponents: [SearchComponent],
  imports: [BrowserModule],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(SearchComponent, { injector })
    customElements.define('custom-button', customButton)
  }

  ngDoBootstrap() {}
}
