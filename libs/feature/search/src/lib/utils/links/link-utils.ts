import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('downloads.wfs.featuretype.not.found')

export const FORMATS = {
  csv: {
    extensions: ['csv'],
    priority: 1,
    color: '#559d7f',
    mimeTypes: ['text/csv', 'application/csv'],
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
    priority: 0,
    color: 'var(--color-primary)',
    mimeTypes: ['application/geopackage+sqlite3'],
  },
  excel: {
    extensions: ['xls', 'xlsx', 'ms-excel', 'openxmlformats-officedocument'],
    priority: 2,
    color: 'var(--color-primary)',
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
  pdf: {
    extensions: ['pdf'],
    priority: 0,
    color: 'var(--color-primary)',
    mimeTypes: ['application/vnd.ms-excel'],
  },
  jpg: {
    extensions: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    priority: 0,
    color: 'var(--color-primary)',
    mimeTypes: ['image/jpg'],
  },
  zip: {
    extensions: ['zip'],
    priority: 0,
    color: 'var(--color-primary)',
    mimeTypes: ['application/zip'],
  },
}

export function sortPriority(link: MetadataLinkValid): number {
  for (const format in FORMATS) {
    for (const ext of FORMATS[format].extensions) {
      if ('format' in link && new RegExp(`${ext}`, 'i').test(link.format)) {
        if (FORMATS[format].priority === 0) return 0
        return Object.keys(FORMATS).length - FORMATS[format].priority
      }
    }
  }
  return 0
}

export function getWfsFormat(link: MetadataLinkValid): string {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if ('format' in link && new RegExp(`${alias}`, 'i').test(link.format))
        return `WFS:${format}`
    }
  }
  return undefined
}

export function getFileFormat(link: MetadataLinkValid): string | void {
  if (link.format) {
    return link.format
  }
  if ('protocol' in link && /^WWW:DOWNLOAD/.test(link.protocol)) {
    // mime types in protocol
    const matches = link.protocol.match(/^WWW:DOWNLOAD:(.+\/.+)$/)
    if (matches !== null) {
      return mimeTypeToFormat(matches[1])
    }
  }
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (checkFileFormat(link, alias)) return format
    }
  }
}

export function mimeTypeToFormat(mimeType: string): string {
  for (const format in FORMATS) {
    for (const mt of FORMATS[format].mimeTypes) {
      if (mimeType === mt) return format
    }
  }
  return undefined
}

export function checkFileFormat(
  link: MetadataLinkValid,
  format: string
): boolean {
  return (
    ('name' in link && new RegExp(`[./]${format}`, 'i').test(link.name)) ||
    ('url' in link && new RegExp(`[./]${format}`, 'i').test(link.url))
  )
}

export function getBadgeColor(linkFormat: string): string | void {
  for (const format in FORMATS) {
    for (const alias of FORMATS[format].extensions) {
      if (new RegExp(`${alias}`, 'i').test(linkFormat))
        return FORMATS[format].color
    }
  }
  return 'var(--color-primary)' // Default color ?
}
