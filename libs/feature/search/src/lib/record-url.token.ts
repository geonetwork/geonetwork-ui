import { InjectionToken } from '@angular/core'

// expects the replacement key ${uuid}
export const RECORD_DATASET_URL_TOKEN = new InjectionToken<string>(
  'record-dataset-url-token'
)
export const RECORD_SERVICE_URL_TOKEN = new InjectionToken<string>(
  'record-service-url-token'
)

export const RECORD_REUSE_URL_TOKEN = new InjectionToken<string>(
  'record-reuse-url-token'
)
