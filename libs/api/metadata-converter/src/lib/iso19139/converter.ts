import {
  CatalogRecord,
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import {
  createDocument,
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import {
  writeAbstract,
  writeContacts,
  writeDatasetCreated,
  writeDatasetUpdated,
  writeDistributions,
  writeGraphicOverviews,
  writeKeywords,
  writeKind,
  writeLegalConstraints,
  writeLicenses,
  writeLineage,
  writeOnlineResources,
  writeOtherConstraints,
  writeOwnerOrganization,
  writeRecordUpdated,
  writeSecurityConstraints,
  writeSpatialRepresentation,
  writeStatus,
  writeTopics,
  writeTitle,
  writeUniqueIdentifier,
  writeUpdateFrequency,
} from './write-parts'
import {
  readAbstract,
  readContacts,
  readDatasetCreated,
  readDatasetUpdated,
  readDistributions,
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
  readRecordPublished,
  readSecurityConstraints,
  readSpatialExtents,
  readSpatialRepresentation,
  readStatus,
  readTemporalExtents,
  readTitle,
  readUniqueIdentifier,
  readUpdateFrequency,
} from './read-parts'
import { isEqual } from '../convert-utils'

export function toModel(xml: string): CatalogRecord {
  const doc = parseXmlString(xml)
  const rootEl = getRootElement(doc)

  const uniqueIdentifier = readUniqueIdentifier(rootEl)
  const kind = readKind(rootEl)
  const ownerOrganization = readOwnerOrganization(rootEl)
  const title = readTitle(rootEl)
  const abstract = readAbstract(rootEl)
  const contacts = readContacts(rootEl)
  const recordUpdated = readRecordUpdated(rootEl)
  const recordCreated = recordUpdated
  const recordPublished = readRecordPublished(rootEl)
  const keywords = readKeywords(rootEl)
  const topics = readIsoTopics(rootEl)
  const legalConstraints = readLegalConstraints(rootEl)
  const otherConstraints = readOtherConstraints(rootEl)
  const securityConstraints = readSecurityConstraints(rootEl)
  const licenses = readLicenses(rootEl)
  const overviews = readOverviews(rootEl)

  if (kind === 'dataset') {
    const status = readStatus(rootEl)
    const datasetCreated = readDatasetCreated(rootEl)
    const datasetUpdated = readDatasetUpdated(rootEl)
    const spatialRepresentation = readSpatialRepresentation(rootEl)
    const spatialExtents = readSpatialExtents(rootEl)
    const temporalExtents = readTemporalExtents(rootEl)
    const lineage = readLineage(rootEl)
    const distributions = readDistributions(rootEl)
    const updateFrequency = readUpdateFrequency(rootEl)

    return {
      uniqueIdentifier,
      kind,
      languages: [],
      recordCreated,
      recordUpdated,
      recordPublished,
      status,
      title,
      abstract,
      ownerOrganization,
      contacts,
      contactsForResource: [], // FIXME: is that really useful??
      keywords,
      topics,
      licenses,
      legalConstraints,
      securityConstraints,
      otherConstraints,
      ...(datasetCreated && { datasetCreated }),
      ...(datasetUpdated && { datasetUpdated }),
      lineage,
      ...(spatialRepresentation && { spatialRepresentation }),
      overviews,
      spatialExtents,
      temporalExtents,
      distributions,
      updateFrequency,
    } as DatasetRecord
  } else {
    const onlineResources = readOnlineResources(rootEl)
    return {
      uniqueIdentifier,
      kind,
      languages: [],
      recordCreated,
      recordUpdated,
      recordPublished,
      title,
      abstract,
      ownerOrganization,
      contacts,
      keywords,
      topics,
      licenses,
      legalConstraints,
      securityConstraints,
      otherConstraints,
      overviews,
      onlineResources,
    } as ServiceRecord
  }
}

export function toXml(record: CatalogRecord, originalXml?: string): string {
  const originalDoc = originalXml ? parseXmlString(originalXml) : null
  const originalRecord = originalXml ? toModel(originalXml) : null
  const rootEl = originalDoc
    ? getRootElement(originalDoc)
    : createElement('gmd:MD_Metadata')()

  function fieldChanged(name: string) {
    return originalRecord !== null
      ? !isEqual(record[name], originalRecord[name])
      : true
  }

  writeUniqueIdentifier(record, rootEl)
  writeKind(record, rootEl)
  fieldChanged('ownerOrganization') && writeOwnerOrganization(record, rootEl)
  fieldChanged('recordUpdated') && writeRecordUpdated(record, rootEl)
  writeTitle(record, rootEl)
  writeAbstract(record, rootEl)
  fieldChanged('contacts') && writeContacts(record, rootEl)
  fieldChanged('keywords') && writeKeywords(record, rootEl)
  fieldChanged('topics') && writeTopics(record, rootEl)
  fieldChanged('legalConstraints') && writeLegalConstraints(record, rootEl)
  fieldChanged('securityConstraints') &&
    writeSecurityConstraints(record, rootEl)
  fieldChanged('licenses') && writeLicenses(record, rootEl)
  fieldChanged('otherConstraints') && writeOtherConstraints(record, rootEl)

  if (record.kind === 'dataset') {
    writeStatus(record, rootEl)
    fieldChanged('updateFrequency') && writeUpdateFrequency(record, rootEl)
    fieldChanged('datasetCreated') && writeDatasetCreated(record, rootEl)
    fieldChanged('datasetUpdated') && writeDatasetUpdated(record, rootEl)
    fieldChanged('spatialRepresentation') &&
      writeSpatialRepresentation(record, rootEl)
    fieldChanged('overviews') && writeGraphicOverviews(record, rootEl)
    fieldChanged('distributions') && writeDistributions(record, rootEl)
    writeLineage(record, rootEl)
  } else {
    fieldChanged('onlineResources') && writeOnlineResources(record, rootEl)
  }

  const newDocument = createDocument(rootEl)
  return xmlToString(newDocument)
}
