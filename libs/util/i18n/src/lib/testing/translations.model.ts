// IMPORTANT:
// This was copy-pasted from https://github.com/mwootendev/ngx-translate-plugins/blob/7c6c73c7d16c9519a7bafff939d29fd8ea5e574a/projects/testing/src/lib/translations.model.ts
// because the original package was expecting rxjs 7+ as a peer dep and that was conflicting with many other dependencies
// FIXME: when rxjs 7 can be used in the project, remove this and do `npm install ngx-translate-testing --save-dev`

export declare type LanguageTranslation =
  | string
  | string[]
  | { [translationKey: string]: LanguageTranslation }

/**
 * LanguageTranslations represents a mapping between a translation key and the translation for that key
 * or to nested translation keys.
 *
 * @export
 */
export interface LanguageTranslations {
  [translationKey: string]: LanguageTranslation
}

/**
 * Translations represents a mapping between a language and the translations for that language.
 *
 * @export
 */
export interface Translations {
  [language: string]: LanguageTranslations
}
