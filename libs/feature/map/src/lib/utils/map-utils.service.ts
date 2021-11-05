import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type { FeatureCollection } from 'geojson'
import OlFeature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Geometry } from 'ol/geom'
import Map from 'ol/Map'
import { Source } from 'ol/source'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import Layer from 'ol/layer/Layer'
import VectorSource from 'ol/source/Vector'
import { from, Observable, of } from 'rxjs'
import { fromPromise } from 'rxjs/internal-compatibility'
import { map } from 'rxjs/operators'
import { fromLonLat } from 'ol/proj'
import { MapContextLayerModel } from '../..'
import { extend, Extent } from 'ol/extent'
import { WmsEndpoint } from '@camptocamp/ogc-client'

const FEATURE_PROJECTION = 'EPSG:3857'
const DATA_PROJECTION = 'EPSG:4326'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor(private http: HttpClient) {}

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

  getLayerExtent(layer: MapContextLayerModel): Observable<Extent> {
    if (
      layer &&
      layer.type === 'geojson' &&
      layer.data.features[0] &&
      layer.data.features[0].geometry
    ) {
      let extent = []
      const features = new GeoJSON().readFeatures(layer.data)
      if (!features[0]) return of(undefined)
      extent = features[0].getGeometry().getExtent()
      features.forEach((feature) => {
        extent = extend(extent, feature.getGeometry().getExtent())
      })
      return of(this.extentFromLonLat(extent))
    } else if (layer && layer.type === 'wms') {
      return from(
        new WmsEndpoint(layer.url).isReady().then((endpoint) => {
          const wmsLayer = endpoint.getLayerByName(layer.name)
          return this.extentFromLonLat(wmsLayer.boundingBoxes['EPSG:4326'])
        })
      ) as Observable<Extent>
    } else {
      return of(undefined)
    }
  }

  extentFromLonLat(extent: Extent) {
    return [
      ...fromLonLat([extent[0], extent[1]], 'EPSG:3857'),
      ...fromLonLat([extent[2], extent[3]], 'EPSG:3857'),
    ]
  }
}
