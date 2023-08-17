import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { APP_ID, NgModule } from '@angular/core'
import { TransferHttpCacheModule } from '@nguniversal/common'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, TransferHttpCacheModule],
  providers: [{ provide: APP_ID, useValue: 'serverApp' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
