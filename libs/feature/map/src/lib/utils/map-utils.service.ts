import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { FeatureCollection } from 'geojson'
import { extend, Extent, isEmpty } from 'ol/extent'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Geometry } from 'ol/geom'
import Layer from 'ol/layer/Layer'
import Map from 'ol/Map'
import { transformExtent } from 'ol/proj'
import Source from 'ol/source/Source'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import { defaults, DragPan, Interaction, MouseWheelZoom } from 'ol/interaction'
import {
  mouseOnly,
  noModifierKeys,
  platformModifierKeyOnly,
  primaryAction,
} from 'ol/events/condition'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  MapContextLayerModel,
  MapContextLayerWmsModel,
} from '../map-context/map-context.model'
import Collection from 'ol/Collection'
import { defaults as defaultControls } from 'ol/control.js'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { ProxyService } from '@geonetwork-ui/util/shared'
import { WmsEndpoint, WmtsEndpoint } from '@camptocamp/ogc-client'
import { LONLAT_CRS_CODES } from '../constant/projections'
import { fromEPSGCode, register } from 'ol/proj/proj4'
import proj4 from 'proj4/dist/proj4'

const FEATURE_PROJECTION = 'EPSG:3857'
const DATA_PROJECTION = 'EPSG:4326'

const GEOJSON = new GeoJSON()

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor(private http: HttpClient, private proxy: ProxyService) {}

  createEmptyMap(): Map {
    return new Map({
      controls: defaultControls({
        attribution: true,
        attributionOptions: { collapsible: false },
      }),
      pixelRatio: 1,
    })
  }

  readFeatureCollection = (
    featureCollection: FeatureCollection,
    featureProjection = FEATURE_PROJECTION,
    dataProjection = DATA_PROJECTION
  ): Feature<Geometry>[] => {
    return GEOJSON.readFeatures(featureCollection, {
      featureProjection,
      dataProjection,
    }) as Feature<Geometry>[]
  }

  isWMSLayer(layer: Layer<Source>): boolean {
    return (
      layer.getSource() instanceof TileWMS ||
      layer.getSource() instanceof ImageWMS
    )
  }

  getGFIUrl(layer, map, coordinate): string {
    const view = map.getView()
    const projection = view.getProjection()
    const resolution = view.getResolution()
    const source = layer.getSource()
    const params = {
      ...source.getParams(),
      INFO_FORMAT: 'application/json',
    }
    return source.getFeatureInfoUrl(coordinate, resolution, projection, params)
  }

  getVectorFeaturesFromClick(olMap, event): Feature<Geometry>[] {
    const features = []
    const hit = olMap.forEachFeatureAtPixel(
      event.pixel,
      (feature: Feature<Geometry>) => {
        return feature
      },
      { layerFilter: (layer) => layer.getSource() instanceof VectorSource }
    )
    if (hit) {
      features.push(hit)
    }
    return features
  }

  getGFIFeaturesObservablesFromClick(
    olMap: Map,
    event: MapBrowserEvent<PointerEvent>
  ): Observable<Feature<Geometry>[]>[] {
    const wmsLayers = olMap.getLayers().getArray().filter(this.isWMSLayer)

    if (wmsLayers.length > 0) {
      const { coordinate } = event
      const gfiUrls = wmsLayers.reduce(
        (urls, layer) => [...urls, this.getGFIUrl(layer, olMap, coordinate)],

        []
      )
      return gfiUrls.map((url) =>
        this.http
          .get<FeatureCollection>(url)
          .pipe(map((collection) => this.readFeatureCollection(collection)))
      )
    } else {
      return []
    }
  }

  /**
   * Will emit `null` if no extent could be computed
   */
  async getLayerExtent(layer: MapContextLayerModel): Promise<Extent | null> {
    let latLonExtent: Extent
    if (
      layer &&
      layer.type === 'geojson' &&
      'data' in layer &&
      typeof layer.data === 'object' &&
      layer.data.features[0] &&
      layer.data.features[0].geometry
    ) {
      latLonExtent = new GeoJSON()
        .readFeatures(layer.data)
        .map((feature) => feature.getGeometry())
        .filter((geom) => !!geom)
        .reduce(
          (prev, curr) =>
            prev ? extend(prev, curr.getExtent()) : curr.getExtent(),
          null as Extent
        )
    } else if (layer && layer.type === 'wms') {
      latLonExtent = await this.getWmsLayerExtent(layer)
    } else if (layer && layer.type === 'wmts') {
      // TODO: isolate this in utils service
      latLonExtent = await new WmtsEndpoint(layer.url)
        .isReady()
        .then((endpoint) => {
          const layerName = endpoint.getSingleLayerName() ?? layer.name
          const wmtsLayer = endpoint.getLayerByName(layerName)
          return wmtsLayer.latLonBoundingBox
        })
    } else {
      return null
    }
    if (!latLonExtent || isEmpty(latLonExtent)) {
      return null
    }
    return transformExtent(latLonExtent, 'EPSG:4326', 'EPSG:3857')
  }

  async getWmsLayerExtent(
    layer: MapContextLayerWmsModel
  ): Promise<Extent | null> {
    const endpoint = await new WmsEndpoint(
      this.proxy.getProxiedUrl(layer.url)
    ).isReady()
    const { boundingBoxes } = endpoint.getLayerByName(layer.name)
    if (!Object.keys(boundingBoxes).length) {
      return null
    }
    const lonLatCRS = Object.keys(boundingBoxes)?.find((crs) =>
      LONLAT_CRS_CODES.includes(crs)
    )
    if (lonLatCRS) {
      return boundingBoxes[lonLatCRS]
    } else {
      const availableEPSGCode = Object.keys(boundingBoxes)[0]
      register(proj4)
      const proj = await fromEPSGCode(availableEPSGCode)
      return transformExtent(
        boundingBoxes[availableEPSGCode],
        proj,
        'EPSG:4326'
      )
    }
  }

  prioritizePageScroll(interactions: Collection<Interaction>) {
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

  getRecordExtent(record: Partial<CatalogRecord>): Extent {
    if (!('spatialExtents' in record)) {
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
  event: MapBrowserEvent<UIEvent>
) {
  if (!platformModifierKeyOnly(event) && event.type === 'wheel') {
    this.getMap().dispatchEvent('mapmuted')
  }
  return platformModifierKeyOnly(event)
}
