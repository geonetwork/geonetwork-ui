import { Injectable } from '@angular/core'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'
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
  getUsagesForLink(link: DatasetDistribution): LinkUsage[] {
    switch (link.type) {
      case 'service': {
        switch (link.accessServiceProtocol) {
          case 'esriRest':
          case 'wfs':
            return [LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA]
          case 'wms':
          case 'wmts':
            return [LinkUsage.API, LinkUsage.MAP_API]
          default:
            return [LinkUsage.UNKNOWN]
        }
      }
      case 'link':
        return [LinkUsage.UNKNOWN]
      case 'download': {
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
    }
  }

  hasUsage(link: DatasetDistribution, usage: LinkUsage) {
    return this.getUsagesForLink(link).indexOf(usage) > -1
  }

  private hasFileExtension(extensions: string[], link: DatasetDistribution) {
    return (
      new RegExp(`[./](${extensions.join('|')})`, 'i').test(link.name) ||
      new RegExp(`[./](${extensions.join('|')})`, 'i').test(link.url.toString())
    )
  }
}
