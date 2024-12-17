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
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { PageSelectorComponent } from './components/page-selector/page-selector.component'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'

const getRoute = () => ({
  snapshot: {
    data: {
      record: [datasetRecordsFixture()[0], '<xml>blabla</xml>', false],
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

  beforeEach(() => {
    return MockBuilder(EditPageComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditPageComponent,
        TranslateModule.forRoot(),
        PageSelectorComponent,
        HttpClientModule,
      ],
      providers: [
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
        '<xml>blabla</xml>',
        false
      )
    })
  })

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

  describe('unique identifier of the current record changes', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('navigates to /edit/newUuid', () => {
      const router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')
      ;(facade.record$ as any).next({
        ...datasetRecordsFixture()[0],
        uniqueIdentifier: 'new-uuid',
      })
      expect(navigateSpy).toHaveBeenCalledWith(['edit', 'new-uuid'])
    })
  })

  describe('isLastPage$', () => {
    let editorFacade: EditorFacadeMock
    beforeEach(() => {
      editorFacade = TestBed.inject(EditorFacade) as unknown as EditorFacadeMock
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
})
