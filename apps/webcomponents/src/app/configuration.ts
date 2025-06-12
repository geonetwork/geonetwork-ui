import { Configuration } from '@geonetwork-ui/data-access/gn4'

export type TextLanguage = 'browser' | string // can be a hardcoded language code
export type MetadataLanguage = 'current' | null | string // can be a hardcoded language code

export interface StandaloneConfiguration {
  apiUrl?: string
  textLanguage?: TextLanguage
  metadataLanguage?: MetadataLanguage
}

export const standaloneConfigurationObject = {
  apiConfiguration: new Configuration(),
  textLanguage: 'browser',
  metadataLanguage: null,
}
