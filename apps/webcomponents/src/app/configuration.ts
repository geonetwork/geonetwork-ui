import { Configuration } from '@geonetwork-ui/data-access/gn4'

export type TextLanguage = 'browser' | string // can be a hardcoded language code
export type MetadataLanguage = 'current' | null | string // can be a hardcoded language code

export interface StandaloneConfiguration {
  apiUrl?: string
  proxyPath?: string
  textLanguage?: TextLanguage
  metadataLanguage?: MetadataLanguage
}

export const standaloneConfigurationObject = {
  apiConfiguration: new Configuration(),
  proxyPath: null,
  proxyPathFactory: () => standaloneConfigurationObject.proxyPath,
  textLanguage: 'browser',
  metadataLanguage: null,
  metadataLanguageFactory: () => standaloneConfigurationObject.metadataLanguage,
}
