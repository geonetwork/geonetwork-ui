import { Iso19139Converter } from '../iso19139'
import {
  readContacts,
  readDistributions,
  readKind,
  readLandingPage,
  readLineage,
  readOwnerOrganization,
  readRecordCreated,
  readRecordPublished,
  readRecordUpdated,
  readResourceContacts,
  readUniqueIdentifier,
} from './read-parts'
import { writeUniqueIdentifier } from './write-parts'

export class Iso191153Converter extends Iso19139Converter {
  constructor() {
    super()

    this.readers['uniqueIdentifier'] = readUniqueIdentifier
    this.readers['kind'] = readKind
    this.readers['recordUpdated'] = readRecordUpdated
    this.readers['recordCreated'] = readRecordCreated
    this.readers['recordPublished'] = readRecordPublished
    this.readers['contacts'] = readContacts
    this.readers['contactsForResource'] = readResourceContacts
    this.readers['ownerOrganization'] = readOwnerOrganization
    this.readers['landingPage'] = readLandingPage
    this.readers['lineage'] = readLineage
    this.readers['distributions'] = readDistributions

    this.writers['uniqueIdentifier'] = writeUniqueIdentifier
  }
}
