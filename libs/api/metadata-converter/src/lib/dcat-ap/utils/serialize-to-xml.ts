import { BlankNode, Literal, NamedNode, Statement, Store, sym } from 'rdflib'
import { XmlElement, XmlText } from '@rgrove/parse-xml'
import { DCAT, FOAF, RDF } from '../namespaces'
import { createDocument, NAMESPACES, xmlToString } from '../../xml-utils'
import { BASE_URI } from './uri'

function fullNameToXml(fullName: string): [string, string] {
  for (const key in NAMESPACES) {
    if (fullName.startsWith(NAMESPACES[key])) {
      return [key, fullName.replace(NAMESPACES[key], '')]
    }
  }
  return [null, fullName]
}

function createXmlElementFromNode(
  dataStore: Store,
  node: NamedNode | Literal
): XmlElement | XmlText {
  if (node instanceof Literal) {
    return new XmlText(node.value)
  }
  const type = dataStore.the(node, RDF('type')) as NamedNode
  if (!type) return null

  const statements = dataStore.statementsMatching(node, null, null)
  const children = statements
    // filtering out the rdf:type statements because they are already used above
    .filter((statement) => statement.predicate.value !== RDF('type').value)
    .map((statement) => {
      if (statement.object.toString() === statement.subject.toString()) {
        return null
      }

      // special cases: foaf:primaryTopic in dcat:CatalogRecord
      if (statement.predicate.value === FOAF('primaryTopic').value) {
        return new XmlElement(`foaf:primaryTopic`, {
          'rdf:resource': statement.object.value,
        })
      }

      const [namespace, name] = fullNameToXml(statement.predicate.value)
      const objectNode = createXmlElementFromNode(
        dataStore,
        statement.object as NamedNode
      )
      if (!objectNode) {
        // no object node: simply use the object value
        return new XmlElement(
          `${namespace}:${name}`,
          {
            'rdf:resource': statement.object.value,
          },
          []
        )
      }
      // wrap the object node in the predicate one
      return new XmlElement(`${namespace}:${name}`, {}, [objectNode])
    })
    .filter((child) => !!child)
  const [namespace, name] = fullNameToXml(type.value)
  const attributes =
    node instanceof BlankNode
      ? {}
      : {
          'rdf:about': node.value,
        }
  return new XmlElement(`${namespace}:${name}`, attributes, children)
}

/**
 * This will output an XML document serialized as string, tailored in a way that it
 * can be understood and indexed by GN4 dcat-ap plugin
 * @param dataStore
 */
export function exportGraphToXml(dataStore: Store): string {
  // we start with the catalog node (which is created if missing)
  let catalogNode = dataStore.statementsMatching(
    null,
    RDF('type'),
    DCAT('Catalog')
  )[0]?.subject as NamedNode
  if (!catalogNode) {
    const recordNode = dataStore.the(null, RDF('type'), DCAT('CatalogRecord'))
    const statement = dataStore.add(
      sym(`${BASE_URI}catalog`),
      RDF('type'),
      DCAT('Catalog')
    ) as Statement
    catalogNode = statement.subject as NamedNode
    dataStore.add(catalogNode, DCAT('record'), recordNode)
  }
  const rootEl = new XmlElement('rdf:RDF', {}, [
    createXmlElementFromNode(dataStore, catalogNode),
  ])
  return xmlToString(createDocument(rootEl))
}
