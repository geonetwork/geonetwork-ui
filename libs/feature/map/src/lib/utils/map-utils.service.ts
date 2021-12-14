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
import { map } from 'rxjs/operators'
import { fromLonLat } from 'ol/proj'
import { MapContextLayerModel, MapContextViewModel } from '../..'
import { extend, Extent, getCenter, isEmpty } from 'ol/extent'
import { WmsEndpoint } from '@camptocamp/ogc-client'
import { ProxyService } from '@geonetwork-ui/util/shared'

const FEATURE_PROJECTION = 'EPSG:3857'
const DATA_PROJECTION = 'EPSG:4326'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor(private http: HttpClient, private proxy: ProxyService) {}

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
              null
            )
        )
      )
    } else if (layer && layer.type === 'wms') {
      geographicExtent = from(
        new WmsEndpoint(this.proxy.getProxiedUrl(layer.url))
          .isReady()
          .then((endpoint) => endpoint.getLayerByName(layer.name))
      ).pipe(
        map((layer: any) => layer.boundingBoxes['EPSG:4326']) // eslint-disable-line -- ogc-client lacks typing here
      )
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

  getViewFromExtent(extent: Extent, map: Map): MapContextViewModel {
    const center = getCenter(extent)
    const resolution = map
      .getView()
      .getResolutionForExtent(extent, map.getSize())
    const zoom = map.getView().getZoomForResolution(resolution)
    return { center, zoom }
  }
}
