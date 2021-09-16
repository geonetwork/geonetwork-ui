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
  dataLinks?: MetadataLink[]
  otherLinks?: MetadataLink[]
  updatedOn?: Date
  createdOn?: Date
  dataUpdatedOn?: Date
  dataCreatedOn?: Date
}

export interface MetadataLink {
  protocol?: string
  name: string
  description?: string
  url: string
}

// we will need to change model to contain format:
// export type MetadataLinkFormats = 'OGC:WMS'|'OGC:WFS'|'OGC:WPS'|'ESRIFeature'|'csv'|'geosjon'|'json'|'shp'|'xls'|'xlsx'|'kml'|'gpkg'|'outbound'|'unknown'

// export interface MetadataLink {
//   format: MetadataLinkFormats
//   resourceName: string // layerName WMS, featureType WFS
//   title: string
//   description?: string
//   url: string
// }

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
