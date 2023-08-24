import { HttpClient } from '@angular/common/http'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { FileTranslateLoader } from './file.translate.loader'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('language.en')
marker('language.nl')
marker('language.fr')
marker('language.de')
marker('language.ko')
marker('language.es')
marker('language.cs')
marker('language.ca')
marker('language.fi')
marker('language.is')
marker('language.it')
marker('language.pt')
marker('language.ru')
marker('language.zh')
marker('language.sk')

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

// Caution: changing this can break language selection from third parties!
export const LANGUAGE_STORAGE_KEY = 'geonetwork-ui-language'

export const LANG_2_TO_3_MAPPER = Object.entries(LANG_3_TO_2_MAPPER).reduce(
  (mapperObject, langEntry) => {
    return { ...mapperObject, [langEntry[1]]: langEntry[0] }
  },
  {}
)

export function HttpLoaderFactory(http: HttpClient) {
  return new FileTranslateLoader(http, './assets/i18n/')
}
//Deprecated, but currently still used in datafeeder
export function getLangFromBrowser() {
  return navigator.language.substr(0, 2)
}
const COMPILER_CONFIG = {
  provide: TranslateCompiler,
  useClass: TranslateMessageFormatCompiler,
}
export const TRANSLATE_DEFAULT_CONFIG = {
  compiler: COMPILER_CONFIG,
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    defaultLanguage: DEFAULT_LANG,
    deps: [HttpClient],
  },
}
