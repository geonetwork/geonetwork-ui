import {
  DatasetHeaders,
  FetchError,
  SupportedType,
  SupportedTypes,
} from './model'
import { sharedFetch, useCache } from '@camptocamp/ogc-client'
import { parseHeaders } from './headers'

export async function inferDatasetType(
  url: string,
  typeHint?: SupportedType
): Promise<SupportedType> {
  const fileExtensionMatches = new URL(
    url,
    typeof window !== 'undefined' ? window.location.toString() : undefined
  ).pathname.match(/\.(.+)$/)
  const fileExtension =
    fileExtensionMatches && fileExtensionMatches.length
      ? (fileExtensionMatches[1].toLowerCase() as SupportedType)
      : null

  // 1. type hint
  if (typeHint) return Promise.resolve(typeHint)

  // 2. content-type header
  const headers = await fetchHeaders(url)
  if ('supportedType' in headers) return headers.supportedType
  // 3. file extension from url
  else if (SupportedTypes.indexOf(fileExtension) > -1) return fileExtension

  // no type inferred or hinted
  if ('mimeType' in headers) throw FetchError.unsupportedType(headers.mimeType)
  else throw FetchError.unknownType()
}

export function fetchHeaders(url: string): Promise<DatasetHeaders> {
  return sharedFetch(url, 'HEAD')
    .catch((error) => {
      throw FetchError.corsOrNetwork(error.message)
    })
    .then((response) => {
      if (!response.ok) {
        throw FetchError.http(response.status)
      }
      return parseHeaders(response.headers)
    })
}

export function fetchData(url: string): Promise<Response> {
  return useCache(
    () =>
      sharedFetch(url).then(async (response) => {
        if (!response.ok) {
          throw FetchError.http(response.status)
        }
        return response
      }),
    url
  )
}
