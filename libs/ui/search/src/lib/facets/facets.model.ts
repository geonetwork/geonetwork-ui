import { AggregationsTypesEnum } from '@geonetwork-ui/util-shared'

export type FacetPath = string[]

export interface HasPath {
  path: FacetPath
}

export interface ModelItem extends HasPath {
  value: string
  count: number
  meta?: any
  selected?: boolean
  inverted?: boolean
  query_string?: string
}

export interface ModelBlock extends HasPath {
  key: string
  items: ModelItem[]
  type: AggregationsTypesEnum
  size: number
  more: boolean
  includeFilter: boolean
  excludeFilter: boolean
}

export interface FacetSelectEvent {
  item: ModelItem
  block: ModelBlock
}
