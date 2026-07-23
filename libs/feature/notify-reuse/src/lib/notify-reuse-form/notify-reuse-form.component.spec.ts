import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OverlayContainer } from '@angular/cdk/overlay'
import { NotifyReuseFormComponent } from './notify-reuse-form.component'
import {
  DatasetRecord,
  ReuseRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateService } from '@ngx-translate/core'
import { Observable, of, throwError } from 'rxjs'
import { MockBuilder } from 'ng-mocks'
import { TextInputComponent } from '@geonetwork-ui/ui/inputs'

const REUSE_RECORD: ReuseRecord = {
  uniqueIdentifier: 'test-reuse-001',
  kind: 'reuse',
  title: 'Test reuse record',
  abstract: 'A test reuse record',
  reuseType: 'application',
  lineage: '',
  sourceRecords: [],
  onlineResources: [],
  spatialExtents: [],
  temporalExtents: [],
  contacts: [],
  contactsForResource: [],
  keywords: [],
  topics: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  overviews: [],
  licenses: [],
  ownerOrganization: { name: 'Test Org', translations: {} },
  recordUpdated: new Date('2024-01-01'),
  defaultLanguage: 'fr',
  otherLanguages: [],
}

const DATASET_RECORD: Partial<DatasetRecord> = {
  uniqueIdentifier: 'source-dataset-123',
  kind: 'dataset',
  title: 'Source dataset',
  ownerOrganization: {
    name: 'Owner Org',
    email: 'contact@owner-org.org',
  },
}

class RecordsRepositoryMock {
  saveRecord = jest.fn<Observable<string>, [ReuseRecord]>(() =>
    of('new-reuse-uuid')
  )
}

class PlatformServiceMock {
  getMe = jest.fn(() =>
    of({
      id: '1',
      profile: 'Editor' as const,
      username: 'jdoe',
      name: 'John',
      surname: 'Doe',
      email: 'logged-user@example.com',
    })
  )
}

describe('NotifyReuseFormComponent', () => {
  let component: NotifyReuseFormComponent
  let fixture: ComponentFixture<NotifyReuseFormComponent>
  let recordsRepository: RecordsRepositoryMock
  let overlayContainerElement: HTMLElement

  beforeEach(() =>
    MockBuilder(NotifyReuseFormComponent).keep(TextInputComponent)
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
      ],
    }).compileComponents()

    recordsRepository = TestBed.inject(
      RecordsRepositoryInterface
    ) as unknown as RecordsRepositoryMock
    overlayContainerElement =
      TestBed.inject(OverlayContainer).getContainerElement()

    const translate = TestBed.inject(TranslateService)
    jest.spyOn(translate, 'instant').mockImplementation((key) => `${key}`)

    fixture = TestBed.createComponent(NotifyReuseFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    component.closeOverlay()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should accept a ReuseRecord as input', () => {
    fixture.componentRef.setInput('record', REUSE_RECORD)
    expect(component.record()?.kind).toBe('reuse')
  })

  describe('email pre-fill', () => {
    it('pre-fills the email with the logged-in user email', () => {
      expect(component.email()).toBe('logged-user@example.com')
    })

    it('leaves the email empty when no user is logged in', async () => {
      const platformService = TestBed.inject(
        PlatformServiceInterface
      ) as unknown as PlatformServiceMock
      platformService.getMe.mockReturnValueOnce(of(null))

      const newFixture = TestBed.createComponent(NotifyReuseFormComponent)
      newFixture.detectChanges()

      expect(newFixture.componentInstance.email()).toBe('')
      newFixture.componentInstance.closeOverlay()
    })
  })

  describe('isFormValid()', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('record', null)
      component.openOverlay()
    })

    it('is not filled when fields are empty', () => {
      component.title.set('')
      component.url.set('')
      component.email.set('')
      fixture.detectChanges()
      expect(component.isFormValid()).toBe(false)
    })

    it('is not filled when only whitespace is provided', () => {
      component.title.set('   ')
      component.url.set('   ')
      component.email.set('   ')
      fixture.detectChanges()
      expect(component.isFormValid()).toBe(false)
    })

    it('is not filled when one field is missing', () => {
      component.title.set('My reuse')
      component.url.set('https://example.com')
      component.email.set('')
      fixture.detectChanges()
      expect(component.isFormValid()).toBe(false)
    })

    it('is filled when all fields are filled', () => {
      component.title.set('My reuse')
      component.url.set('https://example.com')
      component.email.set('me@example.com')
      fixture.detectChanges()
      expect(component.isFormValid()).toBe(true)
    })
  })

  describe('clearInputs', () => {
    it('clears title and url and resets email to the logged-in user email', () => {
      component.title.set('My reuse')
      component.url.set('https://example.com')
      component.email.set('changed@example.com')

      component.clearInputs()

      expect(component.title()).toBe('')
      expect(component.url()).toBe('')
      expect(component.email()).toBe('logged-user@example.com')
    })
  })

  describe('overlay', () => {
    it('opens the overlay', () => {
      component.openOverlay()
      expect(overlayContainerElement.textContent).toContain(
        'record.notify.reuse.form.title'
      )
    })

    it('closes the overlay', () => {
      component.openOverlay()
      component.closeOverlay()
      expect(overlayContainerElement.textContent).not.toContain(
        'record.notify.reuse.form.title'
      )
    })

    it('toggles the overlay open then closed', () => {
      component.toggleOverlay()
      expect(overlayContainerElement.textContent).toContain(
        'record.notify.reuse.form.title'
      )
      component.toggleOverlay()
      expect(overlayContainerElement.textContent).not.toContain(
        'record.notify.reuse.form.title'
      )
    })

    it('disposes the overlay on destroy', () => {
      component.openOverlay()
      component.ngOnDestroy()
      expect(overlayContainerElement.textContent).not.toContain(
        'record.notify.reuse.form.title'
      )
    })
  })

  describe('submit', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('record', DATASET_RECORD)
      component.openOverlay()
      component.title.set('My great reuse')
      component.url.set('https://example.com/my-reuse')
      component.email.set('reuser@example.com')
      fixture.detectChanges()
    })

    it('does not save when the form is invalid', () => {
      component.title.set('')
      fixture.detectChanges()
      component.submit()
      expect(recordsRepository.saveRecord).not.toHaveBeenCalled()
    })

    it('saves a reuse record built from the form values', () => {
      component.submit()

      expect(recordsRepository.saveRecord).toHaveBeenCalledTimes(1)
      const saved = recordsRepository.saveRecord.mock.calls[0][0] as ReuseRecord
      expect(saved.kind).toBe('reuse')
      expect(saved.reuseType).toBe('application')
      expect(saved.title).toBe('My great reuse')
      expect(saved.onlineResources).toEqual([
        {
          type: 'link',
          url: new URL('https://example.com/my-reuse'),
          name: 'record.notify.reuse.resource.name',
          description: 'record.notify.reuse.resource.description',
        },
      ])
      expect(saved.contacts).toEqual([
        { email: 'reuser@example.com', role: 'point_of_contact' },
      ])
    })

    it('links the source dataset via sourceRecords', () => {
      component.submit()

      const saved = recordsRepository.saveRecord.mock.calls[0][0] as ReuseRecord
      expect(saved.sourceRecords).toEqual([
        { uuid: 'source-dataset-123', title: 'Source dataset' },
      ])
    })

    it('opens the saved reuse record in the metadata editor', () => {
      component.reuseFormUrl = 'http://my-metadata-editor/'
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

      component.submit()

      expect(openSpy).toHaveBeenCalledWith(
        'http://my-metadata-editor/edit/new-reuse-uuid',
        '_self'
      )
    })

    it('clears the loading state and inputs after a successful save', () => {
      component.openOverlay()
      component.submit()

      expect(component.loading()).toBe(false)
      expect(component.title()).toBe('')
      expect(component.url()).toBe('')
      expect(component.email()).toBe('logged-user@example.com')
      expect(component['overlayRef']).toBeFalsy()
    })

    it('clears the loading state, keeps the overlay open and notifies on error', () => {
      recordsRepository.saveRecord.mockReturnValueOnce(
        throwError(() => new Error('save failed'))
      )
      jest.spyOn(console, 'error').mockImplementation(() => undefined)
      const notificationsService = TestBed.inject(NotificationsService)
      const showNotification = jest.spyOn(
        notificationsService,
        'showNotification'
      )
      component.openOverlay()

      component.submit()

      expect(component.loading()).toBe(false)
      expect(component['overlayRef']).toBeTruthy()
      expect(showNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          title: 'record.notify.reuse.form.error.title',
          text: 'record.notify.reuse.form.error.body',
        }),
        undefined,
        expect.any(Error)
      )
    })
  })
})
