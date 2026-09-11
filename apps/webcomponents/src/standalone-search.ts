import { StandaloneSearchModule } from './app/standalone-search.module'
import { enableProdMode, provideZoneChangeDetection } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(StandaloneSearchModule, {
    applicationProviders: [provideZoneChangeDetection()],
  })
  .catch((err) => console.error(err))
