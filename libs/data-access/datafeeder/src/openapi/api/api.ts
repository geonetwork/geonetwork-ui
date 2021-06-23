export * from './dataPublishing.api.service'
import { DataPublishingApiService } from './dataPublishing.api.service'
export * from './fileUpload.api.service'
import { FileUploadApiService } from './fileUpload.api.service'
export const APIS = [DataPublishingApiService, FileUploadApiService]
