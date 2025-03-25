import {
  CatalogRecord,
  RecordKind,
  ReuseType,
} from '@geonetwork-ui/common/domain/model/record'

export const PossibleResourceTypes = {
  application: 'reuse',
  dataset: 'dataset',
  interactiveMap: 'reuse',
  map: 'reuse',
  'map/static': 'reuse', // old index field
  'map/interactive': 'reuse', // old index field
  'map-interactive': 'reuse', // new index field since Oct 10, 2024
  'map-static': 'reuse', // new index field
  mapDigital: 'reuse',
  series: 'dataset',
  service: 'service',
  staticMap: 'reuse',
} as const

type KindType = keyof typeof PossibleResourceTypes
type ResourceType = 'reuse' | 'dataset' | 'service'
type PossibleResourceTypesGrouped = {
  [K in ResourceType]: KindType[]
}

export const PossibleResourceTypesDefinition = Object.entries(
  PossibleResourceTypes
).reduce(
  (acc, [key, val]) => ((acc[val] ??= []).push(key), acc),
  {}
) as PossibleResourceTypesGrouped

export function getResourceType(type: string): RecordKind {
  return (
    PossibleResourceTypes[type as keyof typeof PossibleResourceTypes] ||
    'dataset'
  )
}

export function getReuseType(type: string): ReuseType {
  const possibleReuseTypes = {
    application: 'application',
    map: 'map',
    'map/static': 'map', // old index field
    'map/interactive': 'map', // old index field
    'map-interactive': 'map', // new index field since Oct 10, 2024
    'map-static': 'map', // new index field
    mapDigital: 'map',
    interactiveMap: 'map',
    staticMap: 'map',
  } as const

  const kind = getResourceType(type)

  return kind === 'reuse'
    ? possibleReuseTypes[type as keyof typeof possibleReuseTypes] || 'other'
    : undefined
}

export function kindToCodeListValue(record: CatalogRecord) {
  return record.kind === 'reuse' ? record.reuseType : record.kind
}
