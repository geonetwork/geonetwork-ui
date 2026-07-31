import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LightEditPageComponent } from './light-edit-page.component'
import { ActivatedRoute } from '@angular/router'
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
import { provideI18n } from '@geonetwork-ui/util/i18n'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const getRoute = () => ({
  snapshot: {
    data: {
      record: [simpleReuseRecordFixture(), '<xml>blabla</xml>', true],
    },
    routeConfig: {
      path: '/light-edit/:uuid',
    },
  },
})

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

  beforeEach(() => {
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
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade)
    notificationsService = TestBed.inject(NotificationsService)
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

  describe('contactForResource handling', () => {
    it('emits the existing contact merged with defaults when contactsForResource has data', (done) => {
      const existingContact = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        role: 'author' as const,
        organization: { name: 'GéoOrganisation' },
      }

      ;(facade.record$ as BehaviorSubject<any>).next({
        ...simpleReuseRecordFixture(),
        contactsForResource: [existingContact],
      })

      component.firstContactForResource$.subscribe((contact) => {
        expect(contact).toEqual(existingContact)
        done()
      })
    })

    it('updates contactsForResource on facade when handleContactChange is called', () => {
      facade.updateRecordField = jest.fn()

      const initialContacts = [
        { firstName: 'Old', lastName: 'Contact', email: 'old@example.com' },
        {
          firstName: 'Second',
          lastName: 'Contact',
          email: 'second@example.com',
        },
      ]

      ;(facade.record$ as BehaviorSubject<any>).next({
        ...simpleReuseRecordFixture(),
        contactsForResource: initialContacts,
      })

      fixture.detectChanges()

      const updatedContact = {
        firstName: 'New',
        lastName: 'Contact',
        email: 'new@example.com',
        role: 'point_of_contact' as const,
        organization: { name: 'New Org' },
      }

      component.handleContactChange(updatedContact as any)

      expect(facade.updateRecordField).toHaveBeenCalledWith(
        'contactsForResource',
        [updatedContact, initialContacts[1]]
      )
    })
  })

  describe('notifications', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('shows an error notification on save error', () => {
      ;(facade.saveError$ as any).next(new Error('something went wrong'))
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'error',
          title: 'editor.record.light.saveError.title',
          text: 'editor.record.light.saveError.body something went wrong',
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
          title: 'editor.record.light.saveSuccess.title',
          text: 'editor.record.light.saveSuccess.body',
        },
        2500
      )
    })
  })
})
