import { BrowserModule } from '@angular/platform-browser'
import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { SearchSnapshotWcComponent } from './search-snapshot-wc/search-snapshot-wc.component'
import { LibSearchModule } from '@lib/search'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { BASE_PATH } from '@lib/gn-api'

@NgModule({
  declarations: [SearchSnapshotWcComponent],
  imports: [LibSearchModule, StoreModule.forRoot({}), EffectsModule.forRoot()],
  providers: [
    {
      provide: BASE_PATH,
      useValue: 'https://apps.titellus.net/geonetwork/srv/api',
    },
  ],
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
