import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { GnSearchInputModule } from './app/gn-search-input.module'

import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(GnSearchInputModule)
  .catch((err) => console.error(err))
