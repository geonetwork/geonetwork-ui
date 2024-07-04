import { DcatApConverter } from './dcat-ap.converter'

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
        <dcterms:title xml:lang="en">aantal ton gelost op de waterwegen</dcterms:title>
        <dcterms:description xml:lang="en">hoeveelheid goederen gelost langs waterwegen beheerd door De Vlaamse Waterweg uitgedrukt in ton</dcterms:description>
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
})
