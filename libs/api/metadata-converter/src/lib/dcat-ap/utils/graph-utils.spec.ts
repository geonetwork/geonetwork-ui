import { NamedNode, Store } from 'rdflib'
import {
  loadGraph,
  readLocalizedValue,
  writeLocalizedLiteral,
} from './graph-utils'
import { DCAT, DCTERMS, RDF } from '../namespaces'

function graphToXml(dataStore: Store) {
  return dataStore
    .serialize(undefined, 'application/rdf+xml', null, {})
    .replace(/ rdf:nodeID=".+"/g, '')
}

describe('graph utils', () => {
  describe('readLocalizedValue', () => {
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
      const [value, translations] = readLocalizedValue(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'title',
        {},
        'en'
      )
      expect(value).toBe('english title')
      expect(translations).toEqual({
        title: {
          de: 'guten morgen',
          nl: 'aantal ton gelost op de waterwegen',
        },
      })
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
      const [value, translations] = readLocalizedValue(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'title',
        {},
        'en'
      )
      expect(value).toBe('bla bla')
      expect(translations).toEqual({
        title: {
          de: 'guten morgen',
          nl: 'aantal ton gelost op de waterwegen',
        },
      })
    })
    it('returns placeholder if no node without language', async () => {
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
      const [value, translations] = readLocalizedValue(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'title',
        {},
        'en'
      )
      expect(value).toBe('(value not found)')
      expect(translations).toEqual({
        title: {
          de: 'guten morgen',
          nl: 'aantal ton gelost op de waterwegen',
        },
      })
    })
    it('returns an empty object if no translations found', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
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
      const [value, translations] = readLocalizedValue(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'title',
        {},
        'en'
      )
      expect(value).toBe('bla bla')
      expect(translations).toEqual({})
    })
    it('returns null if no matching literal found', async () => {
      const dataStore = new Store()
      await loadGraph(
        dataStore,
        `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset>
    </dcat:Dataset>
</rdf:RDF>`,
        'application/rdf+xml'
      )

      const dataset = dataStore.the(
        null,
        RDF('type'),
        DCAT('Dataset')
      ) as NamedNode
      const [value, translations] = readLocalizedValue(
        dataStore,
        dataset,
        DCTERMS('title'),
        null,
        'title',
        {},
        'en'
      )
      expect(value).toBe(null)
      expect(translations).toEqual({})
    })
  })

  describe('writeTranslatedLiteral', () => {
    it('clears existing nodes and write new ones based on translations', async () => {
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
      writeLocalizedLiteral(
        dataStore,
        dataset,
        DCTERMS('title'),
        'new title in english',
        {
          de: 'neues Titel',
          nl: 'nieuwe titel',
        },
        'en'
      )
      expect(graphToXml(dataStore)).toBe(`<rdf:RDF
 xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcat="http://www.w3.org/ns/dcat#">
    <dcat:Dataset>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="en">new title in english</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="de">neues Titel</dcterms:title>
        <dcterms:title rdf:datatype="http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" xml:lang="nl">nieuwe titel</dcterms:title>
    </dcat:Dataset>
</rdf:RDF>
`)
    })
  })
})
