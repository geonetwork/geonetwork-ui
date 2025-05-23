import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOnlineLinkResourcesComponent } from './form-field-online-link-resources.component'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { MockBuilder, MockProvider } from 'ng-mocks'
import {
  PlatformServiceInterface,
  RecordAttachment,
} from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { BehaviorSubject, Subject } from 'rxjs'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { OnlineLinkResource } from '@geonetwork-ui/common/domain/model/record'
import { ModalDialogComponent } from '@geonetwork-ui/ui/layout'
import { ChangeDetectorRef } from '@angular/core'
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
export class MatDialogMock {
  _subject = new Subject()
  _closeWithValue = (v) => this._subject.next(v)
  open = jest.fn(() => ({
    afterClosed: () => this._subject,
  }))
}

describe('FormFieldOnlineLinkResourcesComponent', () => {
  let component: FormFieldOnlineLinkResourcesComponent
  let fixture: ComponentFixture<FormFieldOnlineLinkResourcesComponent>
  let notificationsService: NotificationsService
  let platformService: PlatformServiceInterface

  beforeEach(() => {
    return MockBuilder(FormFieldOnlineLinkResourcesComponent)
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
        MockProvider(NotificationsService, {
          showNotification: jest.fn(),
        }),
        MockProvider(MatDialogRef),
        MockProvider(ChangeDetectorRef, {
          detectChanges: jest.fn(),
        }),
        MockProvider(MatDialog, MatDialogMock, 'useClass'),
      ],
    }).compileComponents()

    notificationsService = TestBed.inject(NotificationsService)
    platformService = TestBed.inject(PlatformServiceInterface)
    fixture = TestBed.createComponent(FormFieldOnlineLinkResourcesComponent)
    component = fixture.componentInstance
    component.metadataUuid = '12345'
    component.value = [
      aSetOfLinksFixture().readmeLink(),
      aSetOfLinksFixture().dataCsv(),
      aSetOfLinksFixture().geodataWms(),
      aSetOfLinksFixture().doiLink(),
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('linkResources', () => {
    it('gives an array of link resources', () => {
      expect(component.linkResources).toEqual([
        aSetOfLinksFixture().readmeLink(),
        aSetOfLinksFixture().doiLink(),
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
        aSetOfLinksFixture().readmeLink(),
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().geodataWms(),
        aSetOfLinksFixture().doiLink(),
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
      expect(notificationsService.showNotification).toHaveBeenCalledWith(
        {
          type: 'error',
          closeMessage: 'editor.record.onlineResourceError.closeMessage',
          text: 'editor.record.onlineResourceError.body something went wrong',
          title: 'editor.record.onlineResourceError.title',
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
        aSetOfLinksFixture().readmeLink(),
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().geodataWms(),
        aSetOfLinksFixture().doiLink(),
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
        aSetOfLinksFixture().landingPage(),
        aSetOfLinksFixture().doiLink(),
        aSetOfLinksFixture().readmeLink(),
      ])
      expect(valueChange).toEqual([
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().geodataWms(),
        aSetOfLinksFixture().landingPage(),
        aSetOfLinksFixture().doiLink(),
        aSetOfLinksFixture().readmeLink(),
      ])
    })
  })
  describe('handleResourceModify', () => {
    let valueChange
    beforeEach(() => {
      valueChange = null
      component.valueChange.subscribe((v) => (valueChange = v))
      component.handleResourceModify(
        {
          ...aSetOfLinksFixture().doiLink(),
          name: 'Changed name',
        } as OnlineLinkResource,
        1
      )
    })
    it('opens a dialog to edit the resource', () => {
      const matDialog = TestBed.inject(MatDialog)
      const call = (matDialog.open as jest.Mock).mock.calls[0]
      expect(call[0]).toEqual(ModalDialogComponent)
      expect(call[1].data.bodyContext).toEqual({
        ...aSetOfLinksFixture().doiLink(),
        name: 'Changed name',
      })
    })
    it('if confirmed, the resource is updated', () => {
      const matDialog = TestBed.inject(MatDialog) as unknown as MatDialogMock
      matDialog._closeWithValue(true)
      expect(valueChange).toEqual([
        aSetOfLinksFixture().dataCsv(),
        aSetOfLinksFixture().geodataWms(),
        // links are appended to the end
        aSetOfLinksFixture().readmeLink(),
        { ...aSetOfLinksFixture().doiLink(), name: 'Changed name' },
      ])
    })
    it('if canceled, nothing happens', () => {
      const matDialog = TestBed.inject(MatDialog) as unknown as MatDialogMock
      matDialog._closeWithValue(false)
      expect(valueChange).toBe(null)
    })
  })
})
