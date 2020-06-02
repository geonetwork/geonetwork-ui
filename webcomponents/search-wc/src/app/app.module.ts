import { BrowserModule } from '@angular/platform-browser'
import { Injector, NgModule } from '@angular/core'
import { MdListComponent } from '../../../../libs/ui/components/src/lib/md-list/md-list.component'

import { createCustomElement } from '@angular/elements'

@NgModule({
  declarations: [MdListComponent],
  entryComponents: [MdListComponent],
  imports: [BrowserModule],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(MdListComponent, { injector })
    customElements.define('custom-button', customButton)
  }

  ngDoBootstrap() {}
}
