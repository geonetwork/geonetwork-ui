import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PublishButtonComponent } from './publish-button.component'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { BehaviorSubject, firstValueFrom, of, Subject } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  GroupsApiService,
  RecordsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class EditorFacadeMock {
  changedSinceSave$ = new BehaviorSubject(false)
  saving$ = new BehaviorSubject(false)
  activeUser$ = new BehaviorSubject({})
  record$ = new BehaviorSubject({
    ownerOrganization: { name: 'Group 1', id: 1 },
    uniqueIdentifier: 304,
    recordUpdated: new Date('2023-01-01'),
    extras: { ownerInfo: '1|John|Doe' },
  })
  saveRecord = jest.fn()
  saveSuccess$ = new BehaviorSubject(true)
  checkHasRecordChanged = jest.fn()
  hasRecordChanged$ = new Subject()
  isRecordNotYetSaved = jest.fn().mockReturnValue(false)
  recordHasDraft = jest.fn().mockReturnValue(true)
  getAllDrafts = jest
    .fn()
    .mockReturnValue(
      of([{ uniqueIdentifier: 304, recordUpdated: new Date('2023-01-01') }])
    )
  getRecord = jest.fn().mockReturnValue(
    of({
      recordUpdated: new Date('2023-02-01'),
      extras: { ownerInfo: '1|John|Doe' },
    })
  )
  isPublished$ = new BehaviorSubject(true)
}

const user = barbieUserFixture()
const groups = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
]

class PlatformServiceMock {
  getMe = jest.fn(() => new BehaviorSubject(user))
}

class GroupsApiServiceMock {
  getGroups = jest.fn().mockReturnValue(of(groups))
}

class RecordsApiServiceMock {
  setRecordOwnership = jest.fn().mockReturnValue(of({}))
}

describe('PublishButtonComponent', () => {
  let component: PublishButtonComponent
  let fixture: ComponentFixture<PublishButtonComponent>
  let facade: EditorFacadeMock
  let recordsApiService: RecordsApiService
  let overlaySpy: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
        {
          provide: GroupsApiService,
          useClass: GroupsApiServiceMock,
        },
        {
          provide: RecordsApiService,
          useClass: RecordsApiServiceMock,
        },
      ],
    }).compileComponents()

    recordsApiService = TestBed.inject(RecordsApiService)
    facade = TestBed.inject(EditorFacade) as any
    fixture = TestBed.createComponent(PublishButtonComponent)
    component = fixture.componentInstance
    overlaySpy = {
      dispose: jest.fn(),
      attach: jest.fn(),
      backdropClick: jest.fn().mockReturnValue(of()),
    }
    component['overlayRef'] = overlaySpy
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('status$', () => {
    describe('saving', () => {
      beforeEach(() => {
        facade.saving$.next(true)
      })
      it('should return "saving" when saving', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe('saving')
      })
    })
    describe('has changes', () => {
      beforeEach(() => {
        facade.changedSinceSave$.next(true)
      })
      it('should return "hasChanges" when not saving and changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'hasChanges'
        )
      })
    })
    describe('has never been published', () => {
      beforeEach(() => {
        facade.isPublished$.next(false)
      })
      it('should return "hasChanges" when has never been published', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'hasChanges'
        )
      })
    })
    describe('up to date', () => {
      it('should return "upToDate" when not saving and not changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'upToDate'
        )
      })
    })
  })

  describe('#saveRecord', () => {
    beforeEach(async () => {
      await component.saveRecord()
    })
    it('should call facade.saveRecord', () => {
      expect(facade.saveRecord).toHaveBeenCalled()
      expect(recordsApiService.setRecordOwnership).toHaveBeenCalledWith(
        304,
        0,
        46798
      )
    })
  })
  describe('#confirmPublish', () => {
    it('should call saveRecord', () => {
      const saveRecordSpy = jest.spyOn(component, 'saveRecord')
      component.confirmPublish()
      expect(saveRecordSpy).toHaveBeenCalled()
    })
  })

  describe('#cancelPublish', () => {
    it('should set isActionMenuOpen to false', () => {
      component.isActionMenuOpen = true
      component.cancelPublish()
      expect(component.isActionMenuOpen).toBe(false)
    })
  })

  describe('#verifyPublishConditions', () => {
    it('should call openConfirmationMenu if hasRecordChanged emits with a date', () => {
      const openConfirmationMenuSpy = jest.spyOn(
        component,
        'openConfirmationMenu'
      )
      const saveRecordSpy = jest.spyOn(component, 'saveRecord')

      component.verifyPublishConditions()
      facade.hasRecordChanged$.next(null)
      facade.hasRecordChanged$.next({ date: new Date(), user: 'John Doe' })

      expect(openConfirmationMenuSpy).toHaveBeenCalled()
      expect(saveRecordSpy).not.toHaveBeenCalled()
    })

    it('should call saveRecord if hasRecordChanged emits without a date', () => {
      const openConfirmationMenuSpy = jest.spyOn(
        component,
        'openConfirmationMenu'
      )
      const saveRecordSpy = jest.spyOn(component, 'saveRecord')

      component.verifyPublishConditions()
      facade.hasRecordChanged$.next(null)
      facade.hasRecordChanged$.next({ date: undefined, user: undefined })

      expect(saveRecordSpy).toHaveBeenCalled()
      expect(openConfirmationMenuSpy).not.toHaveBeenCalled()
    })
  })
})
