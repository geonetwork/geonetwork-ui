import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromOgcApiComponent } from './add-layer-from-ogc-api.component'
import { MapFacade } from '../+state/map.facade'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { MapContextLayerTypeEnum } from '../map-context/map-context.model'

jest.mock('@camptocamp/ogc-client', () => ({
  OgcApiEndpoint: class {
    constructor(private url) {}
    isReady() {
      if (this.url.indexOf('error') > -1) {
        return Promise.reject(new Error('Something went wrong'))
      }
      if (this.url.indexOf('wait') > -1) {
        return new Promise(() => {
          // do nothing
        })
      }
      return Promise.resolve(this)
    }
    get featureCollections() {
      if (this.url.includes('error')) {
        return Promise.reject(new Error('Simulated loading error'))
      }
      return Promise.resolve(['layer1', 'layer2', 'layer3'])
    }
    getCollectionItemsUrl(collectionId) {
      return Promise.resolve(
        `http://example.com/collections/${collectionId}/items`
      )
    }
  },
}))

describe('AddLayerFromOgcApiComponent', () => {
  let component: AddLayerFromOgcApiComponent
  let fixture: ComponentFixture<AddLayerFromOgcApiComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), AddLayerFromOgcApiComponent],
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(AddLayerFromOgcApiComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.errorMessage).toBeFalsy()
    expect(component.loading).toBe(false)
    expect(component.layers.length).toBe(0)
  })

  describe('loadLayers', () => {
    it('should clear layers if OGC URL is empty', async () => {
      component.ogcUrl = ''
      await component.loadLayers()
      expect(component.layers.length).toBe(0)
    })

    it('should load layers on valid OGC API service', async () => {
      component.ogcUrl = 'http://example.com/ogc'
      await component.loadLayers()
      expect(component.errorMessage).toBeFalsy()
      expect(component.loading).toBe(false)
      expect(component.layers).toEqual(['layer1', 'layer2', 'layer3'])
    })

    it('should handle errors while loading layers', async () => {
      component.ogcUrl = 'http://example.com/error'
      await component.loadLayers()
      expect(component.errorMessage).toContain('Error loading layers:')
      expect(component.loading).toBe(false)
      expect(component.layers.length).toBe(0)
    })
  })
})
