import {
  BaseConverter,
  DcatApConverter,
  Iso191153Converter,
  Iso19139Converter,
} from '@geonetwork-ui/api/metadata-converter'

export const FORMATS = {
  'ISO 19139': Iso19139Converter,
  'ISO 19115-3': Iso191153Converter,
  'DCAT-AP': DcatApConverter,
}

export function getFormatName(converter: BaseConverter<string>): string {
  return Object.keys(FORMATS).reduce((prev, key) =>
    converter instanceof FORMATS[key] ? key : prev
  )
}
