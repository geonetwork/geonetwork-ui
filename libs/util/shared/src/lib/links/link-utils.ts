import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

marker('downloads.wfs.featuretype.not.found')

export const FORMATS = {
  csv: {
    extensions: ['csv'],
    priority: 1,
    color: '#559d7f',
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
    color: '#0f4395',
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
  geojson: {
    extensions: ['geojson'],
    priority: 3,
    color: '#1e5180',
    mimeTypes: ['application/geo+json', 'application/vnd.geo+json'],
  },
  json: {
    extensions: ['json'],
    priority: 3,
    color: '#1e5180',
    mimeTypes: ['application/json'],
  },
  shp: {
    extensions: ['shp', 'shape', 'zipped-shapefile'],
    priority: 4,
    color: '#328556',
    mimeTypes: ['x-gis/x-shapefile'],
  },
  kml: {
    extensions: ['kml', 'kmz'],
    priority: 5,
    color: '#348009',
    mimeTypes: [
      'application/vnd.google-earth.kml+xml',
      'application/vnd.google-earth.kmz',
    ],
  },
  gpkg: {
    extensions: ['gpkg', 'geopackage'],
    priority: 6,
    color: '#ea79ba',
    mimeTypes: ['application/geopackage+sqlite3'],
  },
  zip: {
    extensions: ['zip'],
    priority: 7,
    color: '#f2bb3a',
    mimeTypes: ['application/zip'],
  },
  pdf: {
    extensions: ['pdf'],
    priority: 8,
    color: '#db544a',
    mimeTypes: ['application/pdf'],
  },
  jpg: {
    extensions: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    priority: 8,
    color: '#673ab7',
    mimeTypes: ['image/jpg'],
  },
  svg: {
    extensions: ['svg'],
    priority: 9,
    color: '#d98294',
    mimeTypes: ['image/svg+xml'],
  },
} as const

type FileFormat = keyof typeof FORMATS

export function sortPriority(link: DatasetDistribution): number {
  const linkFormat = getFileFormat(link)
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

export function extensionToFormat(extension: string): FileFormat {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (alias === extension.toLowerCase()) return format as FileFormat
    }
  }
  return undefined
}

export function getFileFormat(link: DatasetDistribution): FileFormat {
  if ('mimeType' in link) {
    return mimeTypeToFormat(link.mimeType)
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
  link: DatasetDistribution,
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
  return undefined
}

export function checkFileFormat(
  link: DatasetDistribution,
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

export function getLinkLabel(link: DatasetDistribution): string {
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
