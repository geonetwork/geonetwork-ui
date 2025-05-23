import { HttpClient } from '@angular/common/http'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { FileTranslateLoader } from './file.translate.loader'
import { TranslateModuleConfig } from '@ngx-translate/core/dist/public-api'

export const DEFAULT_LANG = 'en'

// Caution: changing this can break language selection from third parties!
export const LANGUAGE_STORAGE_KEY = 'geonetwork-ui-language'

export function HttpLoaderFactory(http: HttpClient) {
  return new FileTranslateLoader(http, './assets/i18n/')
}

export const TRANSLATE_DEFAULT_CONFIG: TranslateModuleConfig = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  defaultLanguage: DEFAULT_LANG,
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
}
