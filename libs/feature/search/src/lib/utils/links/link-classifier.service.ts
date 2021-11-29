import { Injectable } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

export enum LinkUsage {
  API = 'api',
  MAPAPI = 'mapapi',
  DOWNLOAD = 'download',
  DATA = 'data',
  GEODATA = 'geodata',
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
        // mime types in protocol
        const matches = link.protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
        if (matches !== null) {
          const mimeType = matches[1]
          switch (mimeType) {
            case 'application/json':
            case 'text/csv':
            case 'application/csv':
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
              return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
            case 'application/geo+json':
            case 'application/vnd.geo+json':
              return [LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
          }
        }

        // fallback: look for extension
        const dataFormatExtensions = '(json|csv|xls)'
        if (this.foundInFileExtension(dataFormatExtensions, link)) {
          return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
        }
        const geoDataFormatExtensions = '(geojson|wfs)'
        if (this.foundInFileExtension(geoDataFormatExtensions, link)) {
          return [LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
        }
        return [LinkUsage.DOWNLOAD]
      }
      if (/^OGC:WFS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
      if (/^ESRI:REST/.test(link.protocol) && /WFSServer/.test(link.url))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
      if (/^ESRI:REST/.test(link.protocol) && /FeatureServer/.test(link.url))
        return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
      if (/^OGC:WMS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.MAPAPI]
      if (/^OGC:WMTS/.test(link.protocol))
        return [LinkUsage.API, LinkUsage.MAPAPI]
    }
    return []
  }

  foundInFileExtension(formatExtension: string, link: MetadataLink) {
    return (
      ('format' in link &&
        new RegExp(`${formatExtension}`, 'i').test(link.format)) ||
      ('name' in link &&
        new RegExp(`[./]${formatExtension}`, 'i').test(link.name)) ||
      ('url' in link &&
        new RegExp(`[./]${formatExtension}`, 'i').test(link.url))
    )
  }
}
