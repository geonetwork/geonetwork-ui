import { Injector, NgModule } from '@angular/core'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { createCustomElement } from '@angular/elements'
import { GnSearchInputComponent } from './gn-search-input/src/app/gn-search-input.component'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

/**
 * this module should be imported by all WebComponent modules
 */
@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
})
export class CommonModule {
  constructor() {}

  ngDoBootstrap() {}
}
