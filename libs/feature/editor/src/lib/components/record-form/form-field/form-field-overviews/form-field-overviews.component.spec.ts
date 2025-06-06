import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOverviewsComponent } from './form-field-overviews.component'
import { BehaviorSubject, Subject } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { MockBuilder, MockProvider } from 'ng-mocks'
import {
  PlatformServiceInterface,
  RecordAttachment,
} from '@geonetwork-ui/common/domain/platform.service.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

let uploadSubject: Subject<any>

const recordAttachments = new BehaviorSubject<RecordAttachment[]>([
  {
    url: new URL('https://www.fakedomain.com/test.txt'),
    fileName: 'test.txt',
  },
])

class PlatformServiceInterfaceMock {
  attachFileToRecord = jest.fn(() => {
    uploadSubject = new Subject()
    return uploadSubject
  })
  getRecordAttachments = jest.fn(() => recordAttachments)
}

describe('FormFieldOverviewsComponent', () => {
  let component: FormFieldOverviewsComponent
  let fixture: ComponentFixture<FormFieldOverviewsComponent>
  let notificationsService: NotificationsService
  let platformService: PlatformServiceInterface

  beforeEach(() => {
    return MockBuilder(FormFieldOverviewsComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(
          PlatformServiceInterface,
          PlatformServiceInterfaceMock,
          'useClass'
        ),
        MockProvider(NotificationsService),
      ],
    }).compileComponents()

    notificationsService = TestBed.inject(NotificationsService)
    platformService = TestBed.inject(PlatformServiceInterface)
    fixture = TestBed.createComponent(FormFieldOverviewsComponent)
    component = fixture.componentInstance
    component.metadataUuid = '8505d991-e38f-4704-a47a-e7d335dfbef5'
    component.value = [
      {
        description: 'doge.jpg',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/0.1/records/8505d991-e38f-4704-a47a-e7d335dfbef5/attachments/doge.jpg'
        ),
      },
      {
        description: 'flower.jpg',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/0.1/records/8505d991-e38f-4704-a47a-e7d335dfbef5/attachments/flower.jpg'
        ),
      },
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('handleFileChange', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('calls attachFileToRecord and emits the new overview', () => {
      const file = new File([''], 'test-file.txt')
      expect(component.uploadProgress).toBeUndefined()
      component.handleFileChange(file)
      expect(platformService.attachFileToRecord).toHaveBeenCalledWith(
        '8505d991-e38f-4704-a47a-e7d335dfbef5',
        file
      )
      // uploaded just started
      expect(component.uploadProgress).toEqual(0)
      // 50%
      uploadSubject.next({
        type: 'progress',
        progress: 50,
      })
      expect(component.uploadProgress).toEqual(50)
      // uploaded finished
      uploadSubject.next({
        type: 'success',
        attachment: {
          url: new URL('http://example.com/test.png'),
          fileName: 'test.png',
        },
      })
      expect(component.uploadProgress).toBeUndefined()
      expect(valueChange).toEqual([
        {
          description: 'test',
          url: new URL('http://example.com/test.png'),
        },
      ])
    })

    it('shows notification on upload error', () => {
      const file = new File([''], 'test-file.txt')
      expect(component.uploadProgress).toBeUndefined()
      component.handleFileChange(file)
      uploadSubject.error(new Error('something went wrong'))
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'error',
          closeMessage: 'editor.record.resourceError.closeMessage',
          text: 'editor.record.resourceError.body something went wrong',
          title: 'editor.record.resourceError.title',
        },
        undefined,
        expect.any(Error)
      )
    })
  })

  describe('handleUploadCancel', () => {
    it('cancels an ongoing upload', () => {
      const file = new File([''], 'test-file.txt')
      component.handleFileChange(file)
      uploadSubject.next({
        type: 'progress',
        progress: 50,
      })
      component.handleUploadCancel()
      expect(uploadSubject.observed).toBe(false)
    })
  })
  describe('handleUrlChange', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('emits the new resources along with the other ones', () => {
      component.handleUrlChange('http://my.org/aaa/file.png')
      expect(valueChange).toEqual([
        {
          url: new URL('http://my.org/aaa/file.png'),
          description: 'file.png',
        },
      ])
    })
  })
  describe('handleAltTextChange', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('should emit the new overview on alternative text change', () => {
      const newAltText = 'newAltText'
      component.value = [
        {
          url: new URL('http://my.host.org/aa'),
          description: 'some description',
        },
      ]
      component.handleAltTextChange(newAltText)
      expect(valueChange).toEqual([
        {
          url: new URL('http://my.host.org/aa'),
          description: newAltText,
        },
      ])
    })
  })
  describe('handleDelete', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('should emit an empty overview array on delete', () => {
      component.handleDelete()
      expect(valueChange).toEqual([])
    })
  })
})
