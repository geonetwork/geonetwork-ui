import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { GnAggregatedRecordsModule } from './app/gn-aggregated-records.module'

enableProdMode()

platformBrowserDynamic()
  .bootstrapModule(GnAggregatedRecordsModule)
  .catch((err) => console.error(err))
