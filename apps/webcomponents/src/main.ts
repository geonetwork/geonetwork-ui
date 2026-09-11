import { enableProdMode, provideZoneChangeDetection } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { WebcomponentsModule } from './app/webcomponents.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(WebcomponentsModule, {
    applicationProviders: [provideZoneChangeDetection()],
  })
  .catch((err) => console.error(err))
