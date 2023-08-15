import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { MetadataLink, MetadataLinkType } from '../models'

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
}

export function sortPriority(link: MetadataLink): number {
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

export function extensionToFormat(extension: string): string {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (alias === extension.toLowerCase()) return format
    }
  }
  return undefined
}

export function getFileFormat(link: MetadataLink): string {
  if ('mimeType' in link) {
    return mimeTypeToFormat(link.mimeType)
  }
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (checkFileFormat(link, alias)) return format
      if (isFormatInQueryParam(link, alias)) return format
    }
  }
  return ''
}

export function isFormatInQueryParam(
  link: MetadataLink,
  alias: string
): boolean {
  const url = link.url.split('?').pop()
  const queryParams = new URLSearchParams(url)
  for (const [key, value] of queryParams.entries()) {
    if (key === 'format' || key === 'f') {
      return value === alias
    }
  }
  return false
}

export function mimeTypeToFormat(mimeType: string): string {
  for (const format in FORMATS) {
    for (const mt of FORMATS[format].mimeTypes) {
      if (mimeType === mt) return format
    }
  }
  return undefined
}

export function checkFileFormat(link: MetadataLink, format: string): boolean {
  return (
    ('name' in link && new RegExp(`[./]${format}`, 'i').test(link.name)) ||
    ('url' in link && new RegExp(`[./]${format}`, 'i').test(link.url))
  )
}

export function getBadgeColor(linkFormat: string): string {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (new RegExp(`${alias}`, 'i').test(linkFormat))
        return FORMATS[format].color
    }
  }
  return 'var(--color-gray-700)' // Default color ?
}

export function getLinkLabel(link: MetadataLink): string {
  let format = ''
  switch (link.type) {
    case MetadataLinkType.WFS:
      format = 'WFS'
      break
    case MetadataLinkType.WMS:
      format = 'WMS'
      break
    case MetadataLinkType.WMTS:
      format = 'WMTS'
      break
    case MetadataLinkType.ESRI_REST:
      format = 'REST'
      break
    default:
      format = getFileFormat(link)
  }
  return format ? `${link.label} (${format})` : link.label
}

export function getMimeTypeForFormat(format: string): string | null {
  return format in FORMATS ? FORMATS[format.toLowerCase()].mimeTypes[0] : null
}
