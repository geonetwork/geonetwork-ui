export * from './organizations-from-metadata.service'
export * from './organizations-from-groups.service'

import { InjectionToken } from '@angular/core'

export type OrganizationsStrategy = 'metadata' | 'groups'

export const ORGANIZATIONS_STRATEGY = new InjectionToken<OrganizationsStrategy>(
  'organizations-strategy',
  {
    factory: () => 'metadata',
  }
)
