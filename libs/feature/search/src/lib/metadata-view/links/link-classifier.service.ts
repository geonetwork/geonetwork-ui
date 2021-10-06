import { Injectable } from '@angular/core'
import { map, startWith } from 'rxjs/operators'
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
        const dataFormatsExp = '(geojson|csv|wfs)'
        if (
          ('format' in link &&
            new RegExp(`${dataFormatsExp}`, 'i').test(link.format)) ||
          ('name' in link &&
            new RegExp(`${dataFormatsExp}`, 'i').test(link.name)) ||
          ('url' in link && new RegExp(`${dataFormatsExp}`, 'i').test(link.url))
        ) {
          return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
        }
        return [LinkUsage.DOWNLOAD]
      }
      if (/^OGC:WFS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.DATA]
      if (/^ESRI:REST/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.DOWNLOAD]
      if (/^OGC:WMS/.test(link.protocol)) return [LinkUsage.MAPAPI]
      if (/^OGC:WMTS/.test(link.protocol)) return [LinkUsage.MAPAPI]
    }
    return []
  }

  /**
   * Returns boolean if link points to WFS
   * @param link
   */
  isWfsLink(link: MetadataLink): boolean {
    return (
      ('protocol' in link && /^OGC:WFS/.test(link.protocol)) ||
      ('format' in link && new RegExp(`wfs`, 'i').test(link.format)) ||
      ('name' in link && new RegExp(`wfs`, 'i').test(link.name)) ||
      ('url' in link && new RegExp(`wfs`, 'i').test(link.url))
    )
  }

  /**
   * Returns boolean if link points to ESRI REST API
   * @param link
   */
  isEsriRestLink(link: MetadataLink): boolean {
    return 'protocol' in link && /^ESRI:REST/.test(link.protocol)
  }
}
