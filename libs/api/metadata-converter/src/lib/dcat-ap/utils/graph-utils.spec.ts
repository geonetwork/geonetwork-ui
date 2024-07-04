import { NamedNode, Store } from 'rdflib'
import { findNodeLocalized, loadGraph } from './graph-utils'
import { DCAT, DCTERMS, RDF } from '../namespaces'

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
})
