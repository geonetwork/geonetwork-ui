import { inject, Injectable, InjectionToken } from '@angular/core'
import {
  provideTranslateService,
  TranslateCompiler,
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core'
import { Observable, of } from 'rxjs'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'

/**
 * This translate loader is used for testing purposes, it allows to provide translations directly in the test file without having to create JSON files
 * Taken from https://github.com/mwootendev/ngx-translate-plugins/issues/87
 */

const TestTranslations = new InjectionToken<Record<string, TranslationObject>>(
  'test-translations'
)

@Injectable()
class TestTranslateLoader implements TranslateLoader {
  translations = inject(TestTranslations)
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(this.translations[lang] as TranslationObject)
  }
}

export function provideTranslateTestingService(
  translations: Record<string, TranslationObject>
) {
  return provideTranslateService({
    loader: [
      {
        provide: TestTranslations,
        useValue: translations,
      },
      {
        provide: TranslateLoader,
        useClass: TestTranslateLoader,
      },
    ],
    fallbackLang: 'en',
    compiler: {
      provide: TranslateCompiler,
      useClass: TranslateMessageFormatCompiler,
    },
  })
}
