import { BBox, Feature, Polygon } from 'geojson'

type ExternalId = {
  scheme: string
  value: string
}

type Concept = {
  id: string
}

type Theme = {
  concepts: Concept[]
  scheme: string
}

type SpatialExtent = {
  bbox: BBox[]
  crs: string
}

type TemporalExtent = {
  interval: [string, string | null][]
  resolution: string
  trs: string
}

type Extent = {
  spatial: SpatialExtent
  temporal: TemporalExtent
}

export interface RecordGeoJsonProperties {
  created: string
  updated: string
  type: string
  title: string
  description: string
  keywords: string[]
  language: string
  externalId: ExternalId[]
  publisher: string
  themes: Theme[]
  formats: string[]
  contactPoint: string
  license: string
  extent: Extent
}

export type RecordGeoJson = Feature<Polygon, RecordGeoJsonProperties> & {
  conformsTo: string[]
}
