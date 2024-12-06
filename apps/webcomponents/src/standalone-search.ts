import { StandaloneSearchModule } from './app/standalone-search.module'
import { platformServer } from '@angular/platform-server'

platformServer()
  .bootstrapModule(StandaloneSearchModule)
  .catch((err) => console.error(err))
