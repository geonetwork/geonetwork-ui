import { Injectable } from '@angular/core'
import {
  DatasetOnlineResource,
  ServiceOnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { getFileFormat } from './link-utils'

export enum LinkUsage {
  API = 'api',
  MAP_API = 'mapapi',
  DOWNLOAD = 'download',
  DATA = 'data',
  GEODATA = 'geodata',
  LANDING_PAGE = 'landingpage',
  UNKNOWN = 'unknown',
}

@Injectable({
  providedIn: 'root',
})
export class LinkClassifierService {
  getUsagesForLink(
    link: DatasetOnlineResource | ServiceOnlineResource
  ): LinkUsage[] {
    switch (link.type) {
      case 'endpoint':
      case 'service': {
        switch (link.accessServiceProtocol) {
          case 'esriRest':
          case 'wfs':
            return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
          case 'wms':
          case 'wmts':
          case 'tms':
            return [LinkUsage.API, LinkUsage.MAP_API]
          case 'maplibre-style':
            return [LinkUsage.GEODATA]
          case 'ogcFeatures':
            return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
          case 'GPFDL':
            return [LinkUsage.API]
          default:
            return [LinkUsage.UNKNOWN]
        }
      }
      case 'link':
        return [LinkUsage.UNKNOWN]
      case 'download': {
        switch (getFileFormat(link)) {
          case 'json':
          case 'csv':
          case 'excel':
            return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
          case 'geojson':
            return [LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
          default:
            if (link.url.toString().match(/\/wfs/i)) {
              return [LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
            }
            return [LinkUsage.DOWNLOAD]
        }
      }
    }
  }

  hasUsage(
    link: DatasetOnlineResource | ServiceOnlineResource,
    usage: LinkUsage
  ) {
    return this.getUsagesForLink(link).indexOf(usage) > -1
  }
}
