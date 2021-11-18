import { Injectable } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

export enum LinkUsage {
  API = 'api',
  MAPAPI = 'mapapi',
  DOWNLOAD = 'download',
  DATA = 'data',
}

@Injectable({
  providedIn: 'root',
})
export class LinkClassifierService {
  /**
   * Returns Array of link usages
   * @param link
   */
  getUsagesForLink(link: MetadataLink): LinkUsage[] {
    if ('protocol' in link) {
      if (/^WWW:DOWNLOAD/.test(link.protocol)) {
        const dataFormatsExp = '(geojson|json|csv|wfs|xls)'
        if (
          ('format' in link &&
            new RegExp(`${dataFormatsExp}`, 'i').test(link.format)) ||
          ('name' in link &&
            new RegExp(`[./]${dataFormatsExp}`, 'i').test(link.name)) ||
          ('url' in link &&
            new RegExp(`[./]${dataFormatsExp}`, 'i').test(link.url))
        ) {
          return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
        }
        return [LinkUsage.DOWNLOAD]
      }
      if (/^OGC:WFS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.DATA]
      if (/^ESRI:REST/.test(link.protocol) && /WFSServer/.test(link.url))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.DATA]
      if (/^ESRI:REST/.test(link.protocol) && /FeatureServer/.test(link.url))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.DATA]
      if (/^OGC:WMS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.MAPAPI]
      if (/^OGC:WMTS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.MAPAPI]
    }
    return []
  }
}
