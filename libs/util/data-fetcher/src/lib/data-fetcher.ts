import type { Feature } from 'geojson'
import { DatasetHeaders, parseHeaders } from './headers'
import { parseCsv } from '../parsers/csv'
import { parseJson } from '../parsers/json'
import { parseGeojson } from '../parsers/geojson'
import { SupportedType, SupportedTypes } from '../mime/types'
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
 * File type can be either inferred (from the HTTP headers or the URL), or hinted using the 2nd argument
 * File type is determined liked so:
 *  1. if a type hint is given, use it
 *  2. otherwise, look for a Content-Type header in the response with a supported mime type
 *  3. if no valid mime type was found, look for an explicit file extension in the url (.csv, .geojson etc.)
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
          const fileExtensionMatches = new URL(
            url,
            typeof window !== 'undefined'
              ? window.location.toString()
              : undefined
          ).pathname.match(/\.(.+)$/)
          const fileExtension =
            fileExtensionMatches && fileExtensionMatches.length
              ? (fileExtensionMatches[1].toLowerCase() as SupportedType)
              : null

          let fileType: SupportedType

          // 1. type hint
          if (typeHint) fileType = typeHint
          // 2. content-type header
          else if ('supportedType' in fileInfo)
            fileType = fileInfo.supportedType
          // 3. file extension from url
          else if (SupportedTypes.indexOf(fileExtension) > -1)
            fileType = fileExtension

          // no type inferred or hinted
          if (!fileType) {
            if ('mimeType' in fileInfo)
              throw FetchError.unsupportedType(fileInfo.mimeType)
            else throw FetchError.unknownType()
          }

          try {
            switch (fileType) {
              case 'csv':
                return parseCsv(await response.text())
              case 'json':
                return parseJson(await response.text())
              case 'geojson':
                return parseGeojson(await response.text())
              case 'excel':
                return parseExcel(await response.arrayBuffer())
            }
          } catch (e: any) {
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
