import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { GnResultsListModule } from './app/gn-results-list.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(GnResultsListModule)
  .catch((err) => console.error(err))
