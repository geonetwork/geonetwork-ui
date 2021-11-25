import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'

if (environment.production) {
  enableProdMode()
}

loadAppConfig().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
})
