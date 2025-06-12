import { NamedNode, Statement, Store } from 'rdflib'
import { DCAT, DCTERMS, FOAF, LOCN, RDF, SKOS, VCARD } from './namespaces'
import { readLocalizedValue } from './utils/graph-utils'
import {
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  DatasetSpatialExtent,
  Individual,
  Keyword,
  LanguageCode,
  OnlineLinkResource,
  OnlineResource,
  OnlineResourceTranslations,
  Organization,
  RecordTranslations,
} from '@geonetwork-ui/common/domain/model/record'
import { getAsValidUrl } from '../common/url'
import { fullNameToParts } from '../iso19139/utils/individual-name'
import { readLicenseFromString } from '../common/license'
import { matchProtocol } from '../common/distribution.mapper'
import { getLang2FromLang3 } from '@geonetwork-ui/util/i18n/language-codes'

function getDatasetNode(dataStore: Store, recordNode: NamedNode): NamedNode {
  return (dataStore.the(recordNode, FOAF('primaryTopic'), null) ||
    dataStore.the(null, RDF('type'), DCAT('Dataset'))) as NamedNode
}

function getCatalogNode(dataStore: Store, recordNode: NamedNode): NamedNode {
  return (dataStore.the(null, DCAT('record'), recordNode) ||
    dataStore.the(null, RDF('type'), DCAT('Catalog'))) as NamedNode
}

export function readUniqueIdentifier(
  dataStore: Store,
  recordNode: NamedNode
): string {
  return dataStore.the(recordNode, DCTERMS('identifier'), null)?.value
}

export function readTitle(
  dataStore: Store,
  recordNode: NamedNode,
  translations: RecordTranslations,
  defaultLanguage: LanguageCode
): string {
  const dataset = getDatasetNode(dataStore, recordNode)
  const [title] = readLocalizedValue<RecordTranslations>(
    dataStore,
    dataset,
    DCTERMS('title'),
    null,
    'title',
    translations,
    defaultLanguage
  )
  return title
}

export function readAbstract(
  dataStore: Store,
  recordNode: NamedNode,
  translations: RecordTranslations,
  defaultLanguage: LanguageCode
): string {
  const dataset = getDatasetNode(dataStore, recordNode)
  const [abstract] = readLocalizedValue<RecordTranslations>(
    dataStore,
    dataset,
    DCTERMS('description'),
    null,
    'abstract',
    translations,
    defaultLanguage
  )
  return abstract
}

function mapContactFromStatement(
  dataStore: Store,
  statement: Statement
): Individual {
  const contactNode = statement.object as NamedNode
  const fullName =
    dataStore.the(contactNode, VCARD('fn'), null) ??
    dataStore.the(contactNode, VCARD('title'), null) ??
    dataStore.the(contactNode, VCARD('organisation-name'), null)
  let firstName, lastName
  if (fullName) {
    const parts = fullNameToParts(fullName.value)
    firstName = parts[0]
    lastName = parts[1]
  }
  const role = dataStore.the(contactNode, VCARD('role'), null)
  const email = dataStore.the(contactNode, VCARD('hasEmail'), null)
  const emailValue = email
    ? email.value.replace(/^mailto:/, '')
    : 'missing@missing.com'
  return {
    role: role?.value ?? 'point_of_contact',
    email: emailValue,
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
  }
}

export function readContacts(
  dataStore: Store,
  recordNode: NamedNode
): Individual[] {
  const statements = dataStore.statementsMatching(
    recordNode,
    DCAT('contactPoint'),
    null
  )
  return statements.map((s) => mapContactFromStatement(dataStore, s))
}

export function readContactsForResource(
  dataStore: Store,
  recordNode: NamedNode
): Individual[] {
  const dataset = getDatasetNode(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCAT('contactPoint'),
    null
  )
  return statements.map((s) => mapContactFromStatement(dataStore, s))
}

export function readLandingPage(dataStore: Store, recordNode: NamedNode): URL {
  const dataset = getDatasetNode(dataStore, recordNode)
  const landingPage = dataStore.the(dataset, DCAT('landingPage'), null)
  return landingPage !== null ? getAsValidUrl(landingPage.value) : undefined
}

function readOnlineLinkResource(
  dataStore: Store,
  distributionNode: NamedNode,
  defaultLanguage: LanguageCode
): OnlineLinkResource {
  const accessUrl = dataStore.the(distributionNode, DCAT('accessURL'), null)
  const translations: OnlineResourceTranslations = {}
  const [description] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('description'),
    null,
    'description',
    translations,
    defaultLanguage
  )
  const [name] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('title'),
    null,
    'name',
    translations,
    defaultLanguage
  )
  return {
    url: getAsValidUrl(accessUrl?.value),
    type: 'link',
    ...(name !== null && { name }),
    ...(description !== null && { description }),
    translations,
  }
}

function readDownloadDistribution(
  dataStore: Store,
  distributionNode: NamedNode,
  defaultLanguage: LanguageCode
): DatasetDownloadDistribution {
  const downloadUrl = dataStore.the(distributionNode, DCAT('downloadURL'), null)
  const translations: OnlineResourceTranslations = {}
  const [description] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('description'),
    null,
    'description',
    translations,
    defaultLanguage
  )
  const [name] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('title'),
    null,
    'name',
    translations,
    defaultLanguage
  )
  // todo mime type
  return {
    url: getAsValidUrl(downloadUrl?.value),
    type: 'download',
    ...(name !== null && { name }),
    ...(description !== null && { description }),
    translations,
  }
}

function readServiceDistribution(
  dataStore: Store,
  distributionNode: NamedNode,
  defaultLanguage: LanguageCode
): DatasetServiceDistribution {
  const service = dataStore.the(
    distributionNode,
    DCAT('accessService'),
    null
  ) as NamedNode
  const conformsTo = dataStore.the(service, DCTERMS('conformsTo'), null)
  const accessUrl = dataStore.the(distributionNode, DCAT('accessURL'), null)
  const translations: OnlineResourceTranslations = {}
  const [description] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('description'),
    null,
    'description',
    translations,
    defaultLanguage
  )
  const [name] = readLocalizedValue(
    dataStore,
    distributionNode,
    DCTERMS('title'),
    null,
    'name',
    translations,
    defaultLanguage
  )
  return {
    url: getAsValidUrl(accessUrl?.value),
    type: 'service',
    accessServiceProtocol: matchProtocol(conformsTo?.value),
    ...(name !== null && { name }),
    ...(description !== null && { description }),
    translations,
  }
}

export function mapOnlineResource(
  dataStore: Store,
  distributionNode: NamedNode,
  defaultLanguage: LanguageCode
): OnlineResource {
  if (dataStore.holds(distributionNode, DCAT('accessService'), null)) {
    const service = dataStore.the(
      distributionNode,
      DCAT('accessService'),
      null
    ) as NamedNode
    const conformsTo = dataStore.the(service, DCTERMS('conformsTo'), null)
    if (conformsTo) {
      return readServiceDistribution(
        dataStore,
        distributionNode,
        defaultLanguage
      )
    }
  }
  if (dataStore.holds(distributionNode, DCAT('downloadURL'), null)) {
    return readDownloadDistribution(
      dataStore,
      distributionNode,
      defaultLanguage
    )
  }
  return readOnlineLinkResource(dataStore, distributionNode, defaultLanguage)
}

export function readOnlineResources(
  dataStore: Store,
  recordNode: NamedNode,
  translations: RecordTranslations,
  defaultLanguage: LanguageCode
): OnlineResource[] {
  const dataset = getDatasetNode(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCAT('distribution'),
    null
  )
  return statements.map((statement) =>
    mapOnlineResource(dataStore, statement.object as NamedNode, defaultLanguage)
  )
}

export function readSpatialExtents(
  dataStore: Store,
  recordNode: NamedNode
): DatasetSpatialExtent[] {
  const dataset = getDatasetNode(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCTERMS('spatial'),
    null
  )
  return statements
    .map((statement) => {
      const geom = dataStore.the(
        statement.object as NamedNode,
        LOCN('geometry'),
        null
      )
      if (!geom)
        return {
          description: statement.object.value,
        }
      return {
        geometry: JSON.parse(geom.value),
      }
    })
    .filter((statement) => !!statement)
}

export function readKeywords(
  dataStore: Store,
  recordNode: NamedNode
): Keyword[] {
  const dataset = getDatasetNode(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCAT('keyword'),
    null
  )
  return statements.map((statement) => {
    return {
      label: statement.object.value,
      type: 'theme',
    }
  })
}

export function readTopics(dataStore: Store, recordNode: NamedNode): string[] {
  const dataset = getDatasetNode(dataStore, recordNode)
  const statements = dataStore.statementsMatching(dataset, DCAT('theme'), null)
  return statements.map((statement) => {
    const prefLabel = dataStore.the(
      statement.object as NamedNode,
      SKOS('prefLabel'),
      null
    )
    return prefLabel?.value ?? statement.object.value
  })
}

export function readRecordCreated(
  dataStore: Store,
  recordNode: NamedNode
): Date {
  const dateString = dataStore.the(recordNode, DCTERMS('issued'), null)?.value
  if (dateString) return new Date(dateString)
  return null
}

export function readRecordUpdated(
  dataStore: Store,
  recordNode: NamedNode
): Date {
  const dateString = dataStore.the(recordNode, DCTERMS('modified'), null)?.value
  if (dateString) return new Date(dateString)
  return new Date() // record updated is a mandatory field
}

export function readResourceCreated(
  dataStore: Store,
  recordNode: NamedNode
): Date {
  const dataset = getDatasetNode(dataStore, recordNode)
  const dateString = dataStore.the(dataset, DCTERMS('issued'), null)?.value
  if (dateString) return new Date(dateString)
  return null
}

export function readResourceUpdated(
  dataStore: Store,
  recordNode: NamedNode
): Date {
  const dataset = getDatasetNode(dataStore, recordNode)
  const dateString = dataStore.the(dataset, DCTERMS('modified'), null)?.value
  if (dateString) return new Date(dateString)
  return null
}

export function readOwnerOrganization(dataStore: Store): Organization {
  const publisherStatements = dataStore.statementsMatching(
    null,
    DCTERMS('publisher'),
    null
  )
  if (!publisherStatements.length) return null
  const publisher = publisherStatements[0].object as NamedNode
  const nameNode = dataStore.the(publisher, FOAF('name'), null)
  const name = nameNode ? nameNode.value : publisher.value
  return {
    name,
  }
}

export function readLicenses(dataStore: Store, recordNode: NamedNode) {
  const dataset = getDatasetNode(dataStore, recordNode)
  const distributions = dataStore.statementsMatching(
    dataset,
    DCAT('distribution'),
    null
  )
  return distributions
    .map(
      (statement) =>
        dataStore.the(
          statement.object as NamedNode,
          DCTERMS('license'),
          null
        ) as NamedNode
    )
    .filter((license) => !!license)
    .map((s) => readLicenseFromString(s.value))
    .filter(
      (license, index, array) =>
        array.findIndex(
          (l) =>
            l.url?.toString() === license.url?.toString() &&
            l.text === license.text
        ) === index
    )
}

export function readDefaultLanguage(dataStore: Store, recordNode: NamedNode) {
  const dataset = getDatasetNode(dataStore, recordNode)
  const catalog = getCatalogNode(dataStore, recordNode)
  let statements = dataStore.statementsMatching(
    recordNode,
    DCTERMS('language'),
    null
  )
  if (!statements.length && dataset) {
    statements = dataStore.statementsMatching(
      dataset,
      DCTERMS('language'),
      null
    )
  }
  if (!statements.length && catalog) {
    statements = dataStore.statementsMatching(
      catalog,
      DCTERMS('language'),
      null
    )
  }
  if (!statements.length) return null
  const languageNode = statements[0].object as NamedNode
  let language = languageNode.value.split('/').pop().toLowerCase()
  if (language.length === 3) {
    language = getLang2FromLang3(language) ?? language
  }
  return language.substring(0, 2)
}
