import { Injectable } from '@angular/core'
import { WmsEndpoint, WmsLayerFull } from '@camptocamp/ogc-client'
import { MapContextLayerWmsModel } from '../map-context/map-context.model'
import { ProxyService } from '@geonetwork-ui/util/shared'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LONLAT_CRS_CODES } from './projections'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsWMSService {
  constructor(private proxy: ProxyService) {}

  getCapabilities(layer: MapContextLayerWmsModel): Observable<WmsEndpoint> {
    return from(new WmsEndpoint(this.proxy.getProxiedUrl(layer.url)).isReady())
  }

  getLayerFull(layer: MapContextLayerWmsModel): Observable<WmsLayerFull> {
    return this.getCapabilities(layer).pipe(
      map((endpoint) => endpoint.getLayerByName(layer.name))
    )
  }

  getLayerLonLatBBox(layer: MapContextLayerWmsModel) {
    return this.getLayerFull(layer).pipe(
      map((wmsLayerFull) => this.getLonLatBBox(wmsLayerFull))
    )
  }

  getLonLatBBox(wmsLayerFull: WmsLayerFull) {
    const { boundingBoxes } = wmsLayerFull
    const lonLatCRS = Object.keys(boundingBoxes)?.find((crs) =>
      LONLAT_CRS_CODES.includes(crs)
    )
    if (lonLatCRS) {
      return boundingBoxes[lonLatCRS]
    }
  }
}
