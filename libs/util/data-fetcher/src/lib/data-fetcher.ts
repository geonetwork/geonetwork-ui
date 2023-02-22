import { parseHeaders } from './headers'
import { CsvDataset } from '../parsers/csv'
import { JsonDataset } from '../parsers/json'
import { GeojsonDataset } from '../parsers/geojson'
import { ExcelDataset } from '../parsers/excel'
import { DataItem, DatasetHeaders, FetchError, SupportedType } from './model'
import { inferDatasetType } from './utils'
import { BaseDataset } from '../parsers/base'

export async function openDataset(
  url: string,
  typeHint?: SupportedType
): Promise<BaseDataset> {
  const fileType = await inferDatasetType(url, typeHint)
  let dataset: BaseDataset
  try {
    switch (fileType) {
      case 'csv':
        dataset = new CsvDataset(url)
        break
      case 'json':
        dataset = new JsonDataset(url)
        break
      case 'geojson':
        dataset = new GeojsonDataset(url)
        break
      case 'excel':
        dataset = new ExcelDataset(url)
        break
    }
    dataset.load()
    return dataset
  } catch (e: any) {
    throw FetchError.parsingFailed(e.message)
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
  typeHint?: SupportedType
): Promise<DataItem[]> {
  const dataset = await openDataset(url, typeHint)
  try {
    return await dataset.read()
  } catch (e: any) {
    throw FetchError.parsingFailed(e.message)
  }
}

/**
 * This fetches only the header of the dataset at the given URL, giving info on size, mime-type and last update if available.
 */
export function readDatasetHeaders(url: string): Promise<DatasetHeaders> {
  return fetch(url).then((response) => parseHeaders(response.headers))
}
