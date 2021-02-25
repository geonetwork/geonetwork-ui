import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { GnApiModule } from '@lib/gn-api'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DEFAULT_LANG } from './i18n.constants'
import { I18nInterceptor } from './i18n.interceptor'

@NgModule({
  imports: [HttpClientModule, GnApiModule],
  exports: [TranslateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
  ],
})
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(DEFAULT_LANG)
    translate.use(DEFAULT_LANG)
  }
}
