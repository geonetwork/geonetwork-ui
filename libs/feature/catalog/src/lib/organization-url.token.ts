import { InjectionToken } from '@angular/core'

// expects the replacement key ${name}
export const ORGANIZATION_PAGE_URL_TOKEN = new InjectionToken<string>(
  'organization-page-url-token'
)
