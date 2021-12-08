import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { loadAppConfig, getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { enableFallbackWithoutWorker } from '@camptocamp/ogc-client'

if (environment.production) {
  enableProdMode()
}

loadAppConfig().then(() => {
  if (getGlobalConfig().PROXY_PATH) {
    // disable worker in ogc-client to allow using a proxy with a Referer check
    enableFallbackWithoutWorker()
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
})
