import {
  CatalogRecord,
  CatalogRecordKeys,
  DatasetRecord,
  LanguageCode,
  RecordTranslations,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { BaseConverter, MetadataMapperContext } from '../base.converter'
import { isEqual } from '../convert-utils'
import { isFieldTranslatable } from '../translate-utils'
import {
  readAbstract,
  readContacts,
  readContactsForResource,
  readDefaultLanguage,
  readKeywords,
  readLandingPage,
  readLicenses,
  readOnlineResources,
  readOwnerOrganization,
  readRecordCreated,
  readRecordUpdated,
  readResourceCreated,
  readResourceUpdated,
  readSpatialExtents,
  readTitle,
  readTopics,
  readUniqueIdentifier,
} from './read-parts'
import { writeAbstract, writeTitle, writeUniqueIdentifier } from './write-parts'
import { graph, NamedNode, Statement, Store, sym } from 'rdflib'
import { DCAT, RDF } from './namespaces'
import { BASE_URI } from './utils/uri'
import type { ContentType } from 'rdflib/lib/types'
import { loadGraph } from './utils/graph-utils'
import { exportGraphToXml } from './utils/serialize-to-xml'

export class DcatApConverter extends BaseConverter<string> {
  protected readers: Record<
    CatalogRecordKeys,
    (
      dataStore: Store,
      catalogRecord: NamedNode,
      translations: RecordTranslations,
      defaultLanguage: LanguageCode
    ) => unknown
  > = {
    uniqueIdentifier: readUniqueIdentifier,
    title: readTitle,
    abstract: readAbstract,
    contacts: readContacts,
    contactsForResource: readContactsForResource,
    landingPage: readLandingPage,
    onlineResources: readOnlineResources,
    spatialExtents: readSpatialExtents,
    keywords: readKeywords,
    topics: readTopics,
    resourceIdentifier: () => undefined,
    recordUpdated: readRecordUpdated,
    recordCreated: readRecordCreated,
    resourceUpdated: readResourceUpdated,
    resourceCreated: readResourceCreated,
    ownerOrganization: readOwnerOrganization,
    licenses: readLicenses,
    defaultLanguage: readDefaultLanguage,
    otherLanguages: () => [], // languages will be inferred from found translations
    // TODO
    kind: () => 'dataset',
    recordPublished: () => undefined,
    resourcePublished: () => undefined,
    reuseType: () => undefined,
    legalConstraints: () => [],
    securityConstraints: () => [],
    otherConstraints: () => [],
    status: () => 'completed',
    updateFrequency: () => 'unknown',
    overviews: () => [],
    lineage: () => '',
    temporalExtents: () => [],
    spatialRepresentation: () => undefined,
    extras: () => undefined,
    translations: () => undefined,
  }

  protected writers: Record<
    CatalogRecordKeys,
    (record: CatalogRecord, dataStore: Store, catalogRecord: NamedNode) => void
  > = {
    uniqueIdentifier: writeUniqueIdentifier,
    title: writeTitle,
    abstract: writeAbstract,
    // TODO
    kind: () => undefined,
    ownerOrganization: () => undefined,
    recordUpdated: () => undefined,
    recordCreated: () => undefined,
    recordPublished: () => undefined,
    resourceIdentifier: () => undefined,
    resourceUpdated: () => undefined,
    resourceCreated: () => undefined,
    resourcePublished: () => undefined,
    reuseType: () => undefined,
    contacts: () => undefined,
    contactsForResource: () => undefined,
    keywords: () => undefined,
    topics: () => undefined,
    licenses: () => undefined,
    legalConstraints: () => undefined,
    securityConstraints: () => undefined,
    otherConstraints: () => undefined,
    status: () => undefined,
    updateFrequency: () => undefined,
    spatialRepresentation: () => undefined,
    overviews: () => undefined,
    lineage: () => undefined,
    onlineResources: () => undefined,
    temporalExtents: () => undefined,
    spatialExtents: () => undefined,
    extras: () => undefined,
    landingPage: () => undefined,
    defaultLanguage: () => undefined,
    otherLanguages: () => undefined,
    translations: () => undefined,
  }

  constructor(
    private contentType: ContentType = 'application/rdf+xml',
    ctx: MetadataMapperContext = new MetadataMapperContext()
  ) {
    super(ctx)
  }

  async readRecord(document: string): Promise<CatalogRecord> {
    const dataStore = graph()
    await loadGraph(dataStore, document, this.contentType)

    const catalogRecord = dataStore.the(
      null,
      null,
      DCAT('CatalogRecord')
    ) as NamedNode

    const tr: RecordTranslations = {}

    // we need the default language first for the other fields
    const defaultLanguage = this.readers['defaultLanguage'](
      dataStore,
      catalogRecord,
      tr,
      null
    ) as string
    const uniqueIdentifier = this.readers['uniqueIdentifier'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const kind = this.readers['kind'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const ownerOrganization = this.readers['ownerOrganization'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const title = this.readers['title'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const abstract = this.readers['abstract'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const contacts = this.readers['contacts'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const contactsForResource = this.readers['contactsForResource'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const recordUpdated = this.readers['recordUpdated'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const recordCreated = this.readers['recordCreated'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const recordPublished = this.readers['recordPublished'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const resourceCreated = this.readers['resourceCreated'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const resourceUpdated = this.readers['resourceUpdated'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const resourcePublished = this.readers['resourcePublished'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const keywords = this.readers['keywords'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const topics = this.readers['topics'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const legalConstraints = this.readers['legalConstraints'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const otherConstraints = this.readers['otherConstraints'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const securityConstraints = this.readers['securityConstraints'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const licenses = this.readers['licenses'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const overviews = this.readers['overviews'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const landingPage = this.readers['landingPage'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )
    const otherLanguages = this.readers['otherLanguages'](
      dataStore,
      catalogRecord,
      tr,
      defaultLanguage
    )

    if (kind === 'dataset') {
      const status = this.readers['status'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const spatialRepresentation = this.readers['spatialRepresentation'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const spatialExtents = this.readers['spatialExtents'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const temporalExtents = this.readers['temporalExtents'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const lineage = this.readers['lineage'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const onlineResources = this.readers['onlineResources'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      const updateFrequency = this.readers['updateFrequency'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )

      return {
        uniqueIdentifier,
        kind,
        defaultLanguage,
        otherLanguages,
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
        translations: tr,
      } as DatasetRecord
    } else {
      const onlineResources = this.readers['onlineResources'](
        dataStore,
        catalogRecord,
        tr,
        defaultLanguage
      )
      return {
        uniqueIdentifier,
        kind,
        defaultLanguage,
        otherLanguages,
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
        translations: tr,
      } as ServiceRecord
    }
  }

  async writeRecord(
    record: CatalogRecord,
    reference?: string
  ): Promise<string> {
    const dataStore = graph()
    let fieldChanged: (name: string) => boolean
    if (reference) {
      const originalRecord = await this.readRecord(reference)
      // eslint-disable-next-line prefer-const
      let languagesChanged: boolean
      await loadGraph(
        dataStore,
        reference,
        this.contentType,
        DCAT('CatalogRecord').value
      )

      fieldChanged = (name: string) => {
        return originalRecord !== null
          ? !isEqual(record[name], originalRecord[name]) ||
              (languagesChanged && isFieldTranslatable(name))
          : true
      }
      languagesChanged = fieldChanged('otherLanguages')
    } else {
      fieldChanged = () => true
    }

    let recordNode = dataStore.the(
      null,
      RDF('type'),
      DCAT('CatalogRecord')
    ) as NamedNode
    if (!recordNode) {
      const statement = dataStore.add(
        sym(`${BASE_URI}record/${record.uniqueIdentifier}`),
        RDF('type'),
        DCAT('CatalogRecord')
      ) as Statement
      recordNode = statement.subject as NamedNode
    }

    fieldChanged('uniqueIdentifier') &&
      this.writers['uniqueIdentifier'](record, dataStore, recordNode)
    fieldChanged('kind') && this.writers['kind'](record, dataStore, recordNode)
    fieldChanged('defaultLanguage') &&
      this.writers['defaultLanguage'](record, dataStore, recordNode)

    fieldChanged('contacts') &&
      this.writers['contacts'](record, dataStore, recordNode)
    fieldChanged('ownerOrganization') &&
      this.writers['ownerOrganization'](record, dataStore, recordNode)

    fieldChanged('recordUpdated') &&
      this.writers['recordUpdated'](record, dataStore, recordNode)
    fieldChanged('recordCreated') &&
      this.writers['recordCreated'](record, dataStore, recordNode)
    fieldChanged('recordPublished') &&
      this.writers['recordPublished'](record, dataStore, recordNode)

    fieldChanged('title') &&
      this.writers['title'](record, dataStore, recordNode)
    fieldChanged('abstract') &&
      this.writers['abstract'](record, dataStore, recordNode)

    fieldChanged('resourceCreated') &&
      this.writers['resourceCreated'](record, dataStore, recordNode)
    fieldChanged('resourcePublished') &&
      this.writers['resourcePublished'](record, dataStore, recordNode)
    fieldChanged('resourceUpdated') &&
      this.writers['resourceUpdated'](record, dataStore, recordNode)

    fieldChanged('contactsForResource') &&
      this.writers['contactsForResource'](record, dataStore, recordNode)

    fieldChanged('keywords') &&
      this.writers['keywords'](record, dataStore, recordNode)
    fieldChanged('topics') &&
      this.writers['topics'](record, dataStore, recordNode)
    fieldChanged('legalConstraints') &&
      this.writers['legalConstraints'](record, dataStore, recordNode)
    fieldChanged('securityConstraints') &&
      this.writers['securityConstraints'](record, dataStore, recordNode)
    fieldChanged('licenses') &&
      this.writers['licenses'](record, dataStore, recordNode)
    fieldChanged('otherConstraints') &&
      this.writers['otherConstraints'](record, dataStore, recordNode)
    fieldChanged('onlineResources') &&
      this.writers['onlineResources'](record, dataStore, recordNode)

    if (record.kind === 'dataset') {
      fieldChanged('status') &&
        this.writers['status'](record, dataStore, recordNode)
      fieldChanged('updateFrequency') &&
        this.writers['updateFrequency'](record, dataStore, recordNode)
      fieldChanged('spatialRepresentation') &&
        this.writers['spatialRepresentation'](record, dataStore, recordNode)
      fieldChanged('overviews') &&
        this.writers['overviews'](record, dataStore, recordNode)
      fieldChanged('temporalExtents') &&
        this.writers['temporalExtents'](record, dataStore, recordNode)
      fieldChanged('lineage') &&
        this.writers['lineage'](record, dataStore, recordNode)
    }
    fieldChanged('otherLanguages') &&
      this.writers['otherLanguages'](record, dataStore, recordNode)

    if (this.contentType.includes('xml')) {
      return exportGraphToXml(dataStore)
    }

    return dataStore.serialize(undefined, this.contentType, null, {})
  }
}
