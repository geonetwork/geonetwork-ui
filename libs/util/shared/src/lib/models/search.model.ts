export interface SearchFilters {
  any?: string
  [x: string]: any
}

export interface StateConfigFilters {
  custom?: SearchFilters
  elastic?: any
}
export interface MetadataRecord {
  id: string
  uuid: string
  title: string
  metadataUrl: string
  abstract?: string
  thumbnailUrl?: string
  logoUrl?: string
  downloadable?: boolean
  viewable?: boolean
  updateFrequency?: string
  links?: MetadataLink[]
  updatedOn?: Date
  createdOn?: Date
  dataUpdatedOn?: Date
  dataCreatedOn?: Date
}

interface MetadataLinkValid {
  url: string
  // either a file name, a layer name or any other resource identifier
  name?: string
  protocol?: string
  description?: string
}
export type MetadataLink = MetadataLinkValid | { invalid: true; reason: string }

export interface RecordMetric {
  value: string
  recordCount: number
}

export enum ResultsListLayout {
  CARD = 'CARD',
  LIST = 'LIST',
  TEXT = 'TEXT',
  TITLE = 'TITLE',
}

export const RESULTS_PAGE_SIZE = 20
