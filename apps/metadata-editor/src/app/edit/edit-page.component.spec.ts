import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute, Router } from '@angular/router'
import {
  datasetRecordsFixture,
  editorConfigFixture,
} from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MockBuilder } from 'ng-mocks'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { PageSelectorComponent } from './components/page-selector/page-selector.component'

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
      expect(navigateSpy).toHaveBeenCalledWith(['edit', 'my-dataset-001'], {
        replaceUrl: true,
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
})
