import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DEFAULT_LANG } from './i18n.constants'
import { I18nInterceptor } from './i18n.interceptor'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [HttpClientModule, TranslateModule.forChild(), CommonModule],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
  ],
})
export class UtilI18nModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(DEFAULT_LANG)
    translate.use(translate.getBrowserLang() || DEFAULT_LANG)
  }
}
