import { ModuleWithProviders, NgModule } from '@angular/core'
import {
  FakeMissingTranslationHandler,
  TranslateDefaultParser,
  TranslateFakeCompiler,
  TranslateModule,
  TranslateService,
  TranslateCompiler,
} from '@ngx-translate/core'
import { TestTranslateLoader } from './test.translate.loader'
import { LanguageTranslations, Translations } from './translations.model'

// IMPORTANT:
// This was copy-pasted from https://github.com/mwootendev/ngx-translate-plugins/blob/7c6c73c7d16c9519a7bafff939d29fd8ea5e574a/projects/testing/src/lib/testing.module.ts
// because the original package was expecting rxjs 7+ as a peer dep and that was conflicting with many other dependencies
// FIXME: when rxjs 7 can be used in the project, remove this and do `npm install ngx-translate-testing --save-dev`

/**
 * The TranslateTestingModule provides the {TranslateModule} as well as a
 * {TranslateService} configured to return translations specific for the
 * test environment.
 *
 * @export
 */
@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule],
})
export class TranslateTestingModule
  implements ModuleWithProviders<TranslateTestingModule>
{
  private _translations: Translations = {}

  private _defaultLanguage: string

  private _compiler: TranslateCompiler

  /**
   * Creates a new instance of the {TranslateTestingModule} with translations for the specified language.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { greeting: 'Hello' };
   * const translateModule = TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('en', require('../../assets/i18n/en.json'));
   *
   * @static
   * @param {string} language the language for the translations.
   * @param {Translations} translations the translations to be used in the tests.
   * @returns the new instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public static withTranslations(
    language: string,
    translations: LanguageTranslations
  ): TranslateTestingModule

  /**
   * Creates a new instance of the {TranslateTestingModule} with the provided translations.
   *
   * @example
   *
   * const TRANSLATIONS = { en: { greeting: 'Hello' }, es: { greeting: 'Hola' } };
   * const translateModule = TranslateTestingModule.withTranslations(TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations(require('./test.i18n.json'));
   *
   * @static
   * @param {Translations} the language translations the translations to be used in the tests.
   * @returns the new instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public static withTranslations(
    translations: Translations
  ): TranslateTestingModule

  public static withTranslations(
    languageOrTranslations: string | Translations,
    translations?: LanguageTranslations
  ): TranslateTestingModule {
    const translateTestingModule = new TranslateTestingModule()

    if (typeof languageOrTranslations === 'string') {
      return translateTestingModule.withTranslations(
        <string>languageOrTranslations,
        translations
      )
    }

    return translateTestingModule.withTranslations(languageOrTranslations)
  }

  public get ngModule() {
    return TranslateTestingModule
  }

  public get providers() {
    const translateService = new TranslateService(
      null,
      new TestTranslateLoader(this._translations),
      this._compiler || new TranslateFakeCompiler(),
      new TranslateDefaultParser(),
      new FakeMissingTranslationHandler(),
      true,
      true,
      false,
      this._defaultLanguage
    )

    return [
      {
        provide: TranslateService,
        useValue: translateService,
      },
    ]
  }

  /**
   * Updates the {TranslateTestingModule} instance with additional translations. The
   * translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { en: { greeting: 'Hello' } };
   * const SPANISH_TRANSLATIONS = { en: { greeting: 'Hola' } };
   * const translateModule = TranslateTestingModule.withTranslations(ENGLISH_TRANSLATIONS)
   *   .withTranslations(SPANISH_TRANSLATIONS);
   *
   * @param {Translations} translations the additional translations to add to the testing service.
   * @returns the instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public withTranslations(translations: Translations): TranslateTestingModule

  /**
   * Updates the {TranslateTestingModule} instance with additional translations for a
   * specified language. The translations will be shallowly merged with any existing translations.
   *
   * @example
   *
   * const ENGLISH_TRANSLATIONS = { greeting: 'Hello' };
   * const SPANISH_TRANSLATIONS = { greeting: 'Hola' };
   * const translateModule = TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS)
   *   .withTranslations('es', SPANISH_TRANSLATIONS);
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('en', require('../../assets/i18n/en.json'))
   *   .withTranslations('es', require('../../assets/i18n/es.json'));
   *
   * @param {string} language the language for which the new translations are being added.
   * @param {LanguageTranslations} translations the translations for the specified language.
   * @returns the instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public withTranslations(
    language: string,
    translations: LanguageTranslations
  ): TranslateTestingModule

  public withTranslations(
    languageOrTranslations: string | Translations,
    translations?: LanguageTranslations
  ): TranslateTestingModule {
    if (typeof languageOrTranslations === 'string' && translations) {
      this.addTranslations(languageOrTranslations, translations)
      this._defaultLanguage = languageOrTranslations
    } else if (languageOrTranslations) {
      Object.keys(languageOrTranslations).forEach((language) =>
        this.addTranslations(language, languageOrTranslations[language])
      )
    }
    return this
  }

  /**
   * Updates the {TranslationTestingModule} to provide a {TranslateService} that will
   * use the provided {TranslateCompiler} to translate the test translations.
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('en', {people: '{gender, select, male{He is} female{She is} other{They are}} {how})'})
   *   .withCompiler(new TranslateMessageFormatCompiler());
   *
   * @param compiler the compiler to use to compile the test translations.
   * @returns the instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public withCompiler(compiler: TranslateCompiler): TranslateTestingModule {
    this._compiler = compiler
    return this
  }

  /**
   * Updates the {TranslateTestingModule} to use the provided language as the default language.
   * By default, the default language will be set to the first language provided.
   *
   * @example
   *
   * TranslateTestingModule.withTranslations('es', SPANISH_TRANSLATIONS)
   *   .withTranslations('en', ENGLISH_TRANSLATIONS)
   *   .withDefaultLanguage('en');
   *
   * @param language the new default language for translations.
   * @returns the instance that can be used to chain additional configuration.
   * @memberof TranslateTestingModule
   */
  public withDefaultLanguage(language: string): TranslateTestingModule {
    this._defaultLanguage = language || this._defaultLanguage
    return this
  }

  private addTranslations(
    language: string,
    translations: LanguageTranslations
  ) {
    if (!this._defaultLanguage) {
      this._defaultLanguage = language
    }

    if (this._translations[language]) {
      this._translations[language] = {
        ...this._translations[language],
        ...translations,
      }
    } else {
      this._translations[language] = translations
    }
  }
}
