import { Iso19139Converter } from './iso19139'
import { BaseConverter } from './base.converter'
import { Iso191153Converter } from './iso19115-3'

export function findConverterForDocument(
  document: string
): BaseConverter<string> {
  if (document.indexOf('mdb:MD_Metadata') > 0) {
    return new Iso191153Converter()
  } else if (document.indexOf('gmd:MD_Metadata') > 0) {
    return new Iso19139Converter()
  } else {
    throw new Error(`No suitable converter found for the following document:
${document.substring(0, 400)}...`)
  }
}
