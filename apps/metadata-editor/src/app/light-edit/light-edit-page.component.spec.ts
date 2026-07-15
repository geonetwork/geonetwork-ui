import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LightEditPageComponent } from './light-edit-page.component'
import { ActivatedRoute, Router } from '@angular/router'
import { simpleReuseRecordFixture } from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject, Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import {
  DEFAULT_CONFIGURATION,
  EditorFacade,
  RecordFormComponent,
  REUSE_LIGHT_CONFIGURATION,
} from '@geonetwork-ui/feature/editor'
import { MockBuilder } from 'ng-mocks'
import { Component } from '@angular/core'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'
import { provideI18n } from '@geonetwork-ui/util/i18n'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

let queryParams: Record<string, string> = {}

const getRoute = () => ({
  snapshot: {
    data: {
      record: [simpleReuseRecordFixture(), '<xml>blabla</xml>', true],
    },
    routeConfig: {
      path: '/light-edit/:uuid',
    },
    queryParamMap: {
      get: (key: string) => queryParams[key] ?? null,
    },
  },
})

class RouterMock {
  navigate = jest.fn()
}

class EditorFacadeMock {
  record$ = new BehaviorSubject(simpleReuseRecordFixture())
  canEditRecord$ = new BehaviorSubject(true)
  openRecord = jest.fn()
  saveError$ = new Subject<Error>()
  saveSuccess$ = new Subject()
  saving$ = new BehaviorSubject(false)
  saveRecord = jest.fn()
  setConfiguration = jest.fn()
}

class NotificationsServiceMock {
  showNotification = jest.fn()
}

// the ng-mocks mock of RecordFormComponent fails on its signal-based view query
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-record-form',
  template: '',
  standalone: true,
})
class MockRecordFormComponent {}

describe('LightEditPageComponent', () => {
  let component: LightEditPageComponent
  let fixture: ComponentFixture<LightEditPageComponent>
  let facade: EditorFacade
  let notificationsService: NotificationsService
  let router: Router

  beforeEach(() => {
    queryParams = {}
    return MockBuilder(LightEditPageComponent).replace(
      RecordFormComponent,
      MockRecordFormComponent
    )
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
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade)
    notificationsService = TestBed.inject(NotificationsService)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(LightEditPageComponent)
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
    it('calls openRecord with the resolved record', () => {
      expect(facade.openRecord).toHaveBeenCalledWith(
        simpleReuseRecordFixture(),
        '<xml>blabla</xml>'
      )
    })
    it('stops loading once the record is open', () => {
      expect(component.isLoading).toBe(false)
    })
    it('applies the reuse light editor configuration', () => {
      expect(facade.setConfiguration).toHaveBeenCalledWith(
        REUSE_LIGHT_CONFIGURATION
      )
    })
    it('restores the default editor configuration on destroy', () => {
      fixture.destroy()
      expect(facade.setConfiguration).toHaveBeenCalledWith(
        DEFAULT_CONFIGURATION
      )
    })
    it('shows the record form when the record can be edited', () => {
      expect(
        fixture.nativeElement.querySelector('gn-ui-record-form')
      ).toBeTruthy()
      expect(
        fixture.nativeElement.querySelector('md-editor-page-error')
      ).toBeFalsy()
    })
  })

  describe('when the record cannot be edited', () => {
    beforeEach(() => {
      ;(facade.canEditRecord$ as any).next(false)
      fixture.detectChanges()
    })
    it('shows the page error without the search header', () => {
      expect(
        fixture.nativeElement.querySelector('md-editor-page-error')
      ).toBeTruthy()
      expect(
        fixture.nativeElement.querySelector('md-editor-search-header')
      ).toBeFalsy()
      expect(
        fixture.nativeElement.querySelector('gn-ui-record-form')
      ).toBeFalsy()
    })
  })

  describe('notifications', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('shows an error notification on publish version error', () => {
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
    it('shows an error notification on save error', () => {
      ;(facade.saveError$ as any).next(new Error('something went wrong'))
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'error',
          title: 'editor.record.reuse.saveError.title',
          text: 'editor.record.reuse.saveError.body something went wrong',
          closeMessage: 'editor.record.loadError.closeMessage',
        },
        undefined,
        expect.any(Error)
      )
    })
    it('shows a success notification on save success', () => {
      ;(facade.saveSuccess$ as any).next(undefined)
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'success',
          title: 'editor.record.reuse.saveSuccess.title',
          text: 'editor.record.reuse.saveSuccess.body',
        },
        2500
      )
    })
  })

  describe('leave', () => {
    let windowOpenSpy: jest.SpyInstance
    beforeEach(() => {
      fixture.detectChanges()
      windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
    })
    afterEach(() => {
      windowOpenSpy.mockRestore()
    })
    it('navigates to the redirect_on_leave url when valid', () => {
      queryParams['redirect_on_leave'] =
        'https://example.com/datahub/reuse/1234'
      component.leave()
      expect(windowOpenSpy).toHaveBeenCalledWith(
        'https://example.com/datahub/reuse/1234',
        '_self'
      )
      expect(router.navigate).not.toHaveBeenCalled()
    })
    it('falls back to the dashboard when the param is absent', () => {
      component.leave()
      expect(windowOpenSpy).not.toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalledWith(['catalog', 'search'])
    })
    it('falls back to the dashboard when the param is not an http(s) url', () => {
      queryParams['redirect_on_leave'] = 'javascript:alert(1)'
      component.leave()
      expect(windowOpenSpy).not.toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalledWith(['catalog', 'search'])
    })
  })
})
