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
    // transform an array of geojson geometries into a bbox
    const totalExtent = record.spatialExtents.reduce(
      (prev, curr) => {
        const geom = GEOJSON.readGeometry(curr.geometry)
        return extend(prev, geom.getExtent())
      },
      [Infinity, Infinity, -Infinity, -Infinity]
    )
    return transformExtent(totalExtent, 'EPSG:4326', 'EPSG:3857')
  }
}
