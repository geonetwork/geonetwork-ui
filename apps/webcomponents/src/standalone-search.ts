import { StandaloneSearchModule } from './app/standalone-search.module'
import { platformServer } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'

enableProdMode()

platformServer()
  .bootstrapModule(StandaloneSearchModule)
  .catch((err) => console.error(err))
