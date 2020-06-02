import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { LibSearchModule } from '@lib/search'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { storeFreeze } from 'ngrx-store-freeze'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LibSearchModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
