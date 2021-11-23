import { MetadataLink, MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('downloads.wfs.featuretype.not.found')

export enum DownloadFormatType {
  WFS = 'WFS',
  FILE = 'FILE',
}

export function getDownloadFormat(
  link: MetadataLink,
  type: DownloadFormatType
): string {
  if ('protocol' in link && /^WWW:DOWNLOAD/.test(link.protocol)) {
    // mime types in protocol
    const matches = link.protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
    if (matches !== null) {
      const mimeType = matches[1]
      switch (mimeType) {
        case 'application/json':
          return 'json'
        case 'application/geo+json':
        case 'application/vnd.geo+json':
          return 'geojson'
        case 'text/csv':
        case 'application/csv':
          return 'csv'
        case 'x-gis/x-shapefile':
          return 'shp'
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'excel'
      }
    }
  }
  const formats = {
    csv: ['csv'],
    geojson: ['geojson'],
    json: ['json'],
    shp: ['shp', 'shape', 'zipped-shapefile'],
    kml: ['kml', 'kmz'],
    gpkg: ['gpkg', 'geopackage'],
    excel: ['xls', 'xlsx', 'ms-excel', 'openxmlformats-officedocument'],
    pdf: ['pdf'],
    jpg: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    zip: ['zip'],
  }
  for (const format in formats) {
    for (const alias of formats[format]) {
      if (type === DownloadFormatType.FILE && checkFileFormat(link, alias))
        return format
      if (
        type === DownloadFormatType.WFS &&
        'format' in link &&
        new RegExp(`${format}`, 'i').test(link.format)
      )
        return `WFS:${format}`
    }
  }
  return 'unknown'
}

export function checkFileFormat(link: MetadataLink, format: string): boolean {
  return (
    ('name' in link && new RegExp(`[./]${format}`, 'i').test(link.name)) ||
    ('url' in link && new RegExp(`[./]${format}`, 'i').test(link.url))
  )
}

export function getLinksWithWfsFormats(
  link: MetadataLinkValid
): Promise<MetadataLinkValid[]> {
  return new WfsEndpoint(link.url).isReady().then((endpoint) => {
    const featureType = endpoint.getFeatureTypeSummary(link.name)
    if (featureType) {
      return featureType.outputFormats.map((format) => ({
        ...link,
        url: endpoint.getFeatureUrl(featureType.name, { outputFormat: format }),
        format: format,
      }))
    } else {
      throw new Error('downloads.wfs.featuretype.not.found')
    }
  })
}

export function getLinksWithEsriRestFormats(
  link: MetadataLinkValid
): MetadataLinkValid[] {
  const formats = ['json', 'geojson']
  return formats.map((format) => ({
    ...link,
    url: getEsriRestDataUrl(link, format),
    format: `REST:${format}`,
  }))
}

export function getEsriRestDataUrl(
  link: MetadataLinkValid,
  format: string
): string {
  return `${link.url}/query?f=${format}&where=1=1&outFields=*`
}
