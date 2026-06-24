import { Injectable } from '@angular/core'
import { extend } from 'ol/extent.js'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  BoundingBox,
  getGeometryBoundingBox,
  spatialExtentsToFeatureCollection,
} from '@geonetwork-ui/util/shared'
import { MapContextLayer } from '@geospatial-sdk/core'

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

  /**
   * Builds a non-interactive overlay layer drawing the spatial extent(s)
   * declared in the record's metadata (bounding boxes and/or geometries).
   * Returns null when the record has no spatial extent.
   *
   * This is purely for display and is independent from the map's initial view,
   * which is derived separately (see {@link getRecordExtent}).
   */
  getRecordExtentLayer(record: Partial<CatalogRecord>): MapContextLayer | null {
    if (!('spatialExtents' in record) || record.spatialExtents.length === 0) {
      return null
    }
    return {
      type: 'geojson',
      data: spatialExtentsToFeatureCollection(record.spatialExtents),
      label: 'Spatial extent',
      clickable: false,
      style: {
        'stroke-color': 'rgba(0, 0, 0, 0.6)',
        'stroke-width': 2,
        'stroke-line-dash': [8, 6],
        'fill-color': 'rgba(0, 0, 0, 0.03)',
      },
    }
  }
}
