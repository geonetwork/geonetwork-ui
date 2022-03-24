import { Injectable } from '@angular/core'
import { LANG_2_TO_3_MAPPER } from './i18n.constants'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor(private translate: TranslateService) {}

  get iso2() {
    return this.translate.currentLang
  }
  get iso3(): string {
    return LANG_2_TO_3_MAPPER[this.iso2]
  }
  get index(): string {
    return `lang${this.iso3}`
  }
}
