import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DatasetOnlineResource,
  ServiceOnlineResource,
  ServiceProtocol,
} from '@geonetwork-ui/common/domain/model/record'
import {
  OgcApiEndpoint,
  WfsEndpoint,
  WmsEndpoint,
  WmtsEndpoint,
} from '@camptocamp/ogc-client'

marker('downloads.wfs.featuretype.not.found')

export const FORMATS = {
  csv: {
    extensions: ['csv'],
    priority: 1,
    color: '#F6A924',
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
    color: '#FFDE10',
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
  geojson: {
    extensions: ['geojson'],
    priority: 3,
    color: '#293C6F',
    mimeTypes: ['application/geo+json', 'application/vnd.geo+json'],
  },
  json: {
    extensions: ['json'],
    priority: 3,
    color: '#84D0F0',
    mimeTypes: ['application/json'],
  },
  shp: {
    extensions: ['shp', 'shape', 'zipped-shapefile'],
    priority: 4,
    color: '#009036',
    mimeTypes: ['x-gis/x-shapefile'],
  },
  gml: {
    extensions: ['gml'],
    priority: 5,
    color: '#E75113',
    mimeTypes: ['application/gml+xml', 'text/xml; subtype=gml'],
  },
  kml: {
    extensions: ['kml', 'kmz'],
    priority: 6,
    color: '#F4B5D0',
    mimeTypes: [
      'application/vnd.google-earth.kml+xml',
      'application/vnd.google-earth.kmz',
    ],
  },
  gpkg: {
    extensions: ['gpkg', 'geopackage'],
    priority: 7,
    color: '#7D5D9F',
    mimeTypes: ['application/geopackage+sqlite3'],
  },
  zip: {
    extensions: ['zip', 'tar.gz'],
    priority: 8,
    color: '#B0CB52',
    mimeTypes: ['application/zip', 'application/x-zip'],
  },
  pdf: {
    extensions: ['pdf'],
    priority: 9,
    color: '#49579E',
    mimeTypes: ['application/pdf'],
  },
  jpg: {
    extensions: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    priority: 9,
    color: '#C4A98F',
    mimeTypes: ['image/jpg'],
  },
  svg: {
    extensions: ['svg'],
    priority: 10,
    color: '#EB6D82',
    mimeTypes: ['image/svg+xml'],
  },
  dxf: {
    extensions: ['dxf'],
    priority: 11,
    color: '#DCCD00',
    mimeTypes: ['application/x-dxf', 'image/x-dxf'],
  },
  html: {
    extensions: ['html', 'htm'],
    priority: 12,
    color: '#C0C9B6',
    mimeTypes: ['text/html'],
  },
  fgb: {
    extensions: ['fgb', 'flatgeobuf'],
    priority: 13,
    color: '#A8111C',
    mimeTypes: ['application/flatgeobuf'],
  },
  jsonfg: {
    extensions: ['jsonfg', 'jsonfgc'],
    priority: 14,
    color: '#009EE0',
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

export function getLinkPriority(
  link: DatasetOnlineResource | ServiceOnlineResource
): number {
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

export function getFileFormat(
  link: DatasetOnlineResource | ServiceOnlineResource
): FileFormat {
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
  link: DatasetOnlineResource | ServiceOnlineResource,
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
  link: DatasetOnlineResource | ServiceOnlineResource,
  format: FileFormat
): boolean {
  return (
    ('name' in link &&
      new RegExp(`[./]${format}`, 'i').test(link.name.toLowerCase())) ||
    ('url' in link &&
      new RegExp(`[./]${format}`, 'i').test(link.url.toString())) ||
    ('name' in link && link.name.toLowerCase().includes(format))
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

export function getLinkLabel(
  link: DatasetOnlineResource | ServiceOnlineResource
): string {
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
          case 'tms':
            format = 'TMS'
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
  const label = link.description || ('name' in link ? link.name : '')
  return format ? `${label} (${format})` : label
}

export async function getLayers(url: string, serviceProtocol: ServiceProtocol) {
  switch (serviceProtocol) {
    case 'ogcFeatures': {
      const layers = await new OgcApiEndpoint(url).allCollections
      return layers
    }
    case 'wfs': {
      const endpointWfs = await new WfsEndpoint(url).isReady()
      const featureTypes = await endpointWfs.getFeatureTypes()
      const layers = await Promise.all(
        featureTypes.map(async (collection) => {
          return await endpointWfs.getFeatureTypeFull(collection.name)
        })
      )
      return layers
    }
    case 'wms': {
      const endpointWms = await new WmsEndpoint(url).isReady()
      const layers = (
        await endpointWms
          .getLayers()
          .flatMap(wmsLayerFlatten)
          .filter((l) => l.name)
      ).map((collection) => {
        return endpointWms.getLayerByName(collection.name)
      })
      return layers
    }
    case 'wmts': {
      const endpointWmts = await new WmtsEndpoint(url).isReady()
      return endpointWmts.getLayers()
    }
    default:
      return undefined
  }
}

export function wmsLayerFlatten(layerFull) {
  const layer = {
    title: layerFull.title,
    name: layerFull.name,
    abstract: layerFull.abstract,
  }

  return 'children' in layerFull && Array.isArray(layerFull.children)
    ? [layer, ...layerFull.children.flatMap(wmsLayerFlatten)]
    : [layer]
}

export function getMimeTypeForFormat(format: FileFormat): string | null {
  return format in FORMATS ? FORMATS[format.toLowerCase()].mimeTypes[0] : null
}
