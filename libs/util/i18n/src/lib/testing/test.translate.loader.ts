import { TranslateLoader } from '@ngx-translate/core'
import { Observable, of as observableOf } from 'rxjs'
import { Translations, LanguageTranslations } from './translations.model'

// IMPORTANT:
// This was copy-pasted from https://github.com/mwootendev/ngx-translate-plugins/blob/7c6c73c7d16c9519a7bafff939d29fd8ea5e574a/projects/testing/src/lib/test-translate-loader.service.ts
// because the original package was expecting rxjs 7+ as a peer dep and that was conflicting with many other dependencies
// FIXME: when rxjs 7 can be used in the project, remove this and do `npm install ngx-translate-testing --save-dev`

export class TestTranslateLoader extends TranslateLoader {
  constructor(private _translations: Translations = {}) {
    super()
  }

  /**
   * Returns an {Observable} of translations for the specified language. If the
   * language is not recognized, an empty translations object will be returned.
   *
   * @param language the language for which the translations should be retrieved.
   * @returns the translations for the specified
   *          language or an empty set of translations if the language is not recognized.
   */
  public getTranslation(language: string): Observable<LanguageTranslations> {
    return observableOf(this._translations[language] || {})
  }
}
