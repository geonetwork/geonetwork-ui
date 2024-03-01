// this geometry will be used to filter & boost results accordingly
import { InjectionToken } from '@angular/core'
import { Geometry } from 'geojson'

export const FILTER_GEOMETRY = new InjectionToken<Promise<Geometry>>(
  'filter-geometry'
)
