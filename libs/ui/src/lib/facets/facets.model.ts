export interface HasPath {
  path: string[]
}

export interface ModelItem extends HasPath {
  value: string
  count: number
}

export interface ModelBlock extends HasPath {
  key: string
  items: ModelItem[]
  type: string
  size: number
  more: boolean
  includeFilter: boolean
  excludeFilter: boolean
}
