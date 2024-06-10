export type KeywordType = 'place' | 'temporal' | 'theme' | 'other'

export interface ThesaurusModel {
  id: string
  name?: string
  url?: URL
  thesaurusKey?: string
  definition?: string
  definitions?: object
  uri?: string
  value?: string
  values?: object
  type?: KeywordType
}
