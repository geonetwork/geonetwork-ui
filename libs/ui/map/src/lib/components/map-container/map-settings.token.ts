import { InjectionToken } from '@angular/core'
import { Extent, MapContextLayer } from '@geospatial-sdk/core'

export const DO_NOT_USE_DEFAULT_BASEMAP = new InjectionToken(
  'doNotUseDefaultBasemap',
  { factory: () => false }
)
export const BASEMAP_LAYERS = new InjectionToken<MapContextLayer[]>(
  'basemapLayers',
  { factory: () => [] }
)
export const MAP_VIEW_CONSTRAINTS = new InjectionToken<{
  maxZoom?: number
  maxExtent?: Extent
}>('mapViewConstraints', {
  factory: () => ({}),
})
export const VECTOR_STYLE_DEFAULT = new InjectionToken('vectorStyleDefault', {
  factory: () => ({
    fill: { color: 'rgba(255, 255, 255, 0.2)' },
    stroke: { color: '#ffcc33', width: 2 },
  }),
})
