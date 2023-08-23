import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { FeatureCollection } from 'geojson'
import { extend, Extent, isEmpty } from 'ol/extent'
import OlFeature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Geometry } from 'ol/geom'
import Layer from 'ol/layer/Layer'
import Map from 'ol/Map'
import { fromLonLat } from 'ol/proj'
import Source from 'ol/source/Source'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import { Options, optionsFromCapabilities } from 'ol/source/WMTS'
import { DragPan, MouseWheelZoom, defaults, Interaction } from 'ol/interaction'
import {
  mouseOnly,
  noModifierKeys,
  platformModifierKeyOnly,
  primaryAction,
} from 'ol/events/condition'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import { from, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapContextLayerModel } from '../..'
import { MapUtilsWMSService } from './map-utils-wms.service'
import Collection from 'ol/Collection'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

const FEATURE_PROJECTION = 'EPSG:3857'
const DATA_PROJECTION = 'EPSG:4326'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor(private http: HttpClient, private wmsUtils: MapUtilsWMSService) {}

  createEmptyMap(): Map {
    const map = new Map({
      controls: [],
      pixelRatio: 1,
    })
    return map
  }

  readFeatureCollection = (
    featureCollection: FeatureCollection,
    featureProjection = FEATURE_PROJECTION,
    dataProjection = DATA_PROJECTION
  ): OlFeature<Geometry>[] => {
    const olFeatures = new GeoJSON().readFeatures(featureCollection, {
      featureProjection,
      dataProjection,
    })
    return olFeatures
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
    const url = source.getFeatureInfoUrl(
      coordinate,
      resolution,
      projection,
      params
    )
    return url
  }

  getVectorFeaturesFromClick(olMap, event): OlFeature<Geometry>[] {
    const features = []
    const hit = olMap.forEachFeatureAtPixel(
      event.pixel,
      (feature: OlFeature<Geometry>) => {
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
    olMap,
    event
  ): Observable<OlFeature<Geometry>[]>[] {
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
  getLayerExtent(layer: MapContextLayerModel): Observable<Extent | null> {
    let geographicExtent: Observable<Extent>
    if (
      layer &&
      layer.type === 'geojson' &&
      'data' in layer &&
      typeof layer.data === 'object' &&
      layer.data.features[0] &&
      layer.data.features[0].geometry
    ) {
      geographicExtent = of(layer.data).pipe(
        map((layerData) =>
          new GeoJSON()
            .readFeatures(layerData)
            .map((feature) => feature.getGeometry())
            .filter((geom) => !!geom)
            .reduce(
              (prev, curr) =>
                prev ? extend(prev, curr.getExtent()) : curr.getExtent(),
              null as Extent
            )
        )
      )
    } else if (layer && layer.type === 'wms') {
      geographicExtent = this.wmsUtils.getLayerLonLatBBox(layer)
    } else if (layer && layer.type === 'wmts') {
      return of(layer.options.tileGrid.getExtent())
    } else {
      return of(null)
    }
    return geographicExtent.pipe(
      map((extent) => [
        ...fromLonLat([extent[0], extent[1]], 'EPSG:3857'),
        ...fromLonLat([extent[2], extent[3]], 'EPSG:3857'),
      ]),
      map((extent) => (isEmpty(extent) ? null : extent))
    )
  }

  getWmtsOptionsFromCapabilities(
    link: DatasetDistribution
  ): Observable<Options> {
    const getCapabilitiesUrl = new URL(link.url, window.location.toString())
    getCapabilitiesUrl.searchParams.set('SERVICE', 'WMTS')
    getCapabilitiesUrl.searchParams.set('REQUEST', 'GetCapabilities')
    return from(
      fetch(getCapabilitiesUrl.toString())
        .then(async function (response) {
          if (!response.ok) {
            throw new Error(`WMTS GetCapabilities HTTP request failed with code ${
              response.status
            } and body:
${await response.text()}`)
          }
          return response.text()
        })
        .then(function (text) {
          try {
            const result = new WMTSCapabilities().read(text)
            return optionsFromCapabilities(result, {
              layer: link.name,
              matrixSet: 'EPSG:3857',
            })
          } catch (e: any) {
            throw new Error(`WMTS GetCapabilities parsing failed:
${e.stack || e.message || e}`)
          }
        })
    )
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
