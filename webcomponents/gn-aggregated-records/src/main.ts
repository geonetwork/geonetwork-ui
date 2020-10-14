import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from './environments/environment'
import { GnAggregatedRecordsModule } from './app/gn-aggregated-records.module'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(GnAggregatedRecordsModule)
  .catch((err) => console.error(err))
