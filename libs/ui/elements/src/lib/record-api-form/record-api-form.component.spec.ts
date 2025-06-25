import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordApiFormComponent } from './record-api-form.component'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { firstValueFrom } from 'rxjs'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const mockDatasetServiceDistribution: DatasetServiceDistribution = {
  url: new URL('https://api.example.com/data'),
  type: 'service',
  accessServiceProtocol: 'ogcFeatures',
  name: 'mockFeatureType',
}

jest.mock('@camptocamp/ogc-client', () => ({
  OgcApiEndpoint: class {
    collections_ = [{ name: 'uniqueCollection' }]
    constructor(private url) {}
    get allCollections() {
      if (this.url.toString().includes('multiple')) {
        return Promise.resolve([
          { name: 'firstCollection' },
          { name: 'otherCollection' },
        ])
      }
      return Promise.resolve(this.collections_)
    }
    getCollectionInfo(collectionId) {
      return Promise.resolve({
        id: collectionId,
        itemFormats: [
          'application/geo+json',
          'application/json',
          'text/csv',
          'application/json',
        ],
      })
    }
    getCollectionItemsUrl(collectionName, options) {
      const queryParams = new URLSearchParams()
      if (options.limit !== undefined) queryParams.set('limit', options.limit)
      if (options.offset !== undefined)
        queryParams.set('offset', options.offset)
      if (options.outputCrs !== undefined)
        queryParams.set('crs', options.outputCrs)
      queryParams.set('f', options.outputFormat)
      return `${
        this.url
      }/collections/${collectionName}/items?${queryParams.toString()}`
    }
  },
  WfsEndpoint: class {
    constructor(private url) {}
    async isReady() {
      return Promise.resolve(true)
    }
    getFeatureUrl(featureType, options) {
      return `${this.url}?type=${featureType}&options=${JSON.stringify(
        options
      )}`
    }
    getServiceInfo() {
      return Promise.resolve({
        outputFormats: [
          'application/geo+json',
          'application/json',
          'text/csv',
          'application/json',
        ],
      })
    }
    supportsStartIndex() {
      return true
    }
  },
}))

describe('RecordApiFormComponent', () => {
  let component: RecordApiFormComponent
  let fixture: ComponentFixture<RecordApiFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
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
      expect(component.limit$.getValue()).toBe('-1')
      expect(component.format$.getValue()).toBe('application/json')
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        'https://api.example.com/data/collections/uniqueCollection/items?limit=-1&f=application%2Fjson'
      )
    })
  })
  describe('When URL params are changed', () => {
    it('should update query URL correctly when setting offset, limit, and format', async () => {
      const mockOffset = '10'
      const mockLimit = '20'
      const mockFormat = 'text/csv'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data/collections/uniqueCollection/items?limit=${mockLimit}&offset=${mockOffset}&f=${encodeURIComponent(mockFormat)}`
      )
    })
    it('should remove the param in url if value is null', async () => {
      const mockOffset = '0'
      const mockLimit = '20'
      const mockFormat = 'application/json'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data/collections/uniqueCollection/items?limit=${mockLimit}&offset=${mockOffset}&f=${encodeURIComponent(mockFormat)}`
      )
    })
    it('should remove the param in url if value is zero', async () => {
      const mockOffset = '10'
      const mockLimit = '0'
      const mockFormat = 'application/json'
      component.setOffset(mockOffset)
      component.setLimit(mockLimit)
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data/collections/uniqueCollection/items?limit=${mockLimit}&offset=${mockOffset}&f=${encodeURIComponent(mockFormat)}`
      )
    })

    describe('when multiple collections available', () => {
      it('uses the link name', async () => {
        component.apiLink = {
          ...mockDatasetServiceDistribution,
          url: new URL('https://api.example.com/multiple'),
          name: 'myCollection',
        }
        fixture.detectChanges()
        const url = await firstValueFrom(component.apiQueryUrl$)
        expect(url).toBe(
          `https://api.example.com/multiple/collections/myCollection/items?limit=-1&f=application%2Fjson`
        )
      })
    })
  })

  describe('#resetUrl', () => {
    it('should reset URL to default parameters', () => {
      component.resetUrl()
      expect(component.offset$.getValue()).toBe('')
      expect(component.limit$.getValue()).toBe('-1')
      expect(component.format$.getValue()).toBe('application/json')
    })
  })

  describe('#parseOutputFormats', () => {
    beforeEach(() => {
      const url = 'https://api.example.com/data?'
      component.apiBaseUrl = url
    })
    it('should parse the returned formats', () => {
      component.parseOutputFormats()
      expect(component.outputFormats).toEqual([
        { value: 'text/csv', label: 'CSV' },
        { value: 'application/geo+json', label: 'GEOJSON' },
        { value: 'application/json', label: 'JSON' },
      ])
    })
  })

  describe('When panel is opened and accessServiceProtocol is wfs', () => {
    beforeEach(() => {
      component.apiLink = {
        ...mockDatasetServiceDistribution,
        accessServiceProtocol: 'wfs',
      }
      fixture.detectChanges()
    })

    it('should set the links and initial values correctly', async () => {
      expect(component.apiBaseUrl).toBe('https://api.example.com/data')
      expect(component.accessServiceProtocol).toBe('wfs')
      expect(component.offset$.getValue()).toBe('')
      expect(component.limit$.getValue()).toBe('-1')
      expect(component.format$.getValue()).toBe('application/json')
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?type=mockFeatureType&options={"outputFormat":"application/json","outputCrs":"EPSG:4326"}`
      )
    })
    it('should set maxFeatures if a limit is set', async () => {
      component.setLimit('12')
      expect(component.limit$.getValue()).toBe('12')
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?type=mockFeatureType&options={"outputFormat":"application/json","maxFeatures":12,"outputCrs":"EPSG:4326"}`
      )
    })
    it('should set outputCrs if format is geojson', async () => {
      const mockFormat = 'application/geo+json'
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?type=mockFeatureType&options={"outputFormat":"application/geo+json","outputCrs":"EPSG:4326"}`
      )
    })
    it('should not set outputCrs if not a json format', async () => {
      const mockFormat = 'text/csv'
      component.setFormat(mockFormat)
      const url = await firstValueFrom(component.apiQueryUrl$)
      expect(url).toBe(
        `https://api.example.com/data?type=mockFeatureType&options={"outputFormat":"text/csv"}`
      )
    })
  })

  describe('When apiLink input is undefined', () => {
    it('should not call parseOutputFormats()', () => {
      const spy = jest.spyOn(component, 'parseOutputFormats')
      component.apiLink = undefined
      fixture.detectChanges()
      expect(spy).not.toHaveBeenCalled()
    })
  })
})
