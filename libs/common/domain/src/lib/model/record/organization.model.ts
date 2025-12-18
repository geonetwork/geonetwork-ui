import { OrganizationTranslations } from './translation.model.js'

export interface Organization {
  name: string
  email?: string
  description?: string
  website?: URL
  logoUrl?: URL
  recordCount?: number

  translations?: OrganizationTranslations
}
