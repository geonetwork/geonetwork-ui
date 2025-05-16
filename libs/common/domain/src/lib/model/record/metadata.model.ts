import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import type { Individual } from './contact.model'
import type { Organization } from './organization.model'
import type { Geometry } from 'geojson'
import { KeywordType, ThesaurusModel } from '../thesaurus'
import {
  ConstraintTranslations,
  KeywordTranslations,
  LanguageCode,
  OnlineResourceTranslations,
  RecordTranslations,
  SpatialExtentTranslations,
} from './translation.model'

type Uuid = string

marker('domain.record.updateFrequency.unknown')
marker('domain.record.updateFrequency.notPlanned')
marker('domain.record.updateFrequency.asNeeded')
marker('domain.record.updateFrequency.irregular')
marker('domain.record.updateFrequency.continual')
marker('domain.record.updateFrequency.periodic')

export const updateFrequencyCodeValues = [
  'unknown',
  'notPlanned',
  'asNeeded',
  'irregular',
  'continual',
  'periodic',
  'daily',
  'weekly',
  'fortnightly',
  'semimonthly',
  'monthly',
  'quarterly',
  'biannually',
  'annually',
  'biennially',
] as const

export type UpdateFrequencyCode = (typeof updateFrequencyCodeValues)[number]

marker('domain.record.updateFrequency.day')
marker('domain.record.updateFrequency.week')
marker('domain.record.updateFrequency.month')
marker('domain.record.updateFrequency.year')

marker('domain.record.updateFrequency.daily')
marker('domain.record.updateFrequency.weekly')
marker('domain.record.updateFrequency.fortnightly')
marker('domain.record.updateFrequency.monthly')
marker('domain.record.updateFrequency.quarterly')
marker('domain.record.updateFrequency.biannually')
marker('domain.record.updateFrequency.annually')
marker('domain.record.updateFrequency.semimonthly')
marker('domain.record.updateFrequency.biennially')

export type UpdateFrequencyCustom = {
  updatedTimes: number // this should be an integer
  per: 'day' | 'week' | 'month' | 'year'
}
export type UpdateFrequency = UpdateFrequencyCode | UpdateFrequencyCustom

export type RecordKind = 'dataset' | 'service' | 'reuse'

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
export type RecordStatus = (typeof RecordStatusValues)[number]

export type Constraint = {
  text: string
  url?: URL

  translations?: ConstraintTranslations
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
  bbox?: [number, number, number, number]

  translations?: KeywordTranslations
}

export interface BaseRecord {
  uniqueIdentifier: Uuid
  ownerOrganization: Organization
  contacts: Array<Individual>
  title: string
  abstract: string
  recordCreated?: Date
  recordPublished?: Date
  recordUpdated: Date
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
  resourceIdentifier?: string
  contactsForResource: Array<Individual>
  resourceCreated?: Date
  resourcePublished?: Date
  resourceUpdated?: Date

  // multilingual support
  defaultLanguage: LanguageCode
  otherLanguages: Array<LanguageCode> // this should include all non-default languages present in the metadata, even if incompletely translated

  translations?: RecordTranslations

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
  | 'GPFDL'
  | 'tms'
  | 'maplibre-style'
  | 'other'

export type OnlineResourceType = 'service' | 'download' | 'link' | 'endpoint'

export interface DatasetServiceDistribution {
  type: 'service'
  url: URL
  accessServiceProtocol: ServiceProtocol
  identifierInService?: string // should we keep the identifierInService? read-write duplicate with name
  name?: string
  description?: string
  translations?: OnlineResourceTranslations
  accessRestricted?: boolean
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
  translations?: OnlineResourceTranslations
  accessRestricted?: boolean
}

export interface OnlineLinkResource {
  type: 'link'
  url: URL
  name?: string
  description?: string
  translations?: OnlineResourceTranslations
  mimeType?: string
  accessRestricted?: boolean
}

export type DatasetOnlineResource = (
  | DatasetServiceDistribution
  | DatasetDownloadDistribution
  | OnlineLinkResource
) & {
  type: OnlineResourceType
}

export interface GraphicOverview {
  url: URL
  description?: string
}

export interface DatasetSpatialExtent {
  bbox?: [number, number, number, number]
  geometry?: Geometry
  description?: string
  translations?: SpatialExtentTranslations
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
  onlineResources: Array<DatasetOnlineResource>
  spatialExtents: Array<DatasetSpatialExtent>
  temporalExtents: Array<DatasetTemporalExtent>
  spatialRepresentation?: SpatialRepresentationType
}

export interface ServiceEndpoint {
  url: URL
  accessServiceProtocol: ServiceProtocol
  type: 'endpoint'
  description?: string
  translations?: OnlineResourceTranslations
}

export type ServiceOnlineResource = (ServiceEndpoint | OnlineLinkResource) & {
  type: OnlineResourceType
}

export interface ServiceRecord extends BaseRecord {
  kind: 'service'
  onlineResources: Array<ServiceOnlineResource>
  spatialExtents: Array<DatasetSpatialExtent>
}

export interface ReuseRecord extends BaseRecord {
  kind: 'reuse'
  lineage: string // Explanation of the origin of this record (e.g: how, why)"
  onlineResources: Array<OnlineLinkResource>
  reuseType: ReuseType
  spatialExtents: Array<DatasetSpatialExtent>
  temporalExtents: Array<DatasetTemporalExtent>
}

export type DatasetFeatureCatalog = {
  featureTypes: Array<{
    name: string
    definition: string
    attributes: DatasetFeatureAttribute[]
  }>
}
export interface DatasetFeatureAttributeValue {
  code?: string
  definition?: string
  label?: string
}
export interface DatasetFeatureAttribute {
  name: string
  definition: string
  type: string
  code: string
  values?: Array<DatasetFeatureAttributeValue>
}
export interface DatasetFeatureType {
  aliases: string
  code: string
  isAbstract: string
  typeName: string
  definition: string
  attributeTable: Array<DatasetFeatureAttribute>
}

export type ReuseType = 'application' | 'map' | 'other'

export type OnlineResource = DatasetOnlineResource | ServiceOnlineResource

export type CatalogRecord = DatasetRecord | ReuseRecord | ServiceRecord

export type CatalogRecordKeys =
  | keyof DatasetRecord
  | keyof ReuseRecord
  | keyof ServiceRecord
