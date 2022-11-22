import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { extend, Extent, isEmpty } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import { Options, optionsFromCapabilities } from 'ol/source/WMTS'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import { from, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapContextLayerModel } from '../..'
import { MapUtilsWMSService } from './map-utils-wms.service'
import { MetadataLink } from '@geonetwork-ui/util/shared'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor(private http: HttpClient, private wmsUtils: MapUtilsWMSService) {}

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
      return of(null) // FIXME: restore
    } else {
      return of(null)
    }
    return geographicExtent.pipe(
      map((extent) => (isEmpty(extent) ? null : extent))
    )
  }

  getWmtsOptionsFromCapabilities(link: MetadataLink): Observable<Options> {
    return from(
      fetch(link.url)
        .then(function (response) {
          return response.text()
        })
        .then(function (text) {
          const result = new WMTSCapabilities().read(text)
          return optionsFromCapabilities(result, {
            layer: link.name,
            matrixSet: 'EPSG:3857',
          })
        })
    )
  }
}
