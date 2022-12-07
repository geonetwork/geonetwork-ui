export interface SearchFilters {
  any?: string
  [x: string]: any
}

type SearchFiltersFields = {
  [key: string]: SearchFiltersFields | SearchFiltersFieldsLeaf
}
type SearchFiltersFieldsLeaf = Record<string, boolean>

export interface StateConfigFilters {
  custom?: SearchFilters
  elastic?: any
}

export interface Organisation {
  name: string
  description?: string
  logoUrl?: string
  recordCount?: number
}

export interface MetadataContact {
  name?: string
  organisation?: string
  email: string
  website?: string
  logoUrl?: string
  address?: string
  phone?: string
}

export interface MetadataRecord {
  id: string
  uuid: string
  title: string
  metadataUrl: string
  abstract?: string
  thumbnailUrl?: string
  hasDownloads?: boolean
  hasMaps?: boolean
  updateStatus?: string
  updateFrequency?: string
  links?: MetadataLink[]
  updatedOn?: Date
  createdOn?: Date
  dataUpdatedOn?: Date
  dataCreatedOn?: Date
  lineage?: string
  keywords?: string[]
  contact?: MetadataContact
  resourceContacts?: MetadataContact[]
  catalogUuid?: string
  constraints?: string[]
  favoriteCount?: number
  isOpenData?: boolean
  ownerInfo?: string
  isPublishedToAll?: boolean
}

export enum MetadataLinkType {
  WMS,
  WMTS,
  WFS,
  ESRI_REST,
  DOWNLOAD,
  LANDING_PAGE,
  OTHER,
}

export interface MetadataLink {
  url: string
  type: MetadataLinkType
  // either a file name, a layer name or any other resource identifier
  name?: string
  protocol?: string
  mimeType?: string
  description?: string
  label?: string
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export const RESULTS_PAGE_SIZE = 10
