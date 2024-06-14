import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import type { Individual } from './contact.model'
import type { Organization } from './organization.model'
import type { Geometry } from 'geojson'
import { KeywordType, ThesaurusModel } from '../thesaurus'

type Uuid = string

marker('domain.record.updateFrequency.unknown')
marker('domain.record.updateFrequency.notPlanned')
marker('domain.record.updateFrequency.asNeeded')
marker('domain.record.updateFrequency.irregular')
marker('domain.record.updateFrequency.continual')
marker('domain.record.updateFrequency.periodic')

export type UpdateFrequencyCode =
  | 'unknown'
  | 'notPlanned'
  | 'asNeeded'
  | 'irregular'
  | 'continual'
  | 'periodic'

marker('domain.record.updateFrequency.day')
marker('domain.record.updateFrequency.week')
marker('domain.record.updateFrequency.month')
marker('domain.record.updateFrequency.year')

export type UpdateFrequencyCustom = {
  updatedTimes: number // this should be an integer
  per: 'day' | 'week' | 'month' | 'year'
}
export type UpdateFrequency = UpdateFrequencyCode | UpdateFrequencyCustom

export type RecordKind = 'dataset' | 'service'

marker('domain.record.status.completed')
marker('domain.record.status.ongoing')
marker('domain.record.status.under_development')
marker('domain.record.status.deprecated')
marker('domain.record.status.removed')

export const RecordStatusValues = [
  'completed',
  'ongoing',
  'under_development',
  'deprecated',
  'removed',
]
export type RecordStatus = typeof RecordStatusValues[number]

export type Constraint = {
  text: string
  url?: URL
}

export type SpatialRepresentationType =
  | 'grid'
  | 'vector'
  | 'tin'
  | 'table'
  | 'point'

export interface Keyword {
  key?: string
  label: string
  description?: string
  type: KeywordType
  thesaurus?: ThesaurusModel
}
// languages should be expressed using two-letters ISO 639-1 codes
export type LanguageCode = string

export interface BaseRecord {
  uniqueIdentifier: Uuid
  ownerOrganization: Organization
  contacts: Array<Individual>
  title: string
  abstract: string
  recordCreated?: Date
  recordPublished?: Date
  recordUpdated: Date
  languages: Array<LanguageCode>
  kind: RecordKind
  topics: Array<string> // TODO: handle codelists
  keywords: Array<Keyword>
  licenses: Array<Constraint>
  legalConstraints: Array<Constraint>
  securityConstraints: Array<Constraint>
  otherConstraints: Array<Constraint>
  overviews: Array<GraphicOverview>
  extras?: Record<string, unknown>
  landingPage?: URL
  updateFrequency?: UpdateFrequency

  // information related to the resource (dataset, service)
  contactsForResource: Array<Individual>
  resourceCreated?: Date
  resourcePublished?: Date
  resourceUpdated?: Date

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
  | 'ogcFeatures'
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
  accessServiceProtocol?: ServiceProtocol
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
  geometry: Geometry
  description?: string
}

/**
 * Period if both start and end are provided
 * Instant if only start is provided
 */
export interface DatasetTemporalExtent {
  start: Date
  end?: Date
}

export interface DatasetRecord extends BaseRecord {
  kind: 'dataset'
  status: RecordStatus
  lineage: string // Explanation of the origin of this record (e.g: how, why)"
  distributions: Array<DatasetDistribution>
  spatialExtents: Array<DatasetSpatialExtent>
  temporalExtents: Array<DatasetTemporalExtent>
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

export type CatalogRecordKeys = keyof ServiceRecord | keyof DatasetRecord
