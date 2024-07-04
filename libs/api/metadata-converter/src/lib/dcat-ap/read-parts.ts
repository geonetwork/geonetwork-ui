import { NamedNode, Store } from 'rdflib'
import { DCAT, DCTERMS, FOAF, RDF, VCARD } from './namespaces'
import { findNodeLocalized } from './utils/graph-utils'
import {
  DatasetDistribution,
  DatasetDownloadDistribution,
  Individual,
  OnlineLinkResource,
} from '@geonetwork-ui/common/domain/model/record'
import { getAsValidUrl } from '../common/url'

function getDataset(dataStore: Store, recordNode: NamedNode): NamedNode {
  return (dataStore.the(recordNode, FOAF('primaryTopic'), null) ||
    dataStore.the(null, RDF('type'), DCAT('Dataset'))) as NamedNode
}

export function readUniqueIdentifier(
  dataStore: Store,
  recordNode: NamedNode
): string {
  return dataStore.the(recordNode, DCTERMS('identifier'), null)?.value
}

export function readTitle(dataStore: Store, recordNode: NamedNode): string {
  const dataset = getDataset(dataStore, recordNode)
  return findNodeLocalized(dataStore, dataset, DCTERMS('title'), null, 'en')
    ?.value
}

export function readAbstract(dataStore: Store, recordNode: NamedNode): string {
  const dataset = getDataset(dataStore, recordNode)
  return findNodeLocalized(
    dataStore,
    dataset,
    DCTERMS('description'),
    null,
    'en'
  )?.value
}

export function readContacts(
  dataStore: Store,
  recordNode: NamedNode
): Individual[] {
  const dataset = getDataset(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCAT('contactPoint'),
    null
  )
  return statements.map((statement) => {
    const contactNode = statement.object as NamedNode
    const name =
      dataStore.the(contactNode, VCARD('title'), null) ??
      dataStore.the(contactNode, VCARD('organisation-name'), null)
    const role = dataStore.the(contactNode, VCARD('role'), null)
    const email = dataStore.the(contactNode, VCARD('hasEmail'), null)
    return {
      role: role?.value ?? 'pointOfContact',
      email: email?.value ?? 'missing@missing.com',
      ...(name && { firstName: name.value }),
    } as Individual
  })
}

export function readLandingPage(dataStore: Store, recordNode: NamedNode): URL {
  const dataset = getDataset(dataStore, recordNode)
  const landingPage = dataStore.the(dataset, DCAT('landingPage'), null)
  return landingPage !== null ? getAsValidUrl(landingPage.value) : undefined
}

function readOnlineLinkResource(
  dataStore,
  distributionNode: NamedNode
): OnlineLinkResource {
  const accessUrl = dataStore.the(distributionNode, DCAT('accessURL'), null)
  const description = findNodeLocalized(
    dataStore,
    distributionNode,
    DCTERMS('description'),
    null,
    'en'
  )
  const title = findNodeLocalized(
    dataStore,
    distributionNode,
    DCTERMS('title'),
    null,
    'en'
  )
  return {
    url: getAsValidUrl(accessUrl?.value),
    type: 'link',
    ...(title && { name: title?.value }),
    ...(description && { description: description?.value }),
  }
}

function readDownloadDistribution(
  dataStore,
  distributionNode: NamedNode
): DatasetDownloadDistribution {
  const downloadUrl = dataStore.the(distributionNode, DCAT('downloadURL'), null)
  const description = findNodeLocalized(
    dataStore,
    distributionNode,
    DCTERMS('description'),
    null,
    'en'
  )
  const title = findNodeLocalized(
    dataStore,
    distributionNode,
    DCTERMS('title'),
    null,
    'en'
  )
  // todo mime type
  return {
    url: getAsValidUrl(downloadUrl?.value),
    type: 'download',
    ...(title && { name: title?.value }),
    ...(description && { description: description?.value }),
  }
}

export function readDistributions(
  dataStore: Store,
  recordNode: NamedNode
): DatasetDistribution[] {
  const dataset = getDataset(dataStore, recordNode)
  const statements = dataStore.statementsMatching(
    dataset,
    DCAT('distribution'),
    null
  )
  return statements.map((statement) => {
    const distributionNode = statement.object as NamedNode
    if (dataStore.holds(distributionNode, DCAT('downloadURL'), null)) {
      return readDownloadDistribution(dataStore, distributionNode)
    }
    return readOnlineLinkResource(dataStore, distributionNode)
  })
}
