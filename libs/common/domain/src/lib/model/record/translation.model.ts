// languages should be expressed using two-letters ISO 639-1 codes
export type LanguageCode = string

// Translations are organized like so (assuming `en` is the default language of the record):
// {
//   "Text in English": {
//     "fr": "Texte en français",
//     "it": "Testo in italiano",
//     "de": "Text auf Deutsch",
//   },
//   ...
// }
export type FieldTranslation = Record<LanguageCode, string>

export interface RecordTranslations {
  title?: FieldTranslation
  abstract?: FieldTranslation
  lineage?: FieldTranslation
}

export interface OrganizationTranslations {
  name?: FieldTranslation
}

export interface KeywordTranslations {
  label?: FieldTranslation
  description?: FieldTranslation
}

export interface ConstraintTranslations {
  text?: FieldTranslation
}

export interface OnlineResourceTranslations {
  name?: FieldTranslation
  description?: FieldTranslation
}

export interface SpatialExtentTranslations {
  description?: FieldTranslation
}

export type ModelTranslations =
  | RecordTranslations
  | OrganizationTranslations
  | KeywordTranslations
  | ConstraintTranslations
  | OnlineResourceTranslations
  | SpatialExtentTranslations
