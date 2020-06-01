import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ComponentsModule } from '@ui/components'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
