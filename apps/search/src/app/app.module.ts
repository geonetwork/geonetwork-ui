import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { LibSearchModule } from '@lib/search'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { storeFreeze } from 'ngrx-store-freeze'
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LibSearchModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
