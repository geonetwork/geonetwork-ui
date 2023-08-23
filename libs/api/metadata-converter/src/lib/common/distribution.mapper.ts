import { ServiceProtocol } from '@geonetwork-ui/common/domain/record'

export function matchProtocol(protocol: string): ServiceProtocol {
  if (/wms/i.test(protocol)) return 'wms'
  if (/wfs/i.test(protocol)) return 'wfs'
  if (/wmts/i.test(protocol)) return 'wmts'
  if (/wps/i.test(protocol)) return 'wps'
  if (/esri/i.test(protocol)) return 'esriRest'
  return 'other'
}

export function matchMimeType(format: string): string {
  if (/shp|shapefile/i.test(format)) return 'x-gis/x-shapefile'
  // TODO: check whether the format is a valid mime type
  return format || null
}
