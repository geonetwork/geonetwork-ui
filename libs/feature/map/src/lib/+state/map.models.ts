import { MapContextLayerModel } from '../map-context/map-context.model'

export type MapLayer = MapContextLayerModel & {
  title: string
}
export type MapLayerWithInfo = MapLayer & {
  error: string | null
  loading: boolean
}
