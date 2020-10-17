import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { GnSearchInputModule } from './app/gn-search-input.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(GnSearchInputModule)
  .catch((err) => console.error(err))
