import { Injectable } from '@angular/core'
import { extend } from 'ol/extent'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BoundingBox, getGeometryBoundingBox } from '@geonetwork-ui/util/shared'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  getRecordExtent(record: Partial<CatalogRecord>): BoundingBox {
    if (!('spatialExtents' in record) || record.spatialExtents.length === 0) {
      return null
    }
    // extend all the spatial extents into an including bbox
    return record.spatialExtents.reduce(
      (prev, curr) => {
        if ('bbox' in curr) return extend(prev, curr.bbox) as BoundingBox
        else if ('geometry' in curr) {
          return extend(
            prev,
            getGeometryBoundingBox(curr.geometry)
          ) as BoundingBox
        }
        return prev
      },
      [Infinity, Infinity, -Infinity, -Infinity]
    )
  }
}
