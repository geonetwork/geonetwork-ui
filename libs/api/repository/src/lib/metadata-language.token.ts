import { InjectionToken } from '@angular/core'
import { LanguageCode } from '@geonetwork-ui/common/domain/model/record'

export type LanguageCodeFactory = () => LanguageCode

export const METADATA_LANGUAGE = new InjectionToken<
  LanguageCode | LanguageCodeFactory
>('metadata-language')
