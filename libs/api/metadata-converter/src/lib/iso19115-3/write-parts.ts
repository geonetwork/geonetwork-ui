import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { findChildOrCreate, XmlElement } from '../xml-utils'
import { pipe } from '../function-utils'
import { writeCharacterString } from '../iso19139/write-parts'

export function writeUniqueIdentifier(
  record: CatalogRecord,
  rootEl: XmlElement
) {
  pipe(
    findChildOrCreate('mdb:metadataIdentifier'),
    findChildOrCreate('mcc:MD_Identifier'),
    findChildOrCreate('mcc:code'),
    writeCharacterString(record.uniqueIdentifier)
  )(rootEl)
}
