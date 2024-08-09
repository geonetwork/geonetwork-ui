import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { OverviewUploadComponent } from './overview-upload.component'

const imageFileName = 'doge.jpg'
const imageUrl =
  'http://localhost:8080/geonetwork/srv/api/records/8698bf0b-fceb-4f0f-989b-111e7c4af0a4/attachments/doge.jpg'

class RecordsApiServiceMock {
  getAllResources = jest.fn(() =>
    of([
      {
        filename: imageFileName,
        url: imageUrl,
      },
    ])
  )
  putResource = jest.fn(() =>
    of({
      filename: imageFileName,
      url: imageUrl,
    })
  )
  putResourceFromURL = jest.fn(() =>
    of({ filename: imageFileName, url: imageUrl })
  )
  delResource = jest.fn(() => of(void 0))
}

const metadataUuid = '8505d991-e38f-4704-a47a-e7d335dfbef5'

describe('OverviewUploadComponent', () => {
  let component: OverviewUploadComponent
  let fixture: ComponentFixture<OverviewUploadComponent>
  let recordsApiService: RecordsApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverviewUploadComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: RecordsApiService,
          useClass: RecordsApiServiceMock,
        },
      ],
    }).compileComponents()
    recordsApiService = TestBed.inject(RecordsApiService)

    fixture = TestBed.createComponent(OverviewUploadComponent)
    component = fixture.componentInstance
    component.metadataUuid = metadataUuid
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get all resources corresponding to the metadata UUID on init', () => {
    fixture.detectChanges()
    expect(recordsApiService.getAllResources).toHaveBeenCalledWith(metadataUuid)
    expect(component.resourceAltText).toEqual(imageFileName)
    expect(component.resourceFileName).toEqual(imageFileName)
    expect(component.resourceUrl).toEqual(imageUrl)
  })

  it('should put the file resource on file change', () => {
    const someFile = new File([], 'someFile')
    component.handleFileChange(someFile)
    expect(recordsApiService.putResource).toHaveBeenCalledWith(
      metadataUuid,
      someFile,
      'public'
    )
    expect(component.resourceAltText).toEqual(imageFileName)
    expect(component.resourceUrl).toEqual(imageUrl)
  })

  it('should put the file resource on alt text change', () => {
    const altTextChangeSpy = jest.spyOn(component.overviewChange, 'emit')

    const newAltText = 'newAltText'
    const newImageUrl = new URL(imageUrl)

    component.handleAltTextChange(newAltText)
    expect(altTextChangeSpy).toHaveBeenCalledWith({
      description: newAltText,
      url: newImageUrl,
    })
    expect(component.resourceAltText).toEqual('newAltText')
  })

  it('should put the resource from URL on URL change', () => {
    component.handleUrlChange('someUrl')
    expect(recordsApiService.putResourceFromURL).toHaveBeenCalledWith(
      metadataUuid,
      'someUrl',
      'public'
    )
    expect(component.resourceAltText).toEqual(imageFileName)
    expect(component.resourceUrl).toEqual(imageUrl)
  })

  it('should delete the resource corresponding to the metadata UUID on delete', () => {
    component.resourceAltText = 'filenameDelete'
    component.handleDelete()
    expect(recordsApiService.delResource).toHaveBeenCalledWith(
      metadataUuid,
      imageFileName
    )
    expect(component.resourceAltText).toEqual('')
    expect(component.resourceUrl).toEqual('')
  })
})
