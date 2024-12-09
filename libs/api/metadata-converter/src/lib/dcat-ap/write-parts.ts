import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NamedNode, Statement, Store, sym } from 'rdflib'
import { DCAT, DCTERMS, FOAF, RDF } from './namespaces'
import { writeLiteral, writeLocalizedLiteral } from './utils/graph-utils'
import { BASE_URI } from './utils/uri'

/**
 * This will create the dcat:Catalog node if not present, and link it to the record
 */
function getOrAddCatalogNode(
  dataStore: Store,
  recordNode: NamedNode
): NamedNode {
  if (dataStore.holds(null, RDF('type'), DCAT('Catalog'))) {
    return dataStore.the(null, RDF('type'), DCAT('Catalog')) as NamedNode
  }
  const statement = dataStore.add(
    sym(`${BASE_URI}catalog`),
    RDF('type'),
    DCAT('Catalog')
  ) as Statement
  const catalogNode = statement.subject as NamedNode
  dataStore.add(catalogNode, DCAT('record'), recordNode)
  return catalogNode
}

/**
 * This will create the dcat:Dataset node if not present, and link it both to
 * the record (using foaf:PrimaryTopic) and the catalog (using dcat:dataset)
 */
function getOrAddDatasetNode(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
): NamedNode {
  let datasetNode = dataStore.the(
    null,
    RDF('type'),
    DCAT('Dataset')
  ) as NamedNode

  // node is missing: create it & link it to record
  if (!datasetNode) {
    datasetNode = sym(`${BASE_URI}dataset/${record.uniqueIdentifier}`)
    dataStore.add(datasetNode, RDF('type'), DCAT('Dataset'))
    dataStore.add(recordNode, FOAF('primaryTopic'), datasetNode)
  }

  // add relationship to Catalog if missing
  const catalogNode = getOrAddCatalogNode(dataStore, recordNode)
  if (!dataStore.holds(catalogNode, DCAT('dataset'), datasetNode)) {
    dataStore.add(catalogNode, DCAT('dataset'), datasetNode)
  }

  return datasetNode
}

export function writeUniqueIdentifier(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
) {
  writeLiteral(
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
  writeLocalizedLiteral(
    dataStore,
    dataset,
    DCTERMS('title'),
    record.title,
    record.translations?.title,
    record.defaultLanguage
  )
}

export function writeAbstract(
  record: CatalogRecord,
  dataStore: Store,
  recordNode: NamedNode
) {
  const dataset = getOrAddDatasetNode(record, dataStore, recordNode)
  writeLocalizedLiteral(
    dataStore,
    dataset,
    DCTERMS('description'),
    record.abstract,
    record.translations?.abstract,
    record.defaultLanguage
  )
}
