import { HttpClient } from '@angular/common/http'
import { ToolsApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { Gn4TranslateLoader } from './gn4.translate.loader'
import { map } from 'rxjs/operators'

export const DEFAULT_LANG = 'en'

export const LANG_3_TO_2_MAPPER = {
  eng: 'en',
  dut: 'nl',
  fre: 'fr',
  ger: 'de',
  kor: 'ko',
  spa: 'es',
  cze: 'cs',
  cat: 'ca',
  fin: 'fi',
  ice: 'is',
  ita: 'it',
  por: 'pt',
  rus: 'ru',
  chi: 'zh',
  slo: 'sk',
}

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
)

// allows different behaviours depending on the intention
// default: fallback on default lang if translated labels are empty
export class CustomTranslateHttpLoader extends TranslateHttpLoader {
  getTranslation(lang: string) {
    return super.getTranslation(lang).pipe(map(this.transform))
  }

  private transform(translations) {
    // filter out empty keys: this should let us fallback on the default lang or
    // untranslated key, instead of having a blank space
    return Object.keys(translations).reduce(
      (prev, curr) =>
        translations[curr].trim().length
          ? { ...prev, [curr]: translations[curr] }
          : prev,
      {}
    )
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http, './assets/i18n/')
}

export function getLangFromHtml() {
  const html: HTMLElement = document.getElementsByTagName('html')[0]
  const lang = html.getAttribute('lang')
  return lang.substr(0, 2)
}
export function getLangFromBrowser() {
  return navigator.language
}
export function getDefaultLang() {
  return getLangFromHtml() || 'en'
}

export const TRANSLATE_DEFAULT_CONFIG = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    defaultLanguage: DEFAULT_LANG,
    deps: [HttpClient],
  },
}

export const TRANSLATE_GEONETWORK_CONFIG = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  loader: {
    provide: TranslateLoader,
    useClass: Gn4TranslateLoader,
    deps: [ToolsApiService],
  },
}
