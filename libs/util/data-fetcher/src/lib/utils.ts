import { DataItem, DatasetHeaders, FetchError, SupportedType, SupportedTypes, } from './model'
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

export function fetchDataAsText(
  url: string,
  cacheActive: boolean
): Promise<string> {
  const fetchFactory = () =>
    sharedFetch(url)
      .catch((error) => {
        throw FetchError.corsOrNetwork(error.message)
      })
      .then(async (response) => {
        if (!response.ok) {
          const clonedResponse = response.clone()
          throw FetchError.http(response.status, await clonedResponse.text())
        }
        const clonedResponse = response.clone()
        return clonedResponse.text()
      })

  return cacheActive ? useCache(fetchFactory, url, 'asText') : fetchFactory()
}
export function fetchDataAsArrayBuffer(
  url: string,
  cacheActive: boolean
): Promise<ArrayBuffer> {
  const fetchFactory = () =>
    sharedFetch(url)
      .catch((error) => {
        throw FetchError.corsOrNetwork(error.message)
      })
      .then(async (response) => {
        if (!response.ok) {
          throw FetchError.http(response.status, await response.text())
        }
        // convert to a numeric array so that we can store the response in cache
        return Array.from(new Uint8Array(await response.arrayBuffer()))
      })

  return (
    cacheActive ? useCache(fetchFactory, url, 'asArrayBuffer') : fetchFactory()
  ).then((array) => {
    return new Uint8Array(array).buffer
  })
}

/**
 * This creates a Proxy that allows reading and writing to the data item properties
 * as if it was a simple array of JSON objects
 * @param items
 */
export function getJsonDataItemsProxy(
  items: DataItem[]
): Record<string, unknown>[] {
  return new Proxy<Record<string, unknown>[]>(items as any, {
    get(target: Record<string, unknown>[], p: string | symbol) {
      if (
        typeof p === 'string' &&
        !Number.isNaN(parseInt(p)) &&
        target[p]?.properties
      ) {
        return target[p].properties
      }
      return target[p]
    },
    set() {
      throw new Error('This object is read-only')
    },
  })
}
