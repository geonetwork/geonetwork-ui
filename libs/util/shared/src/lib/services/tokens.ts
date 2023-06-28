import { InjectionToken } from '@angular/core'

export interface IRightClickToken {
  organisationUrl: string
  datasetUrl: string
}

export const RIGHT_CLICK_TOKEN = new InjectionToken<IRightClickToken>(
  'right-click-token'
)
