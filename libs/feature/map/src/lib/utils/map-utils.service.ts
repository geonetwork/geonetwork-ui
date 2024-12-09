import { Injectable } from '@angular/core'
import { extend, Extent } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import { transformExtent } from 'ol/proj'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

const GEOJSON = new GeoJSON()

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  getRecordExtent(record: Partial<CatalogRecord>): Extent {
    if (!('spatialExtents' in record) || record.spatialExtents.length === 0) {
      return null
    }
    // extend all the spatial extents into an including bbox
    const totalExtent = record.spatialExtents.reduce(
      (prev, curr) => {
        if ('bbox' in curr) return extend(prev, curr.bbox)
        else if ('geometry' in curr) {
          const geom = GEOJSON.readGeometry(curr.geometry)
          return extend(prev, geom.getExtent())
        }
        return prev
      },
      [Infinity, Infinity, -Infinity, -Infinity]
    )
    return transformExtent(totalExtent, 'EPSG:4326', 'EPSG:3857')
  }
}
