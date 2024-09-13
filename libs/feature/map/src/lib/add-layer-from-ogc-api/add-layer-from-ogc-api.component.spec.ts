import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromOgcApiComponent } from './add-layer-from-ogc-api.component'
import { MockBuilder } from 'ng-mocks'

jest.mock('@camptocamp/ogc-client', () => ({
  OgcApiEndpoint: class {
    constructor(private url) {}
    isReady() {
      if (this.url === 'http://example.com/ogc') {
        return Promise.resolve(this)
      }
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
    get allCollections() {
      if (this.url === 'http://example.com/ogc') {
        return Promise.resolve([
          {
            name: 'NaturalEarth:physical:ne_10m_lakes_pluvial',
            hasVectorTiles: true,
            hasMapTiles: true,
          },
          {
            name: 'NaturalEarth:physical:ne_10m_land_ocean_seams',
            hasVectorTiles: true,
            hasMapTiles: true,
          },
        ])
      }
      if (this.url.includes('error')) {
        return Promise.reject(new Error('Simulated loading error'))
      }
      return Promise.resolve([
        {
          name: 'NaturalEarth:physical:ne_10m_lakes_pluvial',
          hasVectorTiles: true,
          hasMapTiles: true,
        },
        {
          name: 'NaturalEarth:physical:ne_10m_land_ocean_seams',
          hasVectorTiles: true,
          hasMapTiles: true,
        },
      ])
    }
    getCollectionItemsUrl(collectionId) {
      if (this.url === 'http://example.com/ogc') {
        return Promise.resolve(
          `http://example.com/collections/${collectionId}/items`
        )
      }
      return Promise.resolve(
        `http://example.com/collections/${collectionId}/items`
      )
    }
    getVectorTilesetUrl(collectionId) {
      return Promise.resolve(
        `http://example.com/collections/${collectionId}/tiles/vector`
      )
    }
    getMapTilesetUrl(collectionId) {
      return Promise.resolve(
        `http://example.com/collections/${collectionId}/tiles/map`
      )
    }
  },
}))

describe('AddLayerFromOgcApiComponent', () => {
  let component: AddLayerFromOgcApiComponent
  let fixture: ComponentFixture<AddLayerFromOgcApiComponent>

  beforeEach(() => {
    return MockBuilder(AddLayerFromOgcApiComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()

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
      expect(component.layers).toEqual([
        {
          name: 'NaturalEarth:physical:ne_10m_lakes_pluvial',
          hasVectorTiles: true,
          hasMapTiles: true,
        },
        {
          name: 'NaturalEarth:physical:ne_10m_land_ocean_seams',
          hasVectorTiles: true,
          hasMapTiles: true,
        },
      ])
    })

    it('should handle errors while loading layers', async () => {
      component.ogcUrl = 'http://example.com/error'
      await component.loadLayers()
      expect(component.errorMessage).toContain('Error loading layers:')
      expect(component.loading).toBe(false)
      expect(component.layers.length).toBe(0)
    })
  })

  describe('Add Collection', () => {
    it('should add feature type collection to map', async () => {
      const layerAddedSpy = jest.spyOn(component.layerAdded, 'emit')
      await component.addLayer('layer1', 'features')
      expect(layerAddedSpy).toHaveBeenCalledWith({
        collection: 'layer1',
        url: 'http://example.com/collections/layer1/items',
        type: 'ogcapi',
        label: 'layer1',
      })
    })
    it('should add vector tile collection to map', async () => {
      const layerAddedSpy = jest.spyOn(component.layerAdded, 'emit')
      await component.addLayer('layer1', 'vectorTiles')
      expect(layerAddedSpy).toHaveBeenCalledWith({
        collection: 'layer1',
        url: 'http://example.com/collections/layer1/tiles/vector',
        type: 'ogcapi',
        useTiles: 'vector',
        label: 'layer1',
      })
    })
    it('should add map tile collection to map', async () => {
      const layerAddedSpy = jest.spyOn(component.layerAdded, 'emit')
      await component.addLayer('layer1', 'mapTiles')
      expect(layerAddedSpy).toHaveBeenCalledWith({
        collection: 'layer1',
        url: 'http://example.com/collections/layer1/tiles/map',
        type: 'ogcapi',
        useTiles: 'map',
        label: 'layer1',
      })
    })
  })
})
