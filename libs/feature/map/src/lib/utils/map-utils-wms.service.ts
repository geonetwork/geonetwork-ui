import { Injectable } from '@angular/core'
import { WmsEndpoint, WmsLayerFull } from '@camptocamp/ogc-client'
import { MapContextLayerWmsModel } from '../map-context/map-context.model'
import { ProxyService } from '@geonetwork-ui/util/shared'
import { from, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { LONLAT_CRS_CODES } from './projections'
import { fromEPSGCode, register } from 'ol/proj/proj4'
import { Extent } from 'ol/extent'
import proj4 from 'proj4/dist/proj4'
import { transformExtent } from 'ol/proj'

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
      switchMap((wmsLayerFull) => from(this.getLonLatBBox(wmsLayerFull)))
    )
  }

  async getProjFromEPSG(EPSGCode) {
    return fromEPSGCode(EPSGCode)
  }

  async getLonLatBBox(wmsLayerFull: WmsLayerFull): Promise<Extent> {
    const { boundingBoxes } = wmsLayerFull
    const lonLatCRS = Object.keys(boundingBoxes)?.find((crs) =>
      LONLAT_CRS_CODES.includes(crs)
    )
    if (lonLatCRS) {
      return boundingBoxes[lonLatCRS]
    } else {
      const availableEPSGCode = Object.keys(boundingBoxes)[0]
      register(proj4)
      const proj = await this.getProjFromEPSG(availableEPSGCode)
      proj4.defs(availableEPSGCode, proj)

      const bboxWithFiniteNumbers = [
        parseFloat(boundingBoxes[availableEPSGCode][0]),
        parseFloat(boundingBoxes[availableEPSGCode][1]),
        parseFloat(boundingBoxes[availableEPSGCode][2]),
        parseFloat(boundingBoxes[availableEPSGCode][3]),
      ]
      const extent = transformExtent(bboxWithFiniteNumbers, proj, 'EPSG:4326')
      return extent
    }
  }
}
