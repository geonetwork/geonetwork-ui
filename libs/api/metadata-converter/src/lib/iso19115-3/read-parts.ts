import { findNestedElement, XmlElement } from '../xml-utils'
import { pipe } from '../function-utils'
import { extractCharacterString } from '../iso19139/read-parts'

export function readUniqueIdentifier(rootEl: XmlElement): string {
  return pipe(
    findNestedElement(
      'mdb:metadataIdentifier',
      'mcc:MD_Identifier',
      'mcc:code'
    ),
    extractCharacterString()
  )(rootEl)
}
