import { OrganizationTranslations } from './translation.model'

export interface Organization {
  name: string
  email?: string
  description?: string
  website?: URL
  logoUrl?: URL
  recordCount?: number

  translations?: OrganizationTranslations
}
