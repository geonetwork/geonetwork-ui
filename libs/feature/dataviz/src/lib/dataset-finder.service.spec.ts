import { DatasetFinderService, LinkUsage } from './dataset-finder.service'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'

describe('DatasetFinderService', () => {
  const readmeLink = {
    protocol: 'WWW:LINK',
    description: 'Readme page',
    url: 'http://envlit.ifremer.fr/resultats/quadrige',
  }
  const doiLink = {
    protocol: 'WWW:DOI',
    description: 'DOI for the resource',
    url: 'http://doi.org/123-456-678',
  }
  const dataCsv = {
    protocol: 'HTTP',
    description: 'Data in CSV format',
    name: 'abc.csv',
    url: 'http://my.server/files/abc.csv',
  }
  const dataXls = {
    protocol: 'HTTP',
    description: 'Data in XLS format',
    name: 'abc.xls',
    url: 'https://my.server/files/abc.xls',
  }
  const dataXlsx = {
    protocol: 'HTTP',
    description: 'Data in XLSX format',
    name: 'abc.XLSX',
    url: 'https://my.server/files/abc.XLSX',
  }
  const dataJson = {
    protocol: 'HTTP',
    description: 'Data in JSON format',
    name: 'abc.json',
    url: 'https://my.server/files/abc.json',
  }
  const geodataJson = {
    protocol: 'HTTP',
    description: 'Geographic data in GeoJSON format',
    name: 'mylayer',
    url: 'http://my.server/files/geographic/dataset.geojson',
  }
  const geodataWms = {
    protocol: 'OGC:WMS',
    name: 'mylayer',
    url: 'https://my.ogc.server/wms',
  }
  const geodataWfs = {
    protocol: 'OGC:WFS',
    name: 'mylayer',
    url: 'https://my.ogc.server/wfs',
  }
  const geodataWms2 = {
    protocol: 'OGC:WMS',
    name: 'myotherlayer',
    url: 'https://my.ogc.server/wms',
  }
  const geodataWfs2 = {
    protocol: 'OGC:WFS',
    name: 'myotherlayer',
    url: 'https://my.ogc.server/wfs',
  }
  let service: DatasetFinderService

  beforeEach(() => {
    service = new DatasetFinderService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getDistinctLinksByUsage', () => {
    const record: MetadataRecord = {
      ...RECORDS_SUMMARY_FIXTURE[0],
      links: [
        readmeLink,
        doiLink,
        dataCsv,
        dataXls,
        dataXlsx,
        dataJson,
        geodataJson,
        geodataWms,
        geodataWfs,
        geodataWms2,
        geodataWfs2,
      ],
    }
    describe('for download', () => {
      it('returns the downloadable resources', () => {
        expect(
          service.getDistinctLinksByUsage(record, LinkUsage.DOWNLOAD)
        ).toEqual([dataCsv, geodataWfs, geodataWfs2])
      })
      it('returns the resources renderable on a map', () => {
        expect(service.getDistinctLinksByUsage(record, LinkUsage.MAP)).toEqual([
          dataCsv,
          geodataWms,
          geodataWms2,
        ])
      })
    })
  })

  describe('#getLinkUsages', () => {
    describe('for a WMS link', () => {
      it('returns a MAP usage', () => {
        expect(service.getLinkUsages(geodataWms)).toEqual([LinkUsage.MAP])
      })
    })
    describe('for a link to a CSV file', () => {
      it('returns a download usage', () => {
        expect(service.getLinkUsages(dataCsv)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.MAP,
        ])
      })
    })
    describe('for a link to a XLSX file', () => {
      it('returns a download usage', () => {
        expect(service.getLinkUsages(dataXlsx)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.MAP,
        ])
      })
    })
    describe('for a link to a simple page', () => {
      it('returns null', () => {
        expect(service.getLinkUsages(readmeLink)).toEqual([])
      })
    })
  })
})
