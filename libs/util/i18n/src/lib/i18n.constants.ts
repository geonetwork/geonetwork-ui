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
marker('language.rm')
marker('language.ar')
marker('language.da')
marker('language.no')
marker('language.pl')
marker('language.sv')
marker('language.tr')
marker('language.hy')
marker('language.az')
marker('language.ka')
marker('language.uk')
marker('language.cy')

export const DEFAULT_LANG = 'en'

// Caution: changing this can break language selection from third parties!
export const LANGUAGE_STORAGE_KEY = 'geonetwork-ui-language'

export const SUPPORTED_LANGUAGES = [
  'en',
  'nl',
  'fr',
  'de',
  'ko',
  'es',
  'cs',
  'ca',
  'fi',
  'is',
  'it',
  'pt',
  'ru',
  'zh',
  'sk',
  'rm',
  'ar',
  'da',
  'no',
  'pl',
  'sv',
  'tr',
  'hy',
  'az',
  'ka',
  'uk',
  'cy',
]

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
