export * from './capabilities.api.service'
import { CapabilitiesApiService } from './capabilities.api.service'
export * from './data.api.service'
import { DataApiService } from './data.api.service'
export * from './openSearchDescriptionDocument.api.service'
import { OpenSearchDescriptionDocumentApiService } from './openSearchDescriptionDocument.api.service'
export * from './sortables.api.service'
import { SortablesApiService } from './sortables.api.service'
export const APIS = [
  CapabilitiesApiService,
  DataApiService,
  OpenSearchDescriptionDocumentApiService,
  SortablesApiService,
]
