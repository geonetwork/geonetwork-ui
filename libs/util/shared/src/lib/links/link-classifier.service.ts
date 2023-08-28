import { Injectable } from '@angular/core'
import { MetadataLink, MetadataLinkType } from '../models'
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
  getUsagesForLink(link: MetadataLink): LinkUsage[] {
    switch (link.type) {
      case MetadataLinkType.ESRI_REST:
      case MetadataLinkType.WFS:
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
      case MetadataLinkType.WMS:
      case MetadataLinkType.WMTS:
        return [LinkUsage.API, LinkUsage.MAP_API]
      case MetadataLinkType.LANDING_PAGE:
        return [LinkUsage.LANDING_PAGE]
      case MetadataLinkType.DOWNLOAD: {
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
      case MetadataLinkType.OTHER:
        return [LinkUsage.UNKNOWN]
    }
  }

  hasUsage(link: MetadataLink, usage: LinkUsage) {
    return this.getUsagesForLink(link).indexOf(usage) > -1
  }
}
