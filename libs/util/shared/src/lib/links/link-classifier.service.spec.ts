import { LinkClassifierService, LinkUsage } from './link-classifier.service'
import { linkFixture } from '@geonetwork-ui/common/fixtures'

describe('LinkClassifierService', () => {
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
        expect(service.getUsagesForLink(linkFixture().geodataWms)).toEqual([
          LinkUsage.API,
          LinkUsage.MAP_API,
        ])
      })
    })
    describe('for a WFS link', () => {
      it('returns download, data and API usage', () => {
        expect(service.getUsagesForLink(linkFixture().geodataWfs)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
          LinkUsage.GEODATA,
        ])
      })
    })
    describe('for a WFS link (registered as download)', () => {
      it('returns download, data and API usage', () => {
        expect(
          service.getUsagesForLink({
            name: 'mylayer',
            type: 'download',
            url: new URL('https://my.ogc.server/wfs?abcd'),
          })
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a ESRI REST feature service link', () => {
      it('returns download and API usage', () => {
        expect(service.getUsagesForLink(linkFixture().geodataRest)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
          LinkUsage.GEODATA,
        ])
      })
    })
    describe('for a ESRI REST WFS service link', () => {
      it('returns download and API usage', () => {
        expect(service.getUsagesForLink(linkFixture().geodataRestWfs)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
          LinkUsage.GEODATA,
        ])
      })
    })
    describe('for a ESRI REST map service link', () => {
      it('returns no usage', () => {
        expect(service.getUsagesForLink(linkFixture().maplayerRest)).toEqual([
          LinkUsage.UNKNOWN,
        ])
      })
    })
    describe('for a link to a CSV file', () => {
      it('returns a download usage', () => {
        expect(service.getUsagesForLink(linkFixture().dataCsv)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a link to a XLSX file', () => {
      it('returns a download usage', () => {
        expect(service.getUsagesForLink(linkFixture().dataXlsx)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.DATA,
        ])
      })
    })
    describe('for a link to a geojson file', () => {
      it('returns download and data usage', () => {
        expect(service.getUsagesForLink(linkFixture().geodataJson)).toEqual([
          LinkUsage.DOWNLOAD,
          LinkUsage.GEODATA,
        ])
      })
    })
    describe('for a link to a geojson with mimetype in the protocol', () => {
      it('returns download and data usage', () => {
        expect(
          service.getUsagesForLink(linkFixture().geodataJsonWithMimeType)
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a link to a simple page', () => {
      it('returns UNKNOWN', () => {
        expect(service.getUsagesForLink(linkFixture().readmeLink)).toEqual([
          LinkUsage.UNKNOWN,
        ])
      })
    })
    describe('for a landing page', () => {
      it('returns unknown usage', () => {
        expect(service.getUsagesForLink(linkFixture().landingPage)).toEqual([
          LinkUsage.UNKNOWN,
        ])
      })
    })
    describe('for an OGC API Features link', () => {
      it('returns download, data and API usage', () => {
        expect(service.getUsagesForLink(linkFixture().ogcApiFormat)).toEqual([
          LinkUsage.API,
          LinkUsage.DOWNLOAD,
          LinkUsage.GEODATA,
        ])
      })
    })
  })
})
