import type { Feature } from 'geojson'
import { SupportedType } from '../mime/types'

export type DataItem = Feature
export interface DatasetHeaders {
  mimeType?: string
  supportedType?: SupportedType
  fileSizeBytes?: number
  lastUpdate?: Date
}

class FetchError {
  constructor(
    public message,
    public httpStatus = 0,
    public isCrossOriginRelated = false
  ) {}
}

/**
 * This fetches the full dataset at the given URL and parses it according to its mime type.
 * All items in the dataset are converted to GeoJSON features, even if they do not bear any spatial geometry.
 */
export function readDataset(url: string): Promise<DataItem[] | FetchError> {
  throw new Error('Not Implemented')
}

/**
 * This fetches only the header of the dataset at the given URL, giving info on size, mime-type and last update if available.
 */
export function readDatasetHeaders(
  url: string
): Promise<DatasetHeaders | FetchError> {
  throw new Error('Not Implemented')
}
