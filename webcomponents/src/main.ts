import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { GnWcModule } from './app/gn-wc.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(GnWcModule)
  .catch((err) => console.error(err))
