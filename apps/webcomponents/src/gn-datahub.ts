//import { StandaloneSearchModule } from './app/standalone-search.module'
//import { enableProdMode } from '@angular/core'
///import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableFallbackWithoutWorker } from '@camptocamp/ogc-client'
import { getGlobalConfig, loadAppConfig } from '@geonetwork-ui/util/app-config'

//enableProdMode()

loadAppConfig().then(() => {
  if (getGlobalConfig().PROXY_PATH) {
    // disable worker in ogc-client to allow using a proxy with a Referer check
    enableFallbackWithoutWorker()
  }

  /* platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err)) */
})
