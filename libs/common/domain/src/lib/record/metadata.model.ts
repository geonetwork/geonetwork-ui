import { Individual } from './contact.model'
import { Organization } from './organization.model'

type Uuid = string

export type UpdateFrequencyCode =
  | 'unknown'
  | 'notPlanned'
  | 'asNeeded'
  | 'irregular'
  | 'continual'
  | 'periodic'
export type UpdateFrequencyCustom = {
  updatedTimes: number // this should be an integer
  per: 'day' | 'week' | 'month' | 'year'
}
export type UpdateFrequency = UpdateFrequencyCode | UpdateFrequencyCustom

export type RecordKind = 'dataset' | 'service'

export const RecordStatusValues = [
  'completed',
  'ongoing',
  'under_development',
  'deprecated',
  'removed',
]
export type RecordStatus = typeof RecordStatusValues[number]

export type AccessConstraintType = 'security' | 'privacy' | 'legal' | 'other'
export interface AccessConstraint {
  text: string
  type: AccessConstraintType
}

export type License = {
  text: string
  url?: URL
}

export type SpatialRepresentationType =
  | 'grid'
  | 'vector'
  | 'tin'
  | 'table'
  | 'point'

export interface BaseRecord {
  uniqueIdentifier: Uuid
  ownerOrganization: Organization
  contacts: Array<Individual>
  title: string
  abstract: string
  recordCreated?: Date
  recordUpdated: Date
  kind: RecordKind
  themes: Array<string> // TODO: handle codelists
  keywords: Array<string> // TODO: handle thesaurus and id
  accessConstraints: Array<AccessConstraint>
  useLimitations: Array<string>
  licenses: Array<License>
  overviews: Array<GraphicOverview>
  extras?: Record<string, unknown>
  landingPage?: URL

  // to add: iso19139.topicCategory
  // to add: canonical url
  // to add: source catalog (??)
  // to add: is open data ?
}

// TODO: handle actual codelists
export type ServiceProtocol =
  | 'wms'
  | 'wfs'
  | 'wps'
  | 'wmts'
  | 'esriRest'
  | 'other'

export type DatasetDistributionType = 'service' | 'download' | 'link'

export interface DatasetServiceDistribution {
  type: 'service'
  url: URL
  accessServiceProtocol: ServiceProtocol
  identifierInService?: string
  name?: string
  description?: string
}

export interface DatasetDownloadDistribution {
  type: 'download'
  url: URL
  mimeType?: string
  sizeBytes?: number
  // removed because what's the use? encoding can be exposed by the file server or
  // even found out by trial and error; besides we can reasonably expect unicode or iso most of the time
  // textEncoding?: string
  name?: string
  description?: string
}

export interface OnlineLinkResource {
  type: 'link'
  url: URL
  name?: string
  description?: string
}

export type DatasetDistribution = (
  | DatasetServiceDistribution
  | DatasetDownloadDistribution
  | OnlineLinkResource
) & {
  type: DatasetDistributionType
}

export interface GraphicOverview {
  url: URL
  description?: string
}

export interface DatasetSpatialExtent {
  geometry: unknown // GeoJSON
  description?: string
}

export interface DatasetTemporalExtent {
  start: Date
  end: Date
  description?: string
}

export interface DatasetRecord extends BaseRecord {
  kind: 'dataset'
  contactsForResource: Array<Individual>
  status: RecordStatus
  updateFrequency: UpdateFrequency
  datasetCreated?: Date
  datasetUpdated?: Date
  lineage: string // Explanation of the origin of this record (e.g: how, why)"
  distributions: Array<DatasetDistribution>
  spatialExtents: Array<DatasetSpatialExtent> // not handled yet
  temporalExtents: Array<DatasetTemporalExtent> // not handled yet
  spatialRepresentation?: SpatialRepresentationType
}

export type ServiceOnlineResourceType = 'endpoint' | 'link'

export interface ServiceEndpoint {
  endpointUrl: URL
  protocol: string
  type: 'endpoint'
  description?: string
}

export type ServiceOnlineResource = (ServiceEndpoint | OnlineLinkResource) & {
  type: ServiceOnlineResourceType
}

export interface ServiceRecord extends BaseRecord {
  kind: 'service'
  onlineResources: Array<ServiceOnlineResource>
}

export type CatalogRecord = ServiceRecord | DatasetRecord
