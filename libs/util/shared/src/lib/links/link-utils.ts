import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

marker('downloads.wfs.featuretype.not.found')

export const FORMATS = {
  csv: {
    extensions: ['csv'],
    priority: 1,
    color: '#a6d6c0',
    mimeTypes: ['text/csv', 'application/csv'],
  },
  excel: {
    extensions: [
      'excel',
      'xls',
      'xlsx',
      'ms-excel',
      'openxmlformats-officedocument',
    ],
    priority: 2,
    color: '#acc5e4',
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
  geojson: {
    extensions: ['geojson'],
    priority: 3,
    color: '#b3cde8',
    mimeTypes: ['application/geo+json', 'application/vnd.geo+json'],
  },
  json: {
    extensions: ['json'],
    priority: 3,
    color: '#b3cde8',
    mimeTypes: ['application/json'],
  },
  shp: {
    extensions: ['shp', 'shape', 'zipped-shapefile'],
    priority: 4,
    color: '#b2d8ba',
    mimeTypes: ['x-gis/x-shapefile'],
  },
  gml: {
    extensions: ['gml'],
    priority: 5,
    color: '#e3b3e5',
    mimeTypes: ['application/gml+xml', 'text/xml; subtype=gml'],
  },
  kml: {
    extensions: ['kml', 'kmz'],
    priority: 6,
    color: '#c1e6a0',
    mimeTypes: [
      'application/vnd.google-earth.kml+xml',
      'application/vnd.google-earth.kmz',
    ],
  },
  gpkg: {
    extensions: ['gpkg', 'geopackage'],
    priority: 7,
    color: '#f7cce6',
    mimeTypes: ['application/geopackage+sqlite3'],
  },
  zip: {
    extensions: ['zip', 'tar.gz'],
    priority: 8,
    color: '#ffe7a3',
    mimeTypes: ['application/zip', 'application/x-zip'],
  },
  pdf: {
    extensions: ['pdf'],
    priority: 9,
    color: '#f5b2a3',
    mimeTypes: ['application/pdf'],
  },
  jpg: {
    extensions: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    priority: 9,
    color: '#d1c1e9',
    mimeTypes: ['image/jpg'],
  },
  svg: {
    extensions: ['svg'],
    priority: 10,
    color: '#f3c1c9',
    mimeTypes: ['image/svg+xml'],
  },
  dxf: {
    extensions: ['dxf'],
    priority: 11,
    color: '#f6ceac',
    mimeTypes: ['application/x-dxf', 'image/x-dxf'],
  },
  html: {
    extensions: ['html', 'htm'],
    priority: 12,
    color: '#FFF2CC',
    mimeTypes: ['text/html'],
  },
  fgb: {
    extensions: ['fgb', 'flatgeobuf'],
    priority: 13,
    color: '#ffe7a3',
    mimeTypes: ['application/flatgeobuf'],
  },
  jsonfg: {
    extensions: ['jsonfg', 'jsonfgc'],
    priority: 14,
    color: '#ffe7a3',
    mimeTypes: [
      'application/vnd.ogc.fg+json',
      'application/vnd.ogc.fg+json;compatibility=geojson',
    ],
  },
} as const

export type FileFormat = keyof typeof FORMATS

export function getFormatPriority(linkFormat: FileFormat): number {
  for (const format in FORMATS) {
    for (const ext of FORMATS[format].extensions) {
      if (new RegExp(`${ext}`, 'i').test(linkFormat)) {
        if (FORMATS[format].priority === 0) return 0
        return Object.keys(FORMATS).length - FORMATS[format].priority
      }
    }
  }
  return 0
}

export function getLinkPriority(link: DatasetOnlineResource): number {
  return getFormatPriority(getFileFormat(link))
}

export function getFileFormatFromServiceOutput(
  serviceOutput: string
): FileFormat | null {
  function formatMatcher(format: (typeof FORMATS)[FileFormat]): boolean {
    const output = serviceOutput.toLowerCase()
    return (
      format.extensions.some((extension: string) =>
        output.includes(extension)
      ) ||
      format.mimeTypes.some((mimeType: string) => output.includes(mimeType))
    )
  }
  for (const formatName in FORMATS) {
    if (formatMatcher(FORMATS[formatName])) {
      return formatName as FileFormat
    }
  }
  return null
}

export function getFileFormat(link: DatasetOnlineResource): FileFormat {
  if ('mimeType' in link) {
    const mimeTypeFormat = mimeTypeToFormat(link.mimeType)
    if (mimeTypeFormat !== null) {
      return mimeTypeFormat
    }
  }
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (checkFileFormat(link, alias)) return format as FileFormat
      if (isFormatInQueryParam(link, alias)) return format as FileFormat
    }
  }
  return null
}

export function isFormatInQueryParam(
  link: DatasetOnlineResource,
  alias: string
): boolean {
  const queryParams = link.url.searchParams
  for (const [key, value] of queryParams.entries()) {
    if (key === 'format' || key === 'f') {
      return value === alias
    }
  }
  return false
}

export function mimeTypeToFormat(mimeType: string): FileFormat {
  for (const format in FORMATS) {
    for (const mt of FORMATS[format].mimeTypes) {
      if (mimeType === mt) return format as FileFormat
    }
  }
  return null
}

export function checkFileFormat(
  link: DatasetOnlineResource,
  format: FileFormat
): boolean {
  return (
    ('name' in link && new RegExp(`[./]${format}`, 'i').test(link.name)) ||
    ('url' in link &&
      new RegExp(`[./]${format}`, 'i').test(link.url.toString()))
  )
}

export function getBadgeColor(linkFormat: FileFormat): string {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (new RegExp(`${alias}`, 'i').test(linkFormat))
        return FORMATS[format].color
    }
  }
  return 'var(--color-gray-700)' // Default color ?
}

export function getLinkLabel(link: DatasetOnlineResource): string {
  let format = ''
  switch (link.type) {
    case 'service':
      {
        switch (link.accessServiceProtocol) {
          case 'wfs':
            format = 'WFS'
            break
          case 'wms':
            format = 'WMS'
            break
          case 'wmts':
            format = 'WMTS'
            break
          case 'esriRest':
            format = 'REST'
            break
        }
      }
      break
    default:
      format = getFileFormat(link)
  }
  const label = link.description || link.name
  return format ? `${label} (${format})` : label
}

export function getMimeTypeForFormat(format: FileFormat): string | null {
  return format in FORMATS ? FORMATS[format.toLowerCase()].mimeTypes[0] : null
}
