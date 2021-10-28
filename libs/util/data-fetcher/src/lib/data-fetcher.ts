import type { Feature } from 'geojson'
import { DatasetHeaders, parseHeaders } from './headers'
import { parseCsv } from '../parsers/csv'
import { parseJson } from '../parsers/json'
import { parseGeojson } from '../parsers/geojson'
import { SupportedType } from '../mime/types'
import { parseExcel } from '../parsers/excel'
import { useCache, sharedFetch } from '@camptocamp/ogc-client'

export type DataItem = Feature

class FetchError {
  constructor(
    public message,
    public httpStatus = 0,
    public isCrossOriginOrNetworkRelated = false,
    public parsingFailed = false,
    public contentTypeError = false
  ) {}
  static http(code: number) {
    return new FetchError('Received HTTP error', code)
  }
  static corsOrNetwork(message: string) {
    return new FetchError(
      `Data could not be fetched (probably because of CORS limitations or a network error); error message is: ${message}`,
      0,
      true
    )
  }
  static parsingFailed(info: string) {
    return new FetchError(
      `The received file could not be parsed for the following reason: ${info}`,
      0,
      false,
      true
    )
  }
  static unsupportedType(mimeType: string) {
    return new FetchError(
      `The following content type is unsupported: ${mimeType}`,
      0,
      false,
      false,
      true
    )
  }
  static unknownType() {
    return new FetchError(
      'The content type could not be inferred and was not hinted, abandoning',
      0,
      false,
      false,
      true
    )
  }
}

/**
 * This fetches the full dataset at the given URL and parses it according to its mime type.
 * All items in the dataset are converted to GeoJSON features, even if they do not bear any spatial geometry.
 */
export function readDataset(
  url: string,
  typeHint?: SupportedType
): Promise<DataItem[]> {
  return useCache(
    () =>
      sharedFetch(url)
        .catch((error) => {
          throw FetchError.corsOrNetwork(error.message)
        })
        .then(async (response) => {
          if (!response.ok) {
            throw FetchError.http(response.status)
          }
          const fileInfo = parseHeaders(response.headers)

          if (!typeHint && !('supportedType' in fileInfo)) {
            if ('mimeType' in fileInfo)
              throw FetchError.unsupportedType(fileInfo.mimeType)
            else throw FetchError.unknownType()
          }

          try {
            switch (typeHint || fileInfo.supportedType) {
              case 'csv':
                return parseCsv(await response.text())
              case 'json':
                return parseJson(await response.text())
              case 'geojson':
                return parseGeojson(await response.text())
              case 'excel':
                return parseExcel(await response.arrayBuffer())
            }
          } catch (e) {
            throw FetchError.parsingFailed(e.message)
          }
          throw new Error('Not implemented')
        }),
    url
  )
}

/**
 * This fetches only the header of the dataset at the given URL, giving info on size, mime-type and last update if available.
 */
export function readDatasetHeaders(url: string): Promise<DatasetHeaders> {
  return fetch(url).then((response) => parseHeaders(response.headers))
}
