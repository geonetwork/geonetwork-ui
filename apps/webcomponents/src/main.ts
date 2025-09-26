import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { WebcomponentsModule } from './app/webcomponents.module'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'

declare global {
  interface Window {
    GNUI_DATAHUB_CONFIG_URL?: string
  }
}

enableProdMode()

if (window.GNUI_DATAHUB_CONFIG_URL) {
  console.log(
    `[geonetwork-ui] GNUI_DATAHUB_CONFIG_URL is set to ${window.GNUI_DATAHUB_CONFIG_URL}`
  )
  loadAppConfig(window.GNUI_DATAHUB_CONFIG_URL).then(() => {
    platformBrowserDynamic()
      .bootstrapModule(WebcomponentsModule)
      .catch((err) => console.error(err))
  })
} else {
  console.log(`[geonetwork-ui] GNUI_DATAHUB_CONFIG_URL is not set`)
  platformBrowserDynamic()
    .bootstrapModule(WebcomponentsModule)
    .catch((err) => console.error(err))
}
