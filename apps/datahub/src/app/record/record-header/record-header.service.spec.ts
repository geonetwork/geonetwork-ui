import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { of } from 'rxjs'
import { RecordHeaderService } from './record-header.service'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

let _edit_url_template = 'http://edit/${record_id}'
jest.mock('@geonetwork-ui/util/app-config', () => {
  return {
    getGlobalConfig() {
      return {
        EDIT_URL_TEMPLATE: _edit_url_template,
      }
    },
  }
})

describe('RecordHeaderService', () => {
  let service: RecordHeaderService
  let routerMock: jest.Mocked<Router>
  let locationMock: jest.Mocked<Location>
  let recordsRepoMock: jest.Mocked<RecordsRepositoryInterface>

  beforeEach(() => {
    routerMock = {
      navigateByUrl: jest.fn(),
      lastSuccessfulNavigation: null,
    } as any

    locationMock = {
      back: jest.fn(),
    } as any

    recordsRepoMock = {
      canEditIndexedRecord: jest.fn(),
    } as any

    TestBed.configureTestingModule({
      providers: [
        RecordHeaderService,
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock },
        { provide: RecordsRepositoryInterface, useValue: recordsRepoMock },
      ],
    })

    service = TestBed.inject(RecordHeaderService)
  })

  afterEach(() => {
    _edit_url_template = 'http://edit/${record_id}'
    jest.clearAllMocks()
  })

  describe('back', () => {
    it('should call location.back() if previous navigation exists', () => {
      ;(routerMock as any).lastSuccessfulNavigation = { previousNavigation: {} }
      service.back()
      expect(locationMock.back).toHaveBeenCalled()
    })

    it('should navigate to /search if no previous navigation exists', () => {
      ;(routerMock as any).lastSuccessfulNavigation = null
      service.back()
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/search')
    })
  })

  describe('canEditFromUrl$', () => {
    it('should return of(false) if EDIT_URL_TEMPLATE is not defined', (done) => {
      service.metadata$.next({ uniqueIdentifier: 'test' } as any)
      _edit_url_template = ''

      service.canEditFromUrl$.subscribe((result) => {
        expect(result).toBe(false)
        expect(recordsRepoMock.canEditIndexedRecord).not.toHaveBeenCalled()
        done()
      })
    })

    it('should call repository if EDIT_URL_TEMPLATE is present', (done) => {
      service.metadata$.next({ uniqueIdentifier: 'test' } as any)
      recordsRepoMock.canEditIndexedRecord.mockReturnValue(of(true))

      service.canEditFromUrl$.subscribe((result) => {
        expect(recordsRepoMock.canEditIndexedRecord).toHaveBeenCalled()
        expect(result).toBe(true)
        done()
      })
    })
  })

  describe('openEditUrl', () => {
    it('should open a new window with the replaced ID in the template', () => {
      const windowSpy = jest
        .spyOn(window, 'open')
        .mockImplementation(() => null)

      service.metadata$.next({ uniqueIdentifier: 'uuid-123' } as CatalogRecord)
      service.openEditUrl()

      expect(windowSpy).toHaveBeenCalledWith('http://edit/uuid-123', '_blank')
      windowSpy.mockRestore()
    })
  })
})
