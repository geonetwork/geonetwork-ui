export interface SearchFilters {
  any?: string
  [x: string]: any
}

export interface StateConfigFilters {
  custom?: SearchFilters
  elastic?: any
}

export interface RecordSummary {
  id: string
  uuid: string
  title: string
  abstract: string
  metadataUrl: string
  thumbnailUrl: string
  logoUrl?: string
  downloadable?: boolean
  viewable?: boolean
  updateFrequency?: string
}

export interface RecordBrief extends RecordSummary {
  organization: string
  type: string
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export enum ResultsListLayout {
  CARD = 'CARD',
  LIST = 'LIST',
  TEXT = 'TEXT',
  TITLE = 'TITLE',
  TABLE = 'TABLE',
}

export enum FieldsList {
  'resourceTitleObject.default',
  'resourceAltTitle.default',
  'MD_LegalConstraintsOtherConstraintsObject',
  'licenseObject.default'
}

export const RESULTS_PAGE_SIZE = 20
