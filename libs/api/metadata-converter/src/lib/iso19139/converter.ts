import {
  CatalogRecord,
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/record'
import {
  createDocument,
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import {
  writeAbstract,
  writeAccessConstraints,
  writeContacts,
  writeDatasetCreated,
  writeDatasetUpdated,
  writeDistributions,
  writeGraphicOverviews,
  writeKeywords,
  writeKind,
  writeLicenses,
  writeLineage,
  writeOnlineResources,
  writeOwnerOrganization,
  writeRecordUpdated,
  writeSpatialRepresentation,
  writeStatus,
  writeThemes,
  writeTitle,
  writeUniqueIdentifier,
  writeUpdateFrequency,
  writeUseLimitations,
} from './write-parts'
import {
  readAbstract,
  readAccessConstraints,
  readContacts,
  readDatasetCreated,
  readDatasetUpdated,
  readDistributions,
  readIsoTopics,
  readKeywords,
  readKind,
  readLicenses,
  readLineage,
  readOnlineResources,
  readOverviews,
  readOwnerOrganization,
  readRecordUpdated,
  readSpatialExtents,
  readSpatialRepresentation,
  readStatus,
  readTemporalExtents,
  readThemes,
  readTitle,
  readUniqueIdentifier,
  readUpdateFrequency,
  readUseLimitations,
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
  const keywords = readKeywords(rootEl)
  const themes = readThemes(rootEl)
  const accessConstraints = readAccessConstraints(rootEl)
  const useLimitations = readUseLimitations(rootEl)
  const licenses = readLicenses(rootEl)
  const overviews = readOverviews(rootEl)

  // not used yet
  const isoTopics = readIsoTopics(rootEl)

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
      recordCreated,
      recordUpdated,
      status,
      title,
      abstract,
      ownerOrganization,
      contacts,
      contactsForResource: [], // FIXME: is that really useful??
      keywords,
      themes,
      accessConstraints,
      useLimitations,
      licenses,
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
      recordCreated,
      recordUpdated,
      title,
      abstract,
      ownerOrganization,
      contacts,
      keywords,
      themes,
      accessConstraints,
      useLimitations,
      licenses,
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
  fieldChanged('themes') && writeThemes(record, rootEl)
  fieldChanged('accessConstraints') && writeAccessConstraints(record, rootEl)
  fieldChanged('licenses') && writeLicenses(record, rootEl)
  fieldChanged('useLimitations') && writeUseLimitations(record, rootEl)

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
