import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'
import { AppModule } from './app/app.module'

loadAppConfig().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
})
