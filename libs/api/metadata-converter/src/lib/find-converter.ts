import { Iso19139Converter } from './iso19139'
import { BaseConverter } from './base.converter'
import { Iso191153Converter } from './iso19115-3'
import { DcatApConverter } from './dcat-ap'

export function findConverterForDocument(
  document: string
): BaseConverter<string> {
  if (document.indexOf('mdb:MD_Metadata') > 0) {
    return new Iso191153Converter()
  } else if (document.indexOf('gmd:MD_Metadata') > 0) {
    return new Iso19139Converter()
  } else if (
    /@prefix\s*[a-z]+\s*:\s*<http:\/\/www\.w3\.org\/ns\/dcat#>\s*\./.test(
      document
    )
  ) {
    return new DcatApConverter('text/turtle')
  } else if (/xmlns:[a-z]+="http:\/\/www\.w3\.org\/ns\/dcat#"/.test(document)) {
    return new DcatApConverter('application/rdf+xml')
  } else if (
    /"[a-zA-Z]+"\s*:\s*"http:\/\/www\.w3\.org\/ns\/dcat#/.test(document)
  ) {
    return new DcatApConverter('application/ld+json')
  } else {
    throw new Error(`No suitable converter found for the following document:
${document.substring(0, 400)}...`)
  }
}
