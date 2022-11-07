import { Injectable } from '@angular/core'
import { MetadataLink, MetadataLinkType } from '../models'

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
        switch (link.mimeType) {
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

        // fallback: look for extension
        if (this.hasFileExtension(['json', 'csv', 'xls'], link)) {
          return [LinkUsage.DOWNLOAD, LinkUsage.DATA]
        }
        if (this.hasFileExtension(['geojson', 'wfs'], link)) {
          return [LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
        }
        return [LinkUsage.DOWNLOAD]
      }
      case MetadataLinkType.OTHER:
        return [LinkUsage.UNKNOWN]
    }
  }

  hasUsage(link: MetadataLink, usage: LinkUsage) {
    return this.getUsagesForLink(link).indexOf(usage) > -1
  }

  private hasFileExtension(extensions: string[], link: MetadataLink) {
    return (
      new RegExp(`[./](${extensions.join('|')})`, 'i').test(link.name) ||
      new RegExp(`[./](${extensions.join('|')})`, 'i').test(link.url)
    )
  }
}
