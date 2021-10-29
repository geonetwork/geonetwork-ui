import { LinkClassifierService, LinkUsage } from './link-classifier.service'

describe('LinkClassifierService', () => {
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
    protocol: 'WWW:DOWNLOAD',
    description: 'Data in CSV format',
    name: 'abc.csv',
    url: 'http://my.server/files/abc.csv',
  }
  const dataXls = {
    protocol: 'WWW:DOWNLOAD',
    description: 'Data in XLS format',
    name: 'abc.xls',
    url: 'https://my.server/files/abc.xls',
  }
  const dataXlsx = {
    protocol: 'WWW:DOWNLOAD',
    description: 'Data in XLSX format',
    name: 'abc.XLSX',
    url: 'https://my.server/files/abc.XLSX',
  }
  const dataJson = {
    protocol: 'WWW:DOWNLOAD',
    description: 'Data in JSON format',
    name: 'abc.json',
    url: 'https://my.server/files/abc.json',
  }
  const geodataJson = {
    protocol: 'WWW:DOWNLOAD',
    description: 'Geographic data in GeoJSON format',
    format: 'geojson',
    name: 'mylayer',
    url: 'http://my.server/files/geographic/dataset',
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
  const geodataRest = {
    protocol: 'ESRI:REST',
    name: 'myrestlayer',
    url: 'https://my.esri.server/FeatureServer',
  }
  const maplayerRest = {
    protocol: 'ESRI:REST',
    name: 'myotherrestlayer',
    url: 'https://my.esri.server/MapServer',
  }
  let service: LinkClassifierService

  beforeEach(() => {
    service = new LinkClassifierService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getUsagesForLink', () => {
    describe('for a WMS link', () => {
      it('returns map API  and API usage', () => {
        expect(service.getUsagesForLink(geodataWms)).toEqual([
          LinkUsage.API,
          LinkUsage.MAPAPI,
        ])
      })
    })
    describe('for a WFS link', () => {
      it('returns download, data and API usage', () => {
        expect(service.getUsagesForLink(geodataWfs)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a ESRI REST feature service link', () => {
      it('returns download and API usage', () => {
        expect(service.getUsagesForLink(geodataRest)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
        ])
      })
    })
    describe('for a ESRI REST map service link', () => {
      it('returns no usage', () => {
        expect(service.getUsagesForLink(maplayerRest)).toEqual([])
      })
    })
    describe('for a link to a CSV file', () => {
      it('returns a download usage', () => {
        expect(service.getUsagesForLink(dataCsv)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a link to a XLSX file', () => {
      it('returns a download usage', () => {
        expect(service.getUsagesForLink(dataXlsx)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a link to a geojson file', () => {
      it('returns download and data usage', () => {
        expect(service.getUsagesForLink(geodataJson)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a link to a simple page', () => {
      it('returns null', () => {
        expect(service.getUsagesForLink(readmeLink)).toEqual([])
      })
    })
  })
})
