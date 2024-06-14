import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute, Router } from '@angular/router'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateModule } from '@ngx-translate/core'

const getRoute = () => ({
  snapshot: {
    data: {
      record: [DATASET_RECORDS[0], '<xml>blabla</xml>', false],
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
  record$ = new BehaviorSubject(DATASET_RECORDS[0])
  openRecord = jest.fn()
  saveError$ = new Subject<string>()
  saveSuccess$ = new Subject()
  draftSaveSuccess$ = new Subject()
}
class NotificationsServiceMock {
  showNotification = jest.fn()
}

describe('EditPageComponent', () => {
  let component: EditPageComponent
  let fixture: ComponentFixture<EditPageComponent>
  let facade: EditorFacade
  let notificationsService: NotificationsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPageComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
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
        DATASET_RECORDS[0],
        '<xml>blabla</xml>',
        false
      )
    })
  })

  describe('notifications', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    describe('publish error', () => {
      it('shows notification', () => {
        ;(facade.saveError$ as any).next('oopsie')
        expect(notificationsService.showNotification).toHaveBeenCalledWith({
          type: 'error',
          title: 'editor.record.publishError.title',
          text: 'editor.record.publishError.body oopsie',
          closeMessage: 'editor.record.publishError.closeMessage',
        })
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

  describe('new record', () => {
    beforeEach(() => {
      const activatedRoute = TestBed.inject(ActivatedRoute)
      activatedRoute.snapshot.routeConfig.path = '/create'
      fixture.detectChanges()
    })
    it('navigate from /create to /edit/uuid on first change', () => {
      const router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')
      ;(facade.draftSaveSuccess$ as any).next()
      expect(navigateSpy).toHaveBeenCalledWith(['edit', 'my-dataset-001'])
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
        ...DATASET_RECORDS[0],
        uniqueIdentifier: 'new-uuid',
      })
      expect(navigateSpy).toHaveBeenCalledWith(['edit', 'new-uuid'])
    })
  })
})
