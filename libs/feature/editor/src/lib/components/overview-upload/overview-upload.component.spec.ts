import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateModule } from '@ngx-translate/core'
import { MockProviders } from 'ng-mocks'
import { of, throwError } from 'rxjs'
import { OverviewUploadComponent } from './overview-upload.component'

const metadataUuid = '8505d991-e38f-4704-a47a-e7d335dfbef5'
const imageFileName = 'doge.jpg'
const imageUrl = `http://localhost:8080/geonetwork/srv/api/records/${metadataUuid}/attachments/${imageFileName}`

describe('OverviewUploadComponent', () => {
  let component: OverviewUploadComponent
  let fixture: ComponentFixture<OverviewUploadComponent>
  let recordsApiService: RecordsApiService
  let notificationsService: NotificationsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverviewUploadComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [MockProviders(RecordsApiService, NotificationsService)],
    }).compileComponents()
    recordsApiService = TestBed.inject(RecordsApiService)
    notificationsService = TestBed.inject(NotificationsService)

    fixture = TestBed.createComponent(OverviewUploadComponent)
    component = fixture.componentInstance
    component.metadataUuid = metadataUuid
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('on overview change', () => {
    const otherImageFileName = 'doge.jpg'
    const otherImageUrl = `http://localhost:8080/geonetwork/srv/api/records/${metadataUuid}/attachments/${otherImageFileName}`

    beforeEach(() => {
      recordsApiService.getAllResources = jest
        .fn()
        .mockReturnValue(
          of([{ filename: otherImageFileName, url: otherImageUrl }])
        )
    })
    it('should get all resources corresponding to the metadata UUID, and keep file name on matching URL', () => {
      component.overview = {
        url: new URL(otherImageUrl),
        description: 'some other description',
      }
      fixture.detectChanges()
      expect(recordsApiService.getAllResources).toHaveBeenCalledWith(
        metadataUuid
      )
      expect(component.resourceUrl).toEqual(otherImageUrl)
      expect(component.resourceFileName).toEqual(otherImageFileName)
      expect(component.altText).toEqual('some other description')
    })
  })

  describe('on overview change - null', () => {
    it('should get all resources corresponding to the metadata UUID on init', () => {
      component.overview = null
      fixture.detectChanges()
      expect(component.resourceUrl).toEqual('')
      expect(component.resourceFileName).toEqual('')
      expect(component.altText).toEqual('')
    })
  })

  describe('on overview change with resource error', () => {
    beforeEach(() => {
      const error = new Error('oopsie')
      recordsApiService.getAllResources = jest.fn(() => throwError(() => error))
    })
    it('should show error notification', () => {
      component.overview = {
        url: new URL(imageUrl),
        description: imageFileName,
      }
      fixture.detectChanges()
      expect(notificationsService.showNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'editor.record.resourceError.title',
        text: 'editor.record.resourceError.body oopsie',
        closeMessage: 'editor.record.resourceError.closeMessage',
      })
    })
  })

  describe('on file change', () => {
    beforeEach(() => {
      recordsApiService.putResource = jest
        .fn()
        .mockReturnValue(of({ filename: imageFileName, url: imageUrl }))
    })
    it('should put the file resource on file change, and emit the new overview', () => {
      const overviewChangeSpy = jest.spyOn(component.overviewChange, 'emit')

      const someFile = new File([], 'someFile')
      component.handleFileChange(someFile)
      expect(recordsApiService.putResource).toHaveBeenCalledWith(
        metadataUuid,
        someFile,
        'public'
      )
      expect(overviewChangeSpy).toHaveBeenCalledWith({
        url: new URL(imageUrl),
        description: imageFileName,
      })
    })
  })

  describe('on URL change', () => {
    beforeEach(() => {
      recordsApiService.putResourceFromURL = jest
        .fn()
        .mockReturnValue(of({ filename: imageFileName, url: imageUrl }))
    })
    it('should put the resource from URL on URL change, and emit the new overview', () => {
      const overviewChangeSpy = jest.spyOn(component.overviewChange, 'emit')

      component.handleUrlChange('someUrl')
      expect(recordsApiService.putResourceFromURL).toHaveBeenCalledWith(
        metadataUuid,
        'someUrl',
        'public'
      )
      expect(overviewChangeSpy).toHaveBeenCalledWith({
        url: new URL(imageUrl),
        description: imageFileName,
      })
    })
  })

  describe('on alternative text change', () => {
    beforeEach(() => {
      recordsApiService.getAllResources = jest
        .fn()
        .mockReturnValue(of([{ filename: imageFileName, url: imageUrl }]))
    })
    it('should emit the new overview on alternative text change', () => {
      const overviewChangeSpy = jest.spyOn(component.overviewChange, 'emit')
      const newAltText = 'newAltText'

      component.overview = {
        url: new URL(imageUrl),
        description: 'some description',
      }
      fixture.detectChanges()
      component.handleAltTextChange(newAltText)
      expect(overviewChangeSpy).toHaveBeenCalledWith({
        url: new URL(imageUrl),
        description: newAltText,
      })
    })
  })

  it('should emit a null overview on delete', () => {
    const overviewChangeSpy = jest.spyOn(component.overviewChange, 'emit')

    component.handleDelete()
    expect(overviewChangeSpy).toHaveBeenCalledWith(null)
  })
})
