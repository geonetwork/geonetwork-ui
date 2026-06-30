import { Injectable } from '@angular/core'
import { extend } from 'ol/extent.js'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BoundingBox, getGeometryBoundingBox } from '@geonetwork-ui/util/shared'
import { MapContextLayer } from '@geospatial-sdk/core'
import {
  createSpatialExtentLayer,
  SpatialExtentLayerStyle,
} from '@geonetwork-ui/ui/map'

/**
 * Style of the extent overlay drawn on top of the previewed data: a dashed
 * black outline over a very light fill, so the extent stays readable without
 * hiding the data underneath.
 */
const RECORD_EXTENT_OVERLAY_STYLE: SpatialExtentLayerStyle = {
  'stroke-color': 'rgba(0, 0, 0, 0.6)',
  'stroke-width': 2,
  'stroke-line-dash': [8, 6],
  'fill-color': 'rgba(0, 0, 0, 0.03)',
}

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
   * Returns null when the record has no usable spatial extent.
   *
   * This is purely for display and is independent from the map's initial view,
   * which is derived separately (see {@link getRecordExtent}).
   */
  getRecordExtentLayer(record: Partial<CatalogRecord>): MapContextLayer | null {
    return createSpatialExtentLayer(record.spatialExtents ?? [], {
      label: 'Spatial extent',
      clickable: false,
      style: RECORD_EXTENT_OVERLAY_STYLE,
    })
  }
}
