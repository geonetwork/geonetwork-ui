import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import SETTINGS from './settings'

if (environment.production) {
  enableProdMode()
}

SETTINGS.init().then(
  () => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err))
  },
  (error) => {
    console.error(`Application boostrap fails :\n${error.message}`, error.stack)
  }
)
