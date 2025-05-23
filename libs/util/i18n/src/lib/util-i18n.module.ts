import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DEFAULT_LANG, LANGUAGE_STORAGE_KEY } from './i18n.constants'
import { I18nInterceptor } from './i18n.interceptor'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [TranslateModule.forChild(), CommonModule],
  exports: [],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
  ],
})
export class UtilI18nModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(DEFAULT_LANG)
    let storageLang = null
    try {
      storageLang = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    } catch (error) {
      console.warn(error)
    }
    translate.use(storageLang || translate.getBrowserLang() || DEFAULT_LANG)
  }
}
