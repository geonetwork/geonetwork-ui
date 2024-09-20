import {
  CatalogRecord,
  CatalogRecordKeys,
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { XmlElement } from '@rgrove/parse-xml'
import { BaseConverter } from '../base.converter'
import { isEqual } from '../convert-utils'
import {
  createDocument,
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import {
  readAbstract,
  readContacts,
  readContactsForResource,
  readIsoTopics,
  readKeywords,
  readKind,
  readLegalConstraints,
  readLicenses,
  readLineage,
  readOnlineResources,
  readOtherConstraints,
  readOverviews,
  readOwnerOrganization,
  readRecordUpdated,
  readResourceCreated,
  readResourcePublished,
  readResourceUpdated,
  readSecurityConstraints,
  readSpatialExtents,
  readSpatialRepresentation,
  readStatus,
  readTemporalExtents,
  readTitle,
  readUniqueIdentifier,
  readUpdateFrequency,
} from './read-parts'
import {
  writeAbstract,
  writeContacts,
  writeContactsForResource,
  writeGraphicOverviews,
  writeKeywords,
  writeKind,
  writeLegalConstraints,
  writeLicenses,
  writeLineage,
  writeOnlineResources,
  writeOtherConstraints,
  writeRecordUpdated,
  writeResourceCreated,
  writeResourcePublished,
  writeResourceUpdated,
  writeSecurityConstraints,
  writeSpatialExtents,
  writeSpatialRepresentation,
  writeStatus,
  writeTemporalExtents,
  writeTitle,
  writeTopics,
  writeUniqueIdentifier,
  writeUpdateFrequency,
} from './write-parts'

export class Iso19139Converter extends BaseConverter<string> {
  protected readers: Record<
    CatalogRecordKeys,
    (rootEl: XmlElement) => unknown
  > = {
    uniqueIdentifier: readUniqueIdentifier,
    kind: readKind,
    ownerOrganization: readOwnerOrganization,
    recordUpdated: readRecordUpdated,
    recordCreated: () => undefined, // not supported in ISO19139
    recordPublished: () => undefined, // not supported in ISO19139
    resourceUpdated: readResourceUpdated,
    resourceCreated: readResourceCreated,
    resourcePublished: readResourcePublished,
    title: readTitle,
    abstract: readAbstract,
    contacts: readContacts,
    contactsForResource: readContactsForResource,
    keywords: readKeywords,
    topics: readIsoTopics,
    licenses: readLicenses,
    legalConstraints: readLegalConstraints,
    securityConstraints: readSecurityConstraints,
    otherConstraints: readOtherConstraints,
    status: readStatus,
    updateFrequency: readUpdateFrequency,
    spatialRepresentation: readSpatialRepresentation,
    overviews: readOverviews,
    lineage: readLineage,
    onlineResources: readOnlineResources,
    temporalExtents: readTemporalExtents,
    spatialExtents: readSpatialExtents,
    // TODO
    extras: () => undefined,
    landingPage: () => undefined,
    otherLanguages: () => [],
    defaultLanguage: () => undefined,
    translations: () => undefined,
  }

  protected writers: Record<
    CatalogRecordKeys,
    (record: CatalogRecord, rootEl: XmlElement) => void
  > = {
    uniqueIdentifier: writeUniqueIdentifier,
    kind: writeKind,
    ownerOrganization: () => undefined, // fixme: find a way to store this value properly
    recordUpdated: writeRecordUpdated,
    recordCreated: () => undefined, // not supported in ISO19139
    recordPublished: () => undefined, // not supported in ISO19139
    resourceUpdated: writeResourceUpdated,
    resourceCreated: writeResourceCreated,
    resourcePublished: writeResourcePublished,
    title: writeTitle,
    abstract: writeAbstract,
    contacts: writeContacts,
    contactsForResource: writeContactsForResource,
    keywords: writeKeywords,
    topics: writeTopics,
    licenses: writeLicenses,
    legalConstraints: writeLegalConstraints,
    securityConstraints: writeSecurityConstraints,
    otherConstraints: writeOtherConstraints,
    status: writeStatus,
    updateFrequency: writeUpdateFrequency,
    spatialRepresentation: writeSpatialRepresentation,
    overviews: writeGraphicOverviews,
    lineage: writeLineage,
    onlineResources: writeOnlineResources,
    temporalExtents: writeTemporalExtents,
    spatialExtents: writeSpatialExtents,
    // TODO
    extras: () => undefined,
    landingPage: () => undefined,
    otherLanguages: () => undefined,
    defaultLanguage: () => undefined,
    translations: () => undefined,
  }

  protected beforeDocumentCreation(rootElement: XmlElement) {
    // to override
  }

  async readRecord(document: string): Promise<CatalogRecord> {
    const doc = parseXmlString(document)
    const rootEl = getRootElement(doc)

    const uniqueIdentifier = this.readers['uniqueIdentifier'](rootEl)
    const kind = this.readers['kind'](rootEl)
    const ownerOrganization = this.readers['ownerOrganization'](rootEl)
    const title = this.readers['title'](rootEl)
    const abstract = this.readers['abstract'](rootEl)
    const contacts = this.readers['contacts'](rootEl)
    const contactsForResource = this.readers['contactsForResource'](rootEl)
    const recordUpdated = this.readers['recordUpdated'](rootEl)
    const recordCreated = this.readers['recordCreated'](rootEl)
    const recordPublished = this.readers['recordPublished'](rootEl)
    const resourceCreated = this.readers['resourceCreated'](rootEl)
    const resourceUpdated = this.readers['resourceUpdated'](rootEl)
    const resourcePublished = this.readers['resourcePublished'](rootEl)
    const keywords = this.readers['keywords'](rootEl)
    const topics = this.readers['topics'](rootEl)
    const legalConstraints = this.readers['legalConstraints'](rootEl)
    const otherConstraints = this.readers['otherConstraints'](rootEl)
    const securityConstraints = this.readers['securityConstraints'](rootEl)
    const licenses = this.readers['licenses'](rootEl)
    const overviews = this.readers['overviews'](rootEl)
    const landingPage = this.readers['landingPage'](rootEl)
    const onlineResources = this.readers['onlineResources'](rootEl)
    const otherLanguages = this.readers['otherLanguages'](rootEl)
    const defaultLanguage = this.readers['defaultLanguage'](rootEl)

    if (kind === 'dataset') {
      const status = this.readers['status'](rootEl)
      const spatialRepresentation =
        this.readers['spatialRepresentation'](rootEl)
      const spatialExtents = this.readers['spatialExtents'](rootEl)
      const temporalExtents = this.readers['temporalExtents'](rootEl)
      const lineage = this.readers['lineage'](rootEl)
      const updateFrequency = this.readers['updateFrequency'](rootEl)

      return {
        uniqueIdentifier,
        kind,
        otherLanguages,
        defaultLanguage,
        ...(recordCreated && { recordCreated }),
        ...(recordPublished && { recordPublished }),
        recordUpdated,
        ...(resourceCreated && { resourceCreated }),
        ...(resourceUpdated && { resourceUpdated }),
        ...(resourcePublished && { resourcePublished }),
        status,
        title,
        abstract,
        ownerOrganization,
        contacts,
        contactsForResource,
        keywords,
        topics,
        licenses,
        legalConstraints,
        securityConstraints,
        otherConstraints,
        lineage,
        ...(spatialRepresentation && { spatialRepresentation }),
        overviews,
        spatialExtents,
        temporalExtents,
        onlineResources,
        updateFrequency,
        ...(landingPage && { landingPage }),
      } as DatasetRecord
    } else {
      return {
        uniqueIdentifier,
        kind,
        otherLanguages,
        defaultLanguage,
        ...(recordCreated && { recordCreated }),
        ...(recordPublished && { recordPublished }),
        recordUpdated,
        ...(resourceCreated && { resourceCreated }),
        ...(resourceUpdated && { resourceUpdated }),
        ...(resourcePublished && { resourcePublished }),
        title,
        abstract,
        ownerOrganization,
        contacts,
        contactsForResource,
        keywords,
        topics,
        licenses,
        legalConstraints,
        securityConstraints,
        otherConstraints,
        overviews,
        onlineResources,
        ...(landingPage && { landingPage }),
      } as ServiceRecord
    }
  }

  async writeRecord(
    record: CatalogRecord,
    reference?: string
  ): Promise<string> {
    let rootEl: XmlElement
    let fieldChanged: (name: string) => boolean
    if (reference) {
      const originalDoc = parseXmlString(reference)
      const originalRecord = await this.readRecord(reference)
      rootEl = getRootElement(originalDoc)

      fieldChanged = (name: string) => {
        return originalRecord !== null
          ? !isEqual(record[name], originalRecord[name])
          : true
      }
    } else {
      rootEl = createElement('gmd:MD_Metadata')()
      fieldChanged = () => true
    }

    fieldChanged('uniqueIdentifier') &&
      this.writers['uniqueIdentifier'](record, rootEl)
    fieldChanged('kind') && this.writers['kind'](record, rootEl)

    fieldChanged('contacts') && this.writers['contacts'](record, rootEl)
    fieldChanged('ownerOrganization') &&
      this.writers['ownerOrganization'](record, rootEl)

    fieldChanged('recordUpdated') &&
      this.writers['recordUpdated'](record, rootEl)
    fieldChanged('recordCreated') &&
      this.writers['recordCreated'](record, rootEl)
    fieldChanged('recordPublished') &&
      this.writers['recordPublished'](record, rootEl)

    fieldChanged('title') && this.writers['title'](record, rootEl)
    fieldChanged('abstract') && this.writers['abstract'](record, rootEl)

    fieldChanged('resourceCreated') &&
      this.writers['resourceCreated'](record, rootEl)
    fieldChanged('resourcePublished') &&
      this.writers['resourcePublished'](record, rootEl)
    fieldChanged('resourceUpdated') &&
      this.writers['resourceUpdated'](record, rootEl)

    fieldChanged('contactsForResource') &&
      this.writers['contactsForResource'](record, rootEl)

    fieldChanged('keywords') && this.writers['keywords'](record, rootEl)
    fieldChanged('topics') && this.writers['topics'](record, rootEl)
    fieldChanged('legalConstraints') &&
      this.writers['legalConstraints'](record, rootEl)
    fieldChanged('securityConstraints') &&
      this.writers['securityConstraints'](record, rootEl)
    fieldChanged('licenses') && this.writers['licenses'](record, rootEl)
    fieldChanged('otherConstraints') &&
      this.writers['otherConstraints'](record, rootEl)
    fieldChanged('onlineResources') &&
      this.writers['onlineResources'](record, rootEl)

    if (record.kind === 'dataset') {
      fieldChanged('status') && this.writers['status'](record, rootEl)
      fieldChanged('updateFrequency') &&
        this.writers['updateFrequency'](record, rootEl)
      fieldChanged('spatialRepresentation') &&
        this.writers['spatialRepresentation'](record, rootEl)
      fieldChanged('overviews') && this.writers['overviews'](record, rootEl)
      fieldChanged('temporalExtents') &&
        this.writers['temporalExtents'](record, rootEl)
      fieldChanged('spatialExtents') &&
        this.writers['spatialExtents'](record, rootEl)
      fieldChanged('lineage') && this.writers['lineage'](record, rootEl)
    }

    this.beforeDocumentCreation(rootEl)

    const newDocument = createDocument(rootEl)
    return xmlToString(newDocument)
  }
}
