import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { WebcomponentsModule } from './app/webcomponents.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(WebcomponentsModule)
  .catch((err) => console.error(err))
