import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute, Router } from '@angular/router'
import {
  datasetRecordsFixture,
  editorConfigFixture,
} from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MockBuilder } from 'ng-mocks'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const getRoute = () => ({
  snapshot: {
    data: {
      record: [datasetRecordsFixture()[0], '<xml>blabla</xml>', false, true],
    },
    routeConfig: {
      path: '/edit/:uuid',
    },
  },
})

class RouterMock {
  navigate = jest.fn()
}

class EditorFacadeMock {
  record$ = new BehaviorSubject(datasetRecordsFixture()[0])
  openRecord = jest.fn()
  saveError$ = new Subject<string>()
  saveSuccess$ = new Subject()
  draftSaveSuccess$ = new Subject()
  editorConfig$ = new BehaviorSubject(editorConfigFixture())
  currentPage$ = new BehaviorSubject(0)
  pagesCount$ = new BehaviorSubject(2)
  hasRecordChanged$ = new BehaviorSubject(false)
  saveRecord = jest.fn()
}
class NotificationsServiceMock {
  showNotification = jest.fn()
}

class PlatformServiceMock {
  getMe = jest.fn()
}

describe('EditPageComponent', () => {
  let component: EditPageComponent
  let fixture: ComponentFixture<EditPageComponent>
  let facade: EditorFacade
  let notificationsService: NotificationsService
  let router: Router

  beforeEach(() => {
    return MockBuilder(EditPageComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: ActivatedRoute,
          useFactory: getRoute,
        },
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
        {
          provide: NotificationsService,
          useClass: NotificationsServiceMock,
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade)
    notificationsService = TestBed.inject(NotificationsService)
    fixture = TestBed.createComponent(EditPageComponent)
    router = TestBed.inject(Router)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('calls openRecord', () => {
      expect(facade.openRecord).toHaveBeenCalledWith(
        datasetRecordsFixture()[0],
        '<xml>blabla</xml>'
      )
    })
  })
  describe('Existing record', () => {
    describe('notifications', () => {
      beforeEach(() => {
        fixture.detectChanges()
      })
      describe('publish version error', () => {
        it('shows notification', () => {
          ;(facade.saveError$ as any).next(new PublicationVersionError('1.0.0'))
          expect(notificationsService.showNotification).toHaveBeenCalledWith(
            {
              type: 'error',
              title: 'editor.record.publishVersionError.title',
              text: 'editor.record.publishVersionError.body',
              closeMessage: 'editor.record.publishVersionError.closeMessage',
            },
            undefined,
            expect.any(PublicationVersionError)
          )
        })
      })

      describe('publish error', () => {
        it('shows notification', () => {
          ;(facade.saveError$ as any).next(new Error('oopsie'))
          expect(notificationsService.showNotification).toHaveBeenCalledWith(
            {
              type: 'error',
              title: 'editor.record.publishError.title',
              text: 'editor.record.publishError.body oopsie',
              closeMessage: 'editor.record.publishError.closeMessage',
            },
            undefined,
            expect.any(Error)
          )
        })
      })

      describe('publish success', () => {
        it('shows notification', () => {
          component.newRecord = false
          ;(facade.saveSuccess$ as any).next()
          expect(notificationsService.showNotification).toHaveBeenCalledWith(
            {
              type: 'success',
              title: 'editor.record.publishSuccess.title',
              text: 'editor.record.publishSuccess.body',
            },
            2500
          )
        })
      })
    })

    describe('isLastPage$', () => {
      let editorFacade: EditorFacadeMock
      beforeEach(() => {
        editorFacade = TestBed.inject(
          EditorFacade
        ) as unknown as EditorFacadeMock
      })
      it('returns true if last page', async () => {
        editorFacade.currentPage$.next(3)
        editorFacade.pagesCount$.next(4)
        expect(await firstValueFrom(component.isLastPage$)).toBe(true)
      })
      it('returns false if not', async () => {
        editorFacade.currentPage$.next(1)
        editorFacade.pagesCount$.next(3)
        expect(await firstValueFrom(component.isLastPage$)).toBe(false)
      })
    })

    describe('subscriptions', () => {
      it('should add 5 subscriptions to component.subscription', () => {
        const addSpy = jest.spyOn(component.subscription, 'add')
        component.ngOnInit()
        expect(addSpy).toHaveBeenCalledTimes(5)
      })
      it('should add 5 subscriptions to component.subscription when on /create route', () => {
        const activatedRoute = TestBed.inject(ActivatedRoute)
        activatedRoute.snapshot.routeConfig.path = '/create'
        fixture.detectChanges()
        const addSpy = jest.spyOn(component.subscription, 'add')
        component.ngOnInit()
        expect(addSpy).toHaveBeenCalledTimes(5)
      })
      it('unsubscribes', () => {
        const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe')
        component.ngOnDestroy()
        expect(unsubscribeSpy).toHaveBeenCalled()
      })
    })
  })
  describe('New record', () => {
    beforeEach(() => {
      const modifiedRecord = {
        ...datasetRecordsFixture()[0],
        uniqueIdentifier: null,
      }
      ;(facade.record$ as any).next(modifiedRecord)
      fixture.detectChanges()
    })
    it('should save immediately', () => {
      const saveSpy = jest.spyOn(facade, 'saveRecord')
      expect(saveSpy).toHaveBeenCalled()
    })
  })
  describe('new record navigation', () => {
    beforeEach(() => {
      const modifiedRecord = {
        ...datasetRecordsFixture()[0],
        uniqueIdentifier: 'new-uuid',
      }
      ;(facade.record$ as any).next(modifiedRecord)
      fixture.detectChanges()
    })
    it('navigates to /edit/newUuid immediately', () => {
      const navigateSpy = jest.spyOn(router, 'navigate')

      const newRecord = {
        ...datasetRecordsFixture()[0],
        uniqueIdentifier: 'new-uuid',
      }

      ;(facade.record$ as any).next(newRecord)
      fixture.detectChanges()

      expect(navigateSpy).toHaveBeenCalledWith(['edit', 'new-uuid'], {
        replaceUrl: true,
      })
    })
  })
})
