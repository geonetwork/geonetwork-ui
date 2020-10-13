import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BASE_PATH } from '@lib/gn-api'
import { LibSearchModule } from '@lib/search'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { storeFreeze } from 'ngrx-store-freeze'
import { EffectsModule } from '@ngrx/effects'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : []

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    LibSearchModule,
    StoreModule.forRoot({}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: '/geonetwork/srv/api',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
