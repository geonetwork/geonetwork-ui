import { TestBed } from '@angular/core/testing'
import {
  SETTINGS_FIXTURES,
  SITE_FIXTURES,
  SiteApiService,
  UI_FIXTURES,
  UiApiService,
} from '@lib/gn-api'
import { of } from 'rxjs'

import { BootstrapService } from './bootstrap.service'

let uiResponse = UI_FIXTURES
const uiSettings = JSON.parse(UI_FIXTURES.configuration)
const originalWarn = console.warn

const siteApiServiceMock = {
  getSiteOrPortalDescription: jest.fn(() => of(SITE_FIXTURES)),
  getSettingsSet: jest.fn(() => of(SETTINGS_FIXTURES)),
}

const uiApiServiceMock = {
  getUiConfiguration: jest.fn((uiIdentifier) => of(uiResponse)),
}

describe('BootstrapService', () => {
  let service: BootstrapService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SiteApiService,
          useValue: siteApiServiceMock,
        },
        {
          provide: UiApiService,
          useValue: uiApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(BootstrapService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('uiConfReady', () => {
    let uiConf
    describe('When the service is initialized', () => {
      it('no conf is stored ', () => {
        expect(Object.keys(service['uiConfigurations']).length).toBe(0)
      })
      it('api has never been called ', () => {
        expect(service['uiService'].getUiConfiguration).toHaveBeenCalledTimes(0)
      })
    })
    describe('When we require a configuration', () => {
      it('the uiIdentifier is added to the pool ', () => {
        service.uiConfReady('conf1').subscribe((conf) => (uiConf = conf))
        expect(service['uiConfigurations']).toHaveProperty('conf1')
      })
      it('the api has been called ', () => {
        expect(uiApiServiceMock.getUiConfiguration).toHaveBeenCalledWith(
          'conf1'
        )
      })
      it('return expected conf', () => {
        expect(uiConf).toEqual(uiSettings)
        jest.clearAllMocks()
      })
    })

    describe('When we require configuration already fetched', () => {
      beforeEach(() => {})
      it('calls api only once', () => {
        service.uiConfReady('conf1').subscribe((conf) => (uiConf = conf))
        service.uiConfReady('conf1').subscribe((conf) => (uiConf = conf))
        expect(service['uiService'].getUiConfiguration).toHaveBeenCalledTimes(1)
      })
      it('return expected conf', () => {
        expect(uiConf).toEqual(uiSettings)
        jest.clearAllMocks()
      })
    })

    describe('When there is an error in the configuration', () => {
      let consoleOutput = []
      beforeEach(() => {
        const mockedWarn = (output) => consoleOutput.push(output)
        console.warn = mockedWarn
        uiResponse = { id: 'main', configuration: '{{]]' }
      })
      afterEach(() => (console.warn = originalWarn))
      it('return empty conf', () => {
        service.uiConfReady('conf1').subscribe((conf) => (uiConf = conf))
        expect(uiConf).toEqual({})
        jest.clearAllMocks()
      })
      it('console warn a message', () => {
        expect(consoleOutput).toEqual([
          'Error during UI configuration loading: conf1',
        ])
      })
    })
  })
})
