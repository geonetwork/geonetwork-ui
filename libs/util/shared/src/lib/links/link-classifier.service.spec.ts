import { LinkClassifierService, LinkUsage } from './link-classifier.service'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'

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
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataWms())
        ).toEqual([LinkUsage.API, LinkUsage.MAP_API])
      })
    })
    describe('for a WFS link', () => {
      it('returns download, data and API usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataWfs())
        ).toEqual([LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
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
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataRest())
        ).toEqual([LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a ESRI REST WFS service link', () => {
      it('returns download and API usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataRestWfs())
        ).toEqual([LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a ESRI REST map service link', () => {
      it('returns no usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().maplayerRest())
        ).toEqual([LinkUsage.UNKNOWN])
      })
    })
    describe('for a link to a CSV file', () => {
      it('returns a download usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().dataCsv())
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.DATA])
      })
    })
    describe('for a link to a XLSX file', () => {
      it('returns a download usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().dataXlsx())
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.DATA])
      })
    })
    describe('for a link to a geojson file', () => {
      it('returns download and data usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataJson())
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a link to a geojson with mimetype in the protocol', () => {
      it('returns download and data usage', () => {
        expect(
          service.getUsagesForLink(
            aSetOfLinksFixture().geodataJsonWithMimeType()
          )
        ).toEqual([LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a link to a simple page', () => {
      it('returns UNKNOWN', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().readmeLink())
        ).toEqual([LinkUsage.UNKNOWN])
      })
    })
    describe('for a landing page', () => {
      it('returns unknown usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().landingPage())
        ).toEqual([LinkUsage.UNKNOWN])
      })
    })
    describe('for an OGC API Features link', () => {
      it('returns download, data and API usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().ogcApiFormat())
        ).toEqual([LinkUsage.API, LinkUsage.DOWNLOAD, LinkUsage.GEODATA])
      })
    })
    describe('for a TMS link', () => {
      it('returns API and map API usage', () => {
        expect(
          service.getUsagesForLink(aSetOfLinksFixture().geodataTms())
        ).toEqual([LinkUsage.API, LinkUsage.MAP_API])
      })
    })
    describe('for a Maplibre Style JSON', () => {
      it('returns map API usage', () => {
        expect(
          service.getUsagesForLink(
            aSetOfLinksFixture().geodataAsMaplibreStyle()
          )
        ).toEqual([LinkUsage.GEODATA])
      })
    })
  })
})
