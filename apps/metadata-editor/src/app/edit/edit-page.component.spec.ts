import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute } from '@angular/router'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateModule } from '@ngx-translate/core'

const getRoute = () => ({
  snapshot: {
    data: {
      record: DATASET_RECORDS[0],
    },
  },
})

class EditorFacadeMock {
  openRecord = jest.fn()
  saveError$ = new Subject<string>()
  saveSuccess$ = new Subject()
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
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade)
    notificationsService = TestBed.inject(NotificationsService)
    fixture = TestBed.createComponent(EditPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    it('calls openRecord', () => {
      expect(facade.openRecord).toHaveBeenCalledWith(DATASET_RECORDS[0])
    })
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
