export interface KeywordApiResponse {
  values?: {
    eng: string
  }
  definitions?: {
    eng: string
  }
  coordEast?: string
  coordWest?: string
  coordSouth?: string
  coordNorth?: string
  thesaurusKey?: string
  definition?: string
  value?: string
  uri?: string
}

export interface ThesaurusApiResponse {
  key?: string
  dname?: string
  description?: string[] | string
  filename?: string
  title?: string
  multilingualTitles?: string[]
  dublinCoreMultilinguals?: string[]
  date?: string
  url?: string
  defaultNamespace?: string
  type?: string
  activated?: string
}
