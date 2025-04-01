import { StandaloneSearchModule } from './app/standalone-search.module'
import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(StandaloneSearchModule)
  .catch((err) => console.error(err))
