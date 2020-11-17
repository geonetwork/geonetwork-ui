import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { UploadDataComponent } from './presentation/components/upload-data/upload-data.component'
import { HttpLoaderFactory, I18nModule } from '@lib/common'
import { UiModule } from '@lib/ui'
import { UploadDataPageComponent } from './presentation/pages/upload-data-page/upload-data.page'
import { UploadDataRulesComponent } from './presentation/components/upload-data-rules/upload-data-rules.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    AppComponent,
    UploadDataPageComponent,
    UploadDataComponent,
    UploadDataRulesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18nModule,
    UiModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
