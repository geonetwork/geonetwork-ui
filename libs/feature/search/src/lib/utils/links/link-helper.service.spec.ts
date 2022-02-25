import { TestBed } from '@angular/core/testing'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
} from '@geonetwork-ui/ui/search'
import {
  MetadataLink,
  MetadataRecord,
  RECORD_LINK_FIXTURE_WMS,
} from '@geonetwork-ui/util/shared'
import { LinkClassifierService, LinkUsage } from './link-classifier.service'

import { LinkHelperService } from './link-helper.service'
import { LINK_FIXTURES } from './link.fixtures'

let linkUsage: LinkUsage[]
const linkClassifierMock = {
  getUsagesForLink: jest.fn(() => linkUsage),
}

describe('LinkHelperService', () => {
  let service: LinkHelperService
  let link: MetadataLink
  let metadata: MetadataRecord
  let result

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LinkClassifierService,
          useValue: linkClassifierMock,
        },
      ],
    })
    service = TestBed.inject(LinkHelperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#hasLinks', () => {
    describe('when the record has links', () => {
      beforeEach(() => {
        metadata = RECORDS_FULL_FIXTURE[0]
        result = service.hasLinks(metadata)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('when the record has no links', () => {
      beforeEach(() => {
        metadata = RECORDS_SUMMARY_FIXTURE[0]
        result = service.hasLinks(metadata)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isDataLink', () => {
    describe('empty link usages', () => {
      beforeEach(() => {
        linkUsage = []
        result = service.isDataLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
    describe('with link usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DATA]
        result = service.isDataLink(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
  })
  describe('#isGeoDataLink', () => {
    describe('empty link usages', () => {
      beforeEach(() => {
        linkUsage = []
        result = service.isGeoDataLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
    describe('with link usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.GEODATA]
        result = service.isGeoDataLink(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
  })
  describe('#isOtherLink', () => {
    describe('empty link usages', () => {
      beforeEach(() => {
        linkUsage = []
        result = service.isOtherLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('with link usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DOWNLOAD]
        result = service.isOtherLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })
  describe('#isValidLink', () => {
    describe('valid link', () => {
      beforeEach(() => {
        link = RECORD_LINK_FIXTURE_WMS
        result = service.isValidLink(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('invalid link', () => {
      beforeEach(() => {
        link = {
          invalid: true,
          reason: 'no',
        }
        result = service.isValidLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isMapLink', () => {
    describe('MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI, LinkUsage.DOWNLOAD]
        result = service.isMapApiLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('no MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DOWNLOAD]
        result = service.isMapApiLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isDownloadLink', () => {
    describe('DOWNLAD usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI, LinkUsage.DOWNLOAD]
        result = service.isDownloadLink(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('no MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI]
        result = service.isDownloadLink(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#isLandingPage', () => {
    describe('LANDINGPAGE usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.LANDINGPAGE]
        result = service.isLandingPage(link)
      })
      it('calls #getUsagesForLink', () => {
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledWith(link)
      })
      it('returns true', () => {
        expect(result).toBe(true)
      })
    })
    describe('no MAP usage', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI]
        result = service.isLandingPage(link)
      })
      it('returns false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('#protocols', () => {
    describe('#hasDownloadProtocols', () => {
      beforeEach(() => {
        linkUsage = []
      })
      it('calls #getUsagesForLink', () => {
        jest.clearAllMocks()
        service.hasDownloadProtocols([])
        expect(linkClassifierMock.getUsagesForLink).not.toHaveBeenCalled()
        jest.clearAllMocks()
        service.hasDownloadProtocols(['OGC:WMS', 'WWW:DOWNLOAD'])
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledTimes(2)
        jest.clearAllMocks()
        service.hasDownloadProtocols(['WWW:DOWNLOAD'])
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
      })
      it('calls #hasMapApiProtocols', () => {
        jest.clearAllMocks()
        service.hasMapApiProtocols([])
        expect(linkClassifierMock.getUsagesForLink).not.toHaveBeenCalled()
        jest.clearAllMocks()
        service.hasDownloadProtocols(['OGC:WMS', 'WWW:DOWNLOAD'])
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledTimes(2)
        jest.clearAllMocks()
        service.hasDownloadProtocols(['WWW:DOWNLOAD'])
        expect(linkClassifierMock.getUsagesForLink).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
      })
    })

    describe('no matching usages', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.DATA]
      })
      it('hasDownloadProtocols is false', () => {
        expect(service.hasDownloadProtocols(['ESRI:REST'])).toBe(false)
      })
      it('hasMapApiProtocols is false', () => {
        expect(service.hasMapApiProtocols(['ESRI:REST'])).toBe(false)
      })
    })
    describe('has map and download protocols', () => {
      beforeEach(() => {
        linkUsage = [LinkUsage.MAPAPI, LinkUsage.DOWNLOAD]
      })
      it('hasDownloadProtocols is true', () => {
        expect(service.hasDownloadProtocols(['OGC:WMS', 'WWW:DOWNLOAD'])).toBe(
          true
        )
      })
      it('hasMapApiProtocols is true', () => {
        expect(service.hasMapApiProtocols(['OGC:WMS', 'WWW:DOWNLOAD'])).toBe(
          true
        )
      })
    })
  })
  describe('#isWmsLink', () => {
    it('returns true for a WMS link', () => {
      expect(service.isWmsLink(LINK_FIXTURES.geodataWms)).toBeTruthy()
    })
    it('returns false for a WFS link', () => {
      expect(service.isWmsLink(LINK_FIXTURES.geodataWfs)).toBeFalsy()
    })
  })
  describe('#isWfsLink', () => {
    it('returns true for a WFS link', () => {
      expect(service.isWfsLink(LINK_FIXTURES.geodataWfs)).toBeTruthy()
    })
    it('returns true for a ESRI WFS link', () => {
      expect(service.isWfsLink(LINK_FIXTURES.geodataRestWfs)).toBeTruthy()
    })
    it('returns false for a WFS link', () => {
      expect(service.isWfsLink(LINK_FIXTURES.geodataWms)).toBeFalsy()
    })
  })
  describe('#isEsriRestFeatureServer', () => {
    it('returns true for a ESRI:REST FeatureServer link', () => {
      expect(
        service.isEsriRestFeatureServer(LINK_FIXTURES.geodataRest)
      ).toBeTruthy()
    })
    it('returns false for a ESRI:REST WFSServer link', () => {
      expect(
        service.isEsriRestFeatureServer(LINK_FIXTURES.geodataRestWfs)
      ).toBeFalsy()
    })
  })
  describe('#hasProtocolDownload', () => {
    it('returns true for a CSV link', () => {
      expect(service.hasProtocolDownload(LINK_FIXTURES.dataCsv)).toBeTruthy()
    })
    it('returns false for a WFS link', () => {
      expect(service.hasProtocolDownload(LINK_FIXTURES.geodataWfs)).toBeFalsy()
    })
  })
  describe('#getLinkLabel', () => {
    it('returns label for WMS link', () => {
      expect(
        service.getLinkLabel({
          description: 'A mapping service',
          label: 'A mapping service',
          name: 'some_layer',
          protocol: 'OGC:WMS',
          url: 'http://example.com/service',
        })
      ).toEqual('A mapping service (WMS)')
    })
    it('returns label for WFS link', () => {
      expect(
        service.getLinkLabel({
          description: 'A feature service',
          label: 'A feature service',
          name: 'some_layer',
          protocol: 'OGC:WFS',
          url: 'http://example.com/service',
        })
      ).toEqual('A feature service (WFS)')
    })
    it('returns label for REST link', () => {
      expect(
        service.getLinkLabel({
          description: 'An esri feature service',
          label: 'An esri feature service',
          name: 'some_layer',
          protocol: 'ESRI:REST',
          url: 'http://example.com/FeatureServer',
        })
      ).toEqual('An esri feature service (REST)')
    })
    it('returns label for a file link from format', () => {
      expect(
        service.getLinkLabel({
          name: 'Cities',
          label: 'Cities',
          format: 'geojson',
          protocol: 'WWW:DOWNLOAD',
          url: 'http://example.com/data',
        })
      ).toEqual('Cities (geojson)')
    })
  })
})
