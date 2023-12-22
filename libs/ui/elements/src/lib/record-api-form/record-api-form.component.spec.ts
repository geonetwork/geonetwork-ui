import { TestBed, ComponentFixture } from '@angular/core/testing'
import { RecordApiFormComponent } from './record-api-form.component'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { firstValueFrom } from 'rxjs'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'

const mockDatasetServiceDistribution: DatasetServiceDistribution = {
  url: new URL('https://api.example.com/data'),
  type: 'service',
  accessServiceProtocol: 'ogcFeatures',
}

describe('RecordApFormComponent', () => {
  let component: RecordApiFormComponent
  let fixture: ComponentFixture<RecordApiFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordApiFormComponent],
      imports: [UiInputsModule, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordApiFormComponent)
    component = fixture.componentInstance
    component.apiLink = mockDatasetServiceDistribution
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('When panel is opened', () => {
    it('should set the links and initial values correctly', async () => {
      expect(component.apiBaseUrl).toBe('https://api.example.com/data')
      expect(component.offset$.getValue()).toBe('')
      expect(component.limit$.getValue()).toBe('')
      expect(component.format$.getValue()).toBe('json')
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe('https://api.example.com/data?f=json')
    })
  })
  describe('When URL params are changed', () => {
    it('should update query URL correctly when setting offset, limit, and format', async () => {
      const mockOffset = '10'
      const mockLimit = '20'
      const mockFormat = 'json'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?offset=${mockOffset}&limit=${mockLimit}&f=${mockFormat}`
      )
    })
    it('should remove the param in url if value is null', async () => {
      const mockOffset = null
      const mockLimit = '20'
      const mockFormat = 'json'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?limit=${mockLimit}&f=${mockFormat}`
      )
    })
    it('should remove the param in url if value is zero', async () => {
      const mockOffset = '10'
      const mockLimit = '0'
      const mockFormat = 'json'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?offset=${mockOffset}&f=${mockFormat}`
      )
    })
  })

  describe('#resetUrl', () => {
    it('should reset URL to default parameters', () => {
      component.resetUrl()
      expect(component.offset$.getValue()).toBe('')
      expect(component.limit$.getValue()).toBe('')
      expect(component.format$.getValue()).toBe('json')
    })
  })
})
