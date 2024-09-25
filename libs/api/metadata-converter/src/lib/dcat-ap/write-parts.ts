import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NamedNode, Store, sym } from 'rdflib'
import { DCAT, DCTERMS, FOAF, RDF } from './namespaces'
import {
  getOrAddLiteral,
  getOrAddLocalizedLiteral,
  getOrAddStatement,
} from './utils/graph-utils'
import { BASE_URI } from './utils/uri'

function getOrAddDatasetNode(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
): NamedNode {
  if (dataStore.holds(null, RDF('type'), DCAT('Dataset'))) {
    return dataStore.the(null, RDF('type'), DCAT('Dataset')) as NamedNode
  }
  const datasetNode = sym(`${BASE_URI}dataset/${record.uniqueIdentifier}`)
  dataStore.add(datasetNode, RDF('type'), DCAT('Dataset'))
  dataStore.add(recordNode, FOAF('primaryTopic'), datasetNode)
  return datasetNode
}

export function writeUniqueIdentifier(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
) {
  getOrAddStatement(
    dataStore,
    recordNode,
    DCTERMS('identifier'),
    record.uniqueIdentifier
  )
}

export function writeTitle(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
) {
  const dataset = getOrAddDatasetNode(record, dataStore, recordNode)
  getOrAddLocalizedLiteral(
    dataStore,
    dataset,
    DCTERMS('title'),
    record.title,
    'en'
  )
  getOrAddLiteral(dataStore, dataset, DCTERMS('title'), record.title)
}

export function writeAbstract(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
) {
  const dataset = getOrAddDatasetNode(record, dataStore, recordNode)
  getOrAddLocalizedLiteral(
    dataStore,
    dataset,
    DCTERMS('description'),
    record.abstract,
    'en'
  )
  getOrAddLiteral(dataStore, dataset, DCTERMS('description'), record.abstract)
}
