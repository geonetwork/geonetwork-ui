import { NamedNode, Store } from 'rdflib'
import {
  findNodeLocalized,
  getOrAddLocalizedLiteral,
  loadGraph,
} from './graph-utils'
import { DCAT, DCTERMS, RDF } from '../namespaces'

function graphToXml(dataStore: Store) {
  return dataStore
    .serialize(undefined, 'application/rdf+xml', null, {})
    .replace(/ rdf:nodeID=".+"/g, '')
}

describe('graph utils', () => {
  describe('findNodeLocalized', () => {
    it('finds a node with a specific language if present', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
      <dcterms:title xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
      <dcterms:title xml:lang="de">guten morgen</dcterms:title>
      <dcterms:title>bla bla</dcterms:title>
      <dcterms:title xml:lang="en">english title</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      const result = findNodeLocalized(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'en'
      )
      expect(result?.value).toBe('english title')
    })
    it('finds a node with no language if given language is absent', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
      <dcterms:title xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
      <dcterms:title xml:lang="de">guten morgen</dcterms:title>
      <dcterms:title>bla bla</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      const result = findNodeLocalized(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'en'
      )
      expect(result?.value).toBe('bla bla')
    })
    it('finds a node with any other language if no node without language', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
      <dcterms:title xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
      <dcterms:title xml:lang="de">guten morgen</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      const result = findNodeLocalized(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'en'
      )
      expect(result?.value).toBe('aantal ton gelost op de waterwegen')
    })
  })

  describe('getOrAddLocalizedObject', () => {
    it('finds a node with a specific language if present', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
      <dcterms:title xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
      <dcterms:title xml:lang="de">guten morgen</dcterms:title>
      <dcterms:title>bla bla</dcterms:title>
      <dcterms:title xml:lang="en">english title</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      getOrAddLocalizedLiteral(
        dataStore,
        dataset,
        DCTERMS('title'),
        'new title in english',
        'en'
      )
      expect(graphToXml(dataStore)).toBe(`<rdf:RDF
 xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcat="http://www.w3.org/ns/dcat#">
    <dcat:Dataset>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="de">guten morgen</dcterms:title>
        <dcterms:title>bla bla</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="en">new title in english</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>
`)
    })
    it('modifies the first node without language if no language matches', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
      <dcterms:title xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
      <dcterms:title xml:lang="de">guten morgen</dcterms:title>
      <dcterms:title>bla bla</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>
`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      getOrAddLocalizedLiteral(
        dataStore,
        dataset,
        DCTERMS('title'),
        'new title in english',
        'en'
      )
      expect(graphToXml(dataStore)).toBe(`<rdf:RDF
 xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcat="http://www.w3.org/ns/dcat#">
    <dcat:Dataset>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="nl">aantal ton gelost op de waterwegen</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="de">guten morgen</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="en">new title in english</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>
`)
    })
  })
})
