import { BrowserModule } from '@angular/platform-browser'
import { Injector, NgModule } from '@angular/core'

import { createCustomElement } from '@angular/elements'
import { UiModule } from '@lib/ui'
import { SearchSnapshotWcComponent } from './search-snapshot-wc/search-snapshot-wc.component'

@NgModule({
  declarations: [SearchSnapshotWcComponent],
  entryComponents: [],
  imports: [BrowserModule, UiModule],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(SearchSnapshotWcComponent, {
      injector,
    })
    customElements.define('gn-search-snapshot', customButton)
  }

  ngDoBootstrap() {}
}
