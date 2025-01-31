import { environment } from './environments/environment'
import { enableProdMode } from '@angular/core'
import { getGlobalConfig, loadAppConfig } from '@geonetwork-ui/util/app-config'
import { enableFallbackWithoutWorker } from '@camptocamp/ogc-client'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'

export { AppServerModule as default } from './app/app.server.module'
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
