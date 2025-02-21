import { AllMimeTypes, DatasetHeaders, SupportedTypes } from './model'

export function parseHeaders(httpHeaders: Headers): DatasetHeaders {
  const result: DatasetHeaders = {}
  if (httpHeaders.has('Content-Type')) {
    result.mimeType = httpHeaders.get('Content-Type').split(';')[0]
    const supported =
      SupportedTypes.filter((type) => type !== 'wfs') // Ignore wfs type as it is not a file type
        .filter(
          (type) => AllMimeTypes[type].indexOf(result.mimeType as never) > -1
        )[0] || null
    if (supported !== null) result.supportedType = supported
  }
  if (httpHeaders.has('Content-Length')) {
    result.fileSizeBytes = parseInt(httpHeaders.get('Content-Length'))
  }
  if (httpHeaders.has('Last-Modified')) {
    const date = new Date(httpHeaders.get('Last-Modified'))
    if (Number.isNaN(date.valueOf())) result.lastUpdateInvalid = true
    else result.lastUpdate = date
  }
  return result
}
