import { DcatApConverter } from './dcat-ap.converter'
import { loadGraph } from './utils/graph-utils'
import { graph, NamedNode } from 'rdflib'
import { DCAT, RDF } from './namespaces'
import { mapOnlineResource, readDefaultLanguage } from './read-parts'

describe('read parts', () => {
  describe('find Dataset if not part of a record', () => {
    const doc = `
<rdf:RDF
    xmlns:dcat="http://www.w3.org/ns/dcat#"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <dcat:Dataset rdf:about="http://mobielvlaanderen.be/store-x/man-dcat/dataset_ind075">
        <dcterms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2022-04-28</dcterms:modified>
        <dcterms:issued rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2022-04-28</dcterms:issued>
        <dcterms:title>aantal ton gelost op de waterwegen</dcterms:title>
        <dcterms:description>hoeveelheid goederen gelost langs waterwegen beheerd door De Vlaamse Waterweg uitgedrukt in ton</dcterms:description>
    </dcat:Dataset>
</rdf:RDF>`
    it('reads title and abstract but not unique identifier', async () => {
      const record = await new DcatApConverter().readRecord(doc)
      expect(record).toMatchObject({
        uniqueIdentifier: undefined,
        title: 'aantal ton gelost op de waterwegen',
        abstract:
          'hoeveelheid goederen gelost langs waterwegen beheerd door De Vlaamse Waterweg uitgedrukt in ton',
      })
    })
  })

  describe('mapOnlineResource', () => {
    describe('service distribution', () => {
      const doc = `
@prefix adms: <http://www.w3.org/ns/adms#> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

[] a dcat:Distribution ;
  dct:accessRights <http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/INSPIRE_Directive_Article13_1e> ;
  dct:title "NoiseContours_air_lnight"@en ;
  dct:description "Description of the distribution" ;
  dct:format <http://publications.europa.eu/resource/authority/file-type/TIFF> ;
  dct:license [ a dct:LicenseDocument ;
      rdfs:label "The full noise contour maps data set is in principle only available for EEA internal use. A public version of the data set may in the future be available, excluding those data sets for which there is any limitation or restriction in their use (beyond acknowledgement)."@en ] ;
  adms:representationTechnique <http://inspire.ec.europa.eu/metadata-codelist/SpatialRepresentationType/grid> ;
  dcat:accessService [ a dcat:DataService ;
      dct:conformsTo <http://www.opengeospatial.org/standards/wms> ;
      dcat:endpointDescription <https://noise.discomap.eea.europa.eu/arcgis/services/noiseStoryMap/NoiseContours_air_lnight/ImageServer/WMSServer?request=GetCapabilities&service=WMS> ;
      dcat:endpointURL <https://noise.discomap.eea.europa.eu/arcgis/services/noiseStoryMap/NoiseContours_air_lnight/ImageServer/WMSServer> ] ;
  dcat:accessURL <https://noise.discomap.eea.europa.eu/arcgis/services/noiseStoryMap/NoiseContours_air_lnight/ImageServer/WMSServer?request=GetCapabilities&service=WMS> .`

      it('reads service distribution', async () => {
        const dataStore = graph()
        await loadGraph(dataStore, doc, 'text/n3', DCAT('CatalogRecord').value)
        const node = dataStore.the(
          null,
          RDF('type'),
          DCAT('Distribution')
        ) as NamedNode
        expect(mapOnlineResource(dataStore, node, 'en')).toEqual({
          name: 'NoiseContours_air_lnight',
          description: 'Description of the distribution',
          type: 'service',
          accessServiceProtocol: 'wms',
          url: new URL(
            'https://noise.discomap.eea.europa.eu/arcgis/services/noiseStoryMap/NoiseContours_air_lnight/ImageServer/WMSServer?request=GetCapabilities&service=WMS'
          ),
          translations: {},
        })
      })
    })
    describe('download distribution', () => {
      const doc = `
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .

[] a dcat:Distribution ;
  dcat:downloadURL <http://dcat.example.org/files/001.csv> ;
  dct:title "CSV distribution of imaginary dataset 001"@en ;
  dct:description "A more complete description" ;
  dct:title "distribución en CSV del conjunto de datos imaginario 001"@es ;
  dcat:mediaType <http://www.iana.org/assignments/media-types/text/csv> ;
  dcat:byteSize "5120"^^xsd:nonNegativeInteger ;`

      it('reads download distribution', async () => {
        const dataStore = graph()
        await loadGraph(dataStore, doc, 'text/n3', DCAT('CatalogRecord').value)
        const node = dataStore.the(
          null,
          RDF('type'),
          DCAT('Distribution')
        ) as NamedNode
        expect(mapOnlineResource(dataStore, node, 'en')).toEqual({
          name: 'CSV distribution of imaginary dataset 001',
          description: 'A more complete description',
          type: 'download',
          url: new URL(
            'https://noise.discomap.eea.europa.eu/arcgis/services/noiseStoryMap/NoiseContours_air_lnight/ImageServer/WMSServer?request=GetCapabilities&service=WMS'
          ),
          translations: {
            name: {
              es: 'distribución en CSV del conjunto de datos imaginario 001',
            },
          },
        })
      })
    })
  })

  describe('readDefaultLanguage', () => {
    describe('language on catalog record', () => {
      const doc = `
<rdf:RDF xmlns:dct='http://purl.org/dc/terms/'
        xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
        xmlns:skos='http://www.w3.org/2004/02/skos/core#'
        xmlns:dcat='http://www.w3.org/ns/dcat#'>
  <dcat:CatalogRecord rdf:about='http://data.europa.eu/88u/record/eu-whoiswho-the-official-directory-of-the-european-union'>
    <dct:language>
      <skos:Concept rdf:about='http://publications.europa.eu/resource/authority/language/NLD'>
        <rdf:type rdf:resource='http://purl.org/dc/terms/LinguisticSystem'/>
        <skos:prefLabel xml:lang='nl'>Nederlands</skos:prefLabel>
        <skos:prefLabel xml:lang='en'>Dutch</skos:prefLabel>
        <skos:prefLabel xml:lang='fr'>néerlandais</skos:prefLabel>
        <skos:prefLabel xml:lang='de'>Niederländisch</skos:prefLabel>
        <skos:inScheme rdf:resource='http://publications.europa.eu/resource/authority/language'/>
      </skos:Concept>
    </dct:language>
  </dcat:CatalogRecord>
</rdf:RDF>
`
      it('reads 2-char language code', async () => {
        const dataStore = graph()
        await loadGraph(dataStore, doc, 'application/rdf+xml')
        const recordNode = dataStore.the(
          null,
          RDF('type'),
          DCAT('CatalogRecord')
        ) as NamedNode
        expect(readDefaultLanguage(dataStore, recordNode)).toEqual('nl')
      })
    })

    describe('language on catalog', () => {
      const doc = `
<rdf:RDF xmlns:dct='http://purl.org/dc/terms/'
        xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
        xmlns:skos='http://www.w3.org/2004/02/skos/core#'
        xmlns:dcat='http://www.w3.org/ns/dcat#'
        xmlns:foaf="http://xmlns.com/foaf/0.1/">
  <dcat:Catalog rdf:about="http://data.europa.eu/88u">
    <dct:language>
      <skos:Concept rdf:about='http://publications.europa.eu/resource/authority/language/NLD'>
        <rdf:type rdf:resource='http://purl.org/dc/terms/LinguisticSystem'/>
        <skos:prefLabel xml:lang='nl'>Nederlands</skos:prefLabel>
        <skos:prefLabel xml:lang='en'>Dutch</skos:prefLabel>
        <skos:prefLabel xml:lang='fr'>néerlandais</skos:prefLabel>
        <skos:prefLabel xml:lang='de'>Niederländisch</skos:prefLabel>
        <skos:inScheme rdf:resource='http://publications.europa.eu/resource/authority/language'/>
      </skos:Concept>
    </dct:language>
    <dcat:record rdf:resource="http://data.europa.eu/88u/record/eu-whoiswho-the-official-directory-of-the-european-union"/>
  </dcat:Catalog>
  <dcat:CatalogRecord rdf:about='http://data.europa.eu/88u/record/eu-whoiswho-the-official-directory-of-the-european-union'>
    <foaf:primaryTopic>
      <dcat:Dataset rdf:about="http://data.europa.eu/88u/dataset/eu-whoiswho-the-official-directory-of-the-european-union">
        <dct:subject rdf:resource="http://eurovoc.europa.eu/5645"/>
      </dcat:Dataset>
    </foaf:primaryTopic>
  </dcat:CatalogRecord>
</rdf:RDF>
`
      it('reads 2-char language code', async () => {
        const dataStore = graph()
        await loadGraph(dataStore, doc, 'application/rdf+xml')
        const recordNode = dataStore.the(
          null,
          RDF('type'),
          DCAT('CatalogRecord')
        ) as NamedNode
        expect(readDefaultLanguage(dataStore, recordNode)).toEqual('nl')
      })
    })

    describe('language on anything else', () => {
      const doc = `
<rdf:RDF xmlns:dct='http://purl.org/dc/terms/'
        xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
        xmlns:skos='http://www.w3.org/2004/02/skos/core#'
        xmlns:dcat='http://www.w3.org/ns/dcat#'>
  <dcat:Catalog rdf:about="http://data.europa.eu/88u">
    <dcat:record rdf:resource="http://data.europa.eu/88u/record/eu-whoiswho-the-official-directory-of-the-european-union"/>
  </dcat:Catalog>
  <dcat:CatalogRecord rdf:about='http://data.europa.eu/88u/record/eu-whoiswho-the-official-directory-of-the-european-union'>
    <dcat:distribution>
      <dcat:Distribution rdf:about="http://data.europa.eu/88u/distribution/a917249e-9fc1-449e-b527-c10beb2a469a">
        <dct:language>
          <skos:Concept rdf:about='http://publications.europa.eu/resource/authority/language/NLD'>
            <rdf:type rdf:resource='http://purl.org/dc/terms/LinguisticSystem'/>
            <skos:prefLabel xml:lang='nl'>Nederlands</skos:prefLabel>
            <skos:prefLabel xml:lang='en'>Dutch</skos:prefLabel>
            <skos:prefLabel xml:lang='fr'>néerlandais</skos:prefLabel>
            <skos:prefLabel xml:lang='de'>Niederländisch</skos:prefLabel>
            <skos:inScheme rdf:resource='http://publications.europa.eu/resource/authority/language'/>
          </skos:Concept>
        </dct:language>
      </dcat:Distribution>
    </dcat:distribution>
  </dcat:CatalogRecord>
</rdf:RDF>
`
      it('returns null', async () => {
        const dataStore = graph()
        await loadGraph(dataStore, doc, 'application/rdf+xml')
        const recordNode = dataStore.the(
          null,
          RDF('type'),
          DCAT('CatalogRecord')
        ) as NamedNode
        expect(readDefaultLanguage(dataStore, recordNode)).toEqual(null)
      })
    })
  })
})
