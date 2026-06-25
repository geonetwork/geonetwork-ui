import Collection from 'ol/Collection.js'
import {
  mouseOnly,
  noModifierKeys,
  platformModifierKeyOnly,
  primaryAction,
} from 'ol/events/condition.js'
import {
  defaults,
  DragPan,
  Interaction,
  MouseWheelZoom,
} from 'ol/interaction.js'
import MapBrowserEvent from 'ol/MapBrowserEvent.js'
import type { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'
import type {
  MapContextLayer,
  MapContextLayerGeojson,
} from '@geospatial-sdk/core'
import { spatialExtentsToFeatureCollection } from '@geonetwork-ui/util/shared'

export type SpatialExtentLayerStyle = NonNullable<
  MapContextLayerGeojson['style']
>

/**
 * Default style for a spatial-extent layer: a solid black outline over a
 * translucent grey fill.
 */
export const DEFAULT_SPATIAL_EXTENT_STYLE: SpatialExtentLayerStyle = {
  'stroke-color': 'black',
  'stroke-width': 2,
  'fill-color': 'rgba(153, 153, 153, 0.3)',
}

/**
 * Builds a GeoJSON map layer drawing the given spatial extents: each extent is
 * rendered from its own geometry or, when only a bounding box is available,
 * from a polygon derived from that box.
 *
 * @returns the layer, or `null` when none of the extents can be represented.
 */
export function createSpatialExtentLayer(
  extents: DatasetSpatialExtent[],
  overrides?: {
    label?: string
    clickable?: boolean
    style?: SpatialExtentLayerStyle
  }
): MapContextLayer | null {
  const data = spatialExtentsToFeatureCollection(extents)
  if (data.features.length === 0) {
    return null
  }
  return {
    type: 'geojson',
    data,
    label: 'Spatial extents',
    style: DEFAULT_SPATIAL_EXTENT_STYLE,
    ...overrides,
  }
}

export function prioritizePageScroll(interactions: Collection<Interaction>) {
  interactions.clear()
  interactions.extend(
    defaults({
      // remove rotate interactions
      altShiftDragRotate: false,
      pinchRotate: false,
      // replace drag and zoom interactions
      dragPan: false,
      mouseWheelZoom: false,
    })
      .extend([
        new DragPan({
          condition: dragPanCondition,
        }),
        new MouseWheelZoom({
          condition: mouseWheelZoomCondition,
        }),
      ])
      .getArray()
  )
}

export function dragPanCondition(
  this: DragPan,
  event: MapBrowserEvent<PointerEvent>
) {
  const dragPanCondition = this.getPointerCount() === 2 || mouseOnly(event)
  if (!dragPanCondition) {
    this.getMap().dispatchEvent('mapmuted')
  }
  // combine the condition with the default DragPan conditions
  return dragPanCondition && noModifierKeys(event) && primaryAction(event)
}

export function mouseWheelZoomCondition(
  this: MouseWheelZoom,
  event: MapBrowserEvent<WheelEvent>
) {
  if (!platformModifierKeyOnly(event) && event.type === 'wheel') {
    this.getMap().dispatchEvent('mapmuted')
  }
  return platformModifierKeyOnly(event)
}
