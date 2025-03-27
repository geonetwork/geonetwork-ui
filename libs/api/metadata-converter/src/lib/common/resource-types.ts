import {
  CatalogRecord,
  RecordKind,
  ReuseType,
} from '@geonetwork-ui/common/domain/model/record'

export const PossibleResourceTypes = {
  application: 'reuse',
  dataset: 'dataset',
  map: 'reuse',
  'map/static': 'reuse', // old index field
  'map/interactive': 'reuse', // old index field
  'map-interactive': 'reuse', // new index field since Oct 10, 2024
  'map-static': 'reuse', // new index field
  mapDigital: 'reuse',
  interactiveMap: 'reuse',
  staticMap: 'reuse',
  service: 'service',
} as const

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
