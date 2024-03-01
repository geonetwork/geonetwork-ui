import { InjectionToken } from '@angular/core'

// expects the replacement key ${uuid}
export const RECORD_URL_TOKEN = new InjectionToken<string>('record-url-token')
