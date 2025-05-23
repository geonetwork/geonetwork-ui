import { HttpClient } from '@angular/common/http'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { FileTranslateLoader } from './file.translate.loader'
import {
  TranslateCompiler,
  TranslateDefaultParser,
  TranslateLoader,
  TranslateModuleConfig,
  TranslateParser,
} from '@ngx-translate/core'
import { Injectable } from '@angular/core'

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
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
}

@Injectable()
class DebugTranslateParser extends TranslateDefaultParser {
  interpolate(expr: string | (() => string), params?: any): string | undefined {
    if (!params) return expr?.toString()
    const paramsStr = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join(', ')
    return `${expr} {{${paramsStr}}}`
  }
}

/**
 * This config will print translation keys in the UI directly; used to identify which keys are used
 */
export const TRANSLATE_DEBUG_CONFIG: TranslateModuleConfig = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  parser: {
    provide: TranslateParser,
    useClass: DebugTranslateParser,
  },
}
