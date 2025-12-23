import { NgModule } from '@angular/core'
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server'

import { AppModule } from './app.module.js'
import { AppComponent } from './app.component.js'

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
