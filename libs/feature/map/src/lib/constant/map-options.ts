import { InjectionToken } from '@angular/core'

export interface MapOptionsModel {
  empty?: boolean
}

export const defaultMapOptions: MapOptionsModel = {}

export const FEATURE_MAP_OPTIONS = new InjectionToken<MapOptionsModel>(
  'mapOptions'
)
