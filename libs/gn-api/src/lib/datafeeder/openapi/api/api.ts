export * from './config.api.service'
import { ConfigApiService } from './config.api.service'
export * from './dataPublishing.api.service'
import { DataPublishingApiService } from './dataPublishing.api.service'
export * from './fileUpload.api.service'
import { FileUploadApiService } from './fileUpload.api.service'
export const APIS = [
  ConfigApiService,
  DataPublishingApiService,
  FileUploadApiService,
]
