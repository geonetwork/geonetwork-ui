import { parseHeaders } from './headers'
import { CsvReader } from './readers/csv'
import { JsonReader } from './readers/json'
import { GeojsonReader } from './readers/geojson'
import { ExcelReader } from './readers/excel'
import { DataItem, DatasetHeaders, FetchError, SupportedType } from './model'
import { inferDatasetType } from './utils'
import { BaseReader } from './readers/base'
import { GmlReader } from './readers/gml'
import { WfsReader } from './readers/wfs'

interface OpenDatasetOptions {
  wfsFeatureType?: string
}

export async function openDataset(
  url: string,
  typeHint?: SupportedType,
  options?: OpenDatasetOptions,
  cacheActive?: boolean
): Promise<BaseReader> {
  const fileType = await inferDatasetType(url, typeHint)
  let reader:
    | CsvReader
    | JsonReader
    | GeojsonReader
    | ExcelReader
    | GmlReader
    | WfsReader
  try {
    switch (fileType) {
      case 'csv':
        reader = new CsvReader(url)
        break
      case 'json':
        reader = new JsonReader(url)
        break
      case 'geojson':
        reader = new GeojsonReader(url)
        break
      case 'excel':
        reader = new ExcelReader(url)
        break
      case 'gml':
        reader = new GmlReader(url)
        break
      case 'wfs':
        reader = await WfsReader.createReader(url, options.wfsFeatureType)
        break
    }
    reader.setCacheActive(cacheActive)
    reader.load()
    return reader
  } catch (e: unknown) {
    // WfsReader may already raise a FetchError
    if (e instanceof FetchError) throw e
    else throw FetchError.parsingFailed((e as Error).message)
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
export async function readDataset(
  url: string,
  typeHint?: SupportedType,
  options?: OpenDatasetOptions,
  cacheActive = true
): Promise<DataItem[]> {
  const reader = await openDataset(url, typeHint, options, cacheActive)
  try {
    return await reader.read()
  } catch (e: unknown) {
    throw FetchError.parsingFailed((e as Error).message)
  }
}

/**
 * This fetches only the header of the dataset at the given URL, giving info on size, mime-type and last update if available.
 */
export function readDatasetHeaders(url: string): Promise<DatasetHeaders> {
  return fetch(url).then((response) => parseHeaders(response.headers))
}
