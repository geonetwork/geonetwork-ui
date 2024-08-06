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
    // extend all the spatial extents bbox into an including bbox
    const totalExtent = record.spatialExtents.reduce(
      (prev, curr) => {
        return extend(prev, curr.bbox)
      },
      [Infinity, Infinity, -Infinity, -Infinity]
    )
    return transformExtent(totalExtent, 'EPSG:4326', 'EPSG:3857')
  }
}
