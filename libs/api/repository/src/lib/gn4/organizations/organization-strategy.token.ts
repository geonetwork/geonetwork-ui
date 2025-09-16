import { InjectionToken } from '@angular/core'

export type OrganizationsStrategy = 'metadata' | 'groups'

export const ORGANIZATIONS_STRATEGY = new InjectionToken<OrganizationsStrategy>(
  'organizations-strategy',
  {
    factory: () => 'metadata',
  }
)
