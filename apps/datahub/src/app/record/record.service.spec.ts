import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { RecordService } from './record.service'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

let _edit_url_template = 'http://edit/${record_id}'
let _reuse_form_url = ''

jest.mock('@geonetwork-ui/util/app-config', () => {
  return {
    getGlobalConfig() {
      return {
        EDIT_URL_TEMPLATE: _edit_url_template,
        REUSE_FORM_URL: _reuse_form_url,
      }
    },
  }
})

describe('RecordService', () => {
  let service: RecordService
  let routerMock: jest.Mocked<Router>
  let locationMock: jest.Mocked<Location>
  let recordsRepoMock: jest.Mocked<RecordsRepositoryInterface>
  let platformServiceMock: jest.Mocked<PlatformServiceInterface>
  let userPermissions$: BehaviorSubject<any[]>

  const SAMPLE_RECORD: CatalogRecord = {
    uniqueIdentifier: 'uuid-123',
    kind: 'dataset',
  } as unknown as CatalogRecord

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

    userPermissions$ = new BehaviorSubject([])
    platformServiceMock = {
      getUserPermissionsByGroup: jest.fn().mockReturnValue(userPermissions$),
    } as any

    TestBed.configureTestingModule({
      providers: [
        RecordService,
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock },
        { provide: RecordsRepositoryInterface, useValue: recordsRepoMock },
        { provide: PlatformServiceInterface, useValue: platformServiceMock },
      ],
    })

    service = TestBed.inject(RecordService)
  })

  afterEach(() => {
    _edit_url_template = 'http://edit/${record_id}'
    _reuse_form_url = ''
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
      service.metadata$.next({ uniqueIdentifier: 'test' } as CatalogRecord)
      _edit_url_template = ''

      service.canEditFromUrl$.subscribe((result) => {
        expect(result).toBe(false)
        expect(recordsRepoMock.canEditIndexedRecord).not.toHaveBeenCalled()
        done()
      })
    })

    it(`should return of(false) if EDIT_URL_TEMPLATE is present, record is a reuse and REUSE_FORM_URL is defined
        (either the user can't edit, or the reuse edit button will be shown instead of the global edit one)`, (done) => {
      service.metadata$.next({
        uniqueIdentifier: 'test',
        kind: 'reuse',
      } as CatalogRecord)
      _edit_url_template = 'http://edit/${record_id}'
      _reuse_form_url = 'http://reuse-form'

      service.canEditFromUrl$.subscribe((result) => {
        expect(result).toBe(false)
        expect(recordsRepoMock.canEditIndexedRecord).not.toHaveBeenCalled()
        done()
      })
    })

    it('should call repository if EDIT_URL_TEMPLATE is present and record is not a reuse', (done) => {
      service.metadata$.next({
        uniqueIdentifier: 'test',
        kind: 'dataset',
      } as CatalogRecord)
      _edit_url_template = 'http://edit/${record_id}'
      recordsRepoMock.canEditIndexedRecord.mockReturnValue(of(true))

      service.canEditFromUrl$.subscribe((result) => {
        expect(recordsRepoMock.canEditIndexedRecord).toHaveBeenCalled()
        expect(result).toBe(true)
        done()
      })
    })

    it('should call repository if EDIT_URL_TEMPLATE is present, record is a reuse but REUSE_FORM_URL is absent', (done) => {
      service.metadata$.next({
        uniqueIdentifier: 'test',
        kind: 'reuse',
      } as CatalogRecord)
      _edit_url_template = 'http://edit/${record_id}'
      _reuse_form_url = ''
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

  describe('reuseNotificationAllowed$', () => {
    it('does not display reuse notification button when REUSE_FORM_URL is not defined', async () => {
      _reuse_form_url = ''
      const visible = await firstValueFrom(service.reuseNotificationAllowed$)
      expect(visible).toBe(false)
    })

    it('does not display reuse notification button when kind is not dataset', async () => {
      _reuse_form_url = 'http://reuse-form'
      const newService = TestBed.runInInjectionContext(
        () => new RecordService()
      )

      newService.metadata$.next({ ...SAMPLE_RECORD, kind: 'service' } as any)
      const visible = await firstValueFrom(newService.reuseNotificationAllowed$)
      expect(visible).toBe(false)
    })

    it('does not display reuse notification button when user has no write access', async () => {
      _reuse_form_url = 'http://reuse-form'
      const newService = TestBed.runInInjectionContext(
        () => new RecordService()
      )
      newService.metadata$.next({ ...SAMPLE_RECORD, kind: 'dataset' } as any)
      userPermissions$.next([
        {
          groupId: 105,
          canEdit: false,
          canApprove: false,
        },
      ])
      const visible = await firstValueFrom(newService.reuseNotificationAllowed$)
      expect(visible).toBe(false)
    })

    it('displays reuse notification button when all conditions are met', async () => {
      _reuse_form_url = 'http://reuse-form'
      const newService = TestBed.runInInjectionContext(
        () => new RecordService()
      )
      newService.metadata$.next({ ...SAMPLE_RECORD, kind: 'dataset' } as any)
      userPermissions$.next([
        {
          groupId: 105,
          canEdit: true,
          canApprove: false,
        },
      ])
      const visible = await firstValueFrom(newService.reuseNotificationAllowed$)
      expect(visible).toBe(true)
    })
  })

  describe('showEditDeleteReuseButtons$', () => {
    it('does not display when kind is not reuse', async () => {
      service.metadata$.next({ ...SAMPLE_RECORD, kind: 'dataset' } as any)

      const visible = await firstValueFrom(service.showEditDeleteReuseButtons$)
      expect(visible).toBe(false)
    })

    it('does not display when REUSE_FORM_URL is not set', async () => {
      service.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' as any })
      _reuse_form_url = ''

      const visible = await firstValueFrom(service.showEditDeleteReuseButtons$)
      expect(visible).toBe(false)
    })

    it('does not display when user has no edit rights', async () => {
      service.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' as any })
      _reuse_form_url = 'https://example.com/reuse'
      recordsRepoMock.canEditIndexedRecord.mockReturnValue(of(false))

      const visible = await firstValueFrom(service.showEditDeleteReuseButtons$)
      expect(visible).toBe(false)
    })

    it('displays when kind is reuse, REUSE_FORM_URL set and edit rights', async () => {
      service.metadata$.next({ ...SAMPLE_RECORD, kind: 'reuse' as any })
      _reuse_form_url = 'https://example.com/reuse'
      recordsRepoMock.canEditIndexedRecord.mockReturnValue(of(true))

      const visible = await firstValueFrom(service.showEditDeleteReuseButtons$)
      expect(visible).toBe(true)
    })
  })
})
