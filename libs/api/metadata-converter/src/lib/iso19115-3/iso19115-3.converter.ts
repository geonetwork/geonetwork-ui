import { Iso19139Converter } from '../iso19139'
import {
  readContacts,
  readKind,
  readLandingPage,
  readLineage,
  readOwnerOrganization,
  readResourceContacts,
  readUniqueIdentifier,
} from './read-parts'
import { writeUniqueIdentifier } from './write-parts'

export class Iso191153Converter extends Iso19139Converter {
  constructor() {
    super()

    this.readers['uniqueIdentifier'] = readUniqueIdentifier
    this.readers['kind'] = readKind
    this.readers['contacts'] = readContacts
    this.readers['contactsForResource'] = readResourceContacts
    this.readers['ownerOrganization'] = readOwnerOrganization
    this.readers['landingPage'] = readLandingPage
    this.readers['lineage'] = readLineage

    this.writers['uniqueIdentifier'] = writeUniqueIdentifier
  }
}
