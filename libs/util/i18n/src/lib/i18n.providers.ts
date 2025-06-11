import {
  APP_INITIALIZER,
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core'
import {
  provideTranslateService,
  TranslateModuleConfig,
  TranslateService,
} from '@ngx-translate/core'
import {
  DEFAULT_LANG,
  LANGUAGE_STORAGE_KEY,
  TRANSLATE_DEBUG_CONFIG,
  TRANSLATE_DEFAULT_CONFIG,
} from './i18n.constants'
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { I18nInterceptor } from './i18n.interceptor'

function i18nInitializerFromLocalStorageFactory(translate: TranslateService) {
  return () => {
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

export function provideI18n(
  config?: TranslateModuleConfig,
  useLocalStorage = true
): EnvironmentProviders {
  // fallback to default config
  let usedConfig = config ?? TRANSLATE_DEFAULT_CONFIG
  // if the URL contains ?debugTranslations=true, show translations keys in the UI
  if (
    new URL(window.location.toString()).searchParams.get(
      'debugTranslations'
    ) === 'true'
  ) {
    usedConfig = TRANSLATE_DEBUG_CONFIG
  }

  const providers: (EnvironmentProviders | Provider)[] = [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
    provideTranslateService(usedConfig),
  ]
  if (useLocalStorage) {
    providers.push({
      provide: APP_INITIALIZER,
      useFactory: i18nInitializerFromLocalStorageFactory,
      deps: [TranslateService],
      multi: true,
    })
  }

  return makeEnvironmentProviders(providers)
}
