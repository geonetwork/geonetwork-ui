import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldAttachedResourcesComponent } from './form-field-attached-resources.component'
import { LINK_FIXTURES } from '@geonetwork-ui/common/fixtures'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { TranslateModule } from '@ngx-translate/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { Subject } from 'rxjs'

let uploadSubject: Subject<any>
class PlatformServiceInterfaceMock {
  attachFileToRecord = jest.fn(() => {
    uploadSubject = new Subject()
    return uploadSubject
  })
}

describe('FormFieldAttachedResourcesComponent', () => {
  let component: FormFieldAttachedResourcesComponent
  let fixture: ComponentFixture<FormFieldAttachedResourcesComponent>
  let notificationsService: NotificationsService
  let platformService: PlatformServiceInterface

  beforeEach(() => {
    return MockBuilder(FormFieldAttachedResourcesComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
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
    fixture = TestBed.createComponent(FormFieldAttachedResourcesComponent)
    component = fixture.componentInstance
    component.metadataUuid = '12345'
    component.value = [
      LINK_FIXTURES.readmeLink,
      LINK_FIXTURES.dataCsv,
      LINK_FIXTURES.geodataWms,
      LINK_FIXTURES.doiLink,
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('linkResources', () => {
    it('gives an array of link resources', () => {
      expect(component.linkResources).toEqual([
        LINK_FIXTURES.readmeLink,
        LINK_FIXTURES.doiLink,
      ])
    })
  })
  describe('handleFileChange', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('calls attachFileToRecord and emits the new resource along with the other ones', () => {
      const file = new File([''], 'test-file.txt')
      expect(component.uploadProgress).toBeUndefined()
      component.handleFileChange(file)
      expect(platformService.attachFileToRecord).toHaveBeenCalledWith(
        '12345',
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
          url: new URL('http://example.com/test-file.txt'),
          fileName: 'test-file.txt',
        },
      })
      expect(component.uploadProgress).toBeUndefined()
      expect(valueChange).toEqual([
        LINK_FIXTURES.readmeLink,
        LINK_FIXTURES.dataCsv,
        LINK_FIXTURES.geodataWms,
        LINK_FIXTURES.doiLink,
        {
          url: new URL('http://example.com/test-file.txt'),
          type: 'link',
          name: 'test-file.txt',
        },
      ])
    })

    it('shows notification on upload error', () => {
      const file = new File([''], 'test-file.txt')
      expect(component.uploadProgress).toBeUndefined()
      component.handleFileChange(file)
      uploadSubject.error(new Error('something went wrong'))
      expect(notificationsService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        closeMessage: 'editor.record.onlineResourceError.closeMessage',
        text: 'editor.record.onlineResourceError.body something went wrong',
        title: 'editor.record.onlineResourceError.title',
      })
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
        LINK_FIXTURES.readmeLink,
        LINK_FIXTURES.dataCsv,
        LINK_FIXTURES.geodataWms,
        LINK_FIXTURES.doiLink,
        {
          url: new URL('http://my.org/aaa/file.png'),
          type: 'link',
          name: 'file.png',
        },
      ])
    })
  })
  describe('handleResourcesChange', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
    })
    it('emits the new resources along with the other ones', () => {
      component.handleResourcesChange([
        LINK_FIXTURES.landingPage,
        LINK_FIXTURES.doiLink,
        LINK_FIXTURES.readmeLink,
      ])
      expect(valueChange).toEqual([
        LINK_FIXTURES.dataCsv,
        LINK_FIXTURES.geodataWms,
        LINK_FIXTURES.landingPage,
        LINK_FIXTURES.doiLink,
        LINK_FIXTURES.readmeLink,
      ])
    })
  })
})
