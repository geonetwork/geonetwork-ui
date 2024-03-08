import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordsApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { OverviewUploadComponent } from './overview-upload.component'

class RecordsApiServiceMock {
  getAllResources = jest.fn(() =>
    of([{ filename: 'filenameGet', url: 'urlGet' }])
  )
  putResource = jest.fn(() => of({ filename: 'filenamePut', url: 'urlPut' }))
  putResourceFromURL = jest.fn(() =>
    of({ filename: 'filenamePutUrl', url: 'urlPutUrl' })
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
    expect(recordsApiService.getAllResources).toHaveBeenCalledWith(metadataUuid)
    expect(component.resourceFileName).toEqual('filenameGet')
    expect(component.resourceUrl).toEqual('urlGet')
  })

  it('should put the file resource on file change', () => {
    const someFile = new File([], 'someFile')
    component.handleFileChange(someFile)
    expect(recordsApiService.putResource).toHaveBeenCalledWith(
      metadataUuid,
      someFile,
      'public'
    )
    expect(component.resourceFileName).toEqual('filenamePut')
    expect(component.resourceUrl).toEqual('urlPut')
  })

  it('should put the resource from URL on URL change', () => {
    component.handleUrlChange('someUrl')
    expect(recordsApiService.putResourceFromURL).toHaveBeenCalledWith(
      metadataUuid,
      'someUrl',
      'public'
    )
    expect(component.resourceFileName).toEqual('filenamePutUrl')
    expect(component.resourceUrl).toEqual('urlPutUrl')
  })

  it('should delete the resource corresponding to the metadata UUID on delete', () => {
    component.resourceFileName = 'filenameDelete'
    component.handleDelete()
    expect(recordsApiService.delResource).toHaveBeenCalledWith(
      metadataUuid,
      'filenameDelete'
    )
    expect(component.resourceFileName).toBeNull()
    expect(component.resourceUrl).toBeNull()
  })
})
