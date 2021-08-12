import { InjectionToken } from '@angular/core'
import { StyleFunction } from 'ol/style/Style'
import { defaultStyle, hlStyle } from './style.constant'

export interface MapOptionsModel {
  defaultStyle: StyleFunction
  hlStyle: StyleFunction
}

export const defaultMapOptions: MapOptionsModel = {
  defaultStyle,
  hlStyle,
}

export const FEATURE_MAP_OPTIONS = new InjectionToken<MapOptionsModel>(
  'mapOptions'
)
