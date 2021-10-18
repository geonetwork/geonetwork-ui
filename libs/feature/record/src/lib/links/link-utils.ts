import { MetadataLink, MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { WfsEndpoint } from '@camptocamp/ogc-client'

export enum DownloadFormatType {
  WFS = 'WFS',
  FILE = 'FILE',
}

export function getDownloadFormat(
  link: MetadataLink,
  type: DownloadFormatType
): string {
  const formats = {
    csv: ['csv'],
    geojson: ['geojson'],
    json: ['json'],
    shp: ['shp', 'shape', 'zipped-shapefile'],
    kml: ['kml', 'kmz'],
    gpkg: ['gpkg', 'geopackage'],
    excel: ['xls', 'xlsx', 'ms-excel', 'openxmlformats-officedocument'],
    pdf: ['pdf'],
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
    return featureType.outputFormats.map((format) => ({
      ...link,
      url: endpoint.getFeatureUrl(featureType.name, undefined, format),
      format: format,
    }))
  })
}
