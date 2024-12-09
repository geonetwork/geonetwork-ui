import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromWfsComponent } from './add-layer-from-wfs.component'
import { MapFacade } from '../+state/map.facade'
import { By } from '@angular/platform-browser'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { of } from 'rxjs'
import { mapCtxFixture } from '@geonetwork-ui/common/fixtures'

jest.mock('@camptocamp/ogc-client', () => ({
  WfsEndpoint: class {
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
    getFeatureTypes() {
      return [
        {
          name: 'ft1',
          title: 'Feature Type 1',
        },
        {
          name: 'ft2',
          title: 'Feature Type 2',
        },
        {
          name: 'ft3',
          title: 'Feature Type 3',
        },
      ]
    }
  },
}))

describe('AddLayerFromWfsComponent', () => {
  let component: AddLayerFromWfsComponent
  let fixture: ComponentFixture<AddLayerFromWfsComponent>
  let mapFacade: MapFacade

  beforeEach(() => {
    return MockBuilder(AddLayerFromWfsComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MapFacade, {
          applyContext: jest.fn(),
          context$: of(mapCtxFixture()),
        }),
      ],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerFromWfsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
    expect(component.errorMessage).toBeFalsy()
    expect(component.loading).toBe(false)
    expect(component.layers.length).toBe(0)
  })

  describe('loadLayers', () => {
    describe('while layers are loading', () => {
      beforeEach(() => {
        component.wfsUrl = 'http://my.service.org/wait'
        component.loadLayers()
      })
      it('shows only a "loading" message', () => {
        expect(component.errorMessage).toBeFalsy()
        expect(component.loading).toBe(true)
        expect(component.layers).toEqual([])
      })
    })
    describe('valid WFS service', () => {
      beforeEach(() => {
        component.wfsUrl = 'http://my.service.org/wfs'
        component.loadLayers()
      })
      it('shows all layers', () => {
        expect(component.errorMessage).toBeFalsy()
        expect(component.loading).toBe(false)
        expect(component.layers).toEqual([
          {
            name: 'ft1',
            title: 'Feature Type 1',
          },
          {
            name: 'ft2',
            title: 'Feature Type 2',
          },
          {
            name: 'ft3',
            title: 'Feature Type 3',
          },
        ])
      })
      it('should show a Add button for each layer', () => {
        fixture.detectChanges()
        const layerElts = fixture.debugElement.queryAll(
          By.css('.layer-item-tree')
        )
        expect(layerElts.length).toBe(3)
        const hasButtons = layerElts.map(
          (layerElt) => !!layerElt.query(By.css('.layer-add-btn'))
        )
        expect(hasButtons).toEqual([true, true, true])
      })
    })
    describe('error loading layers', () => {
      beforeEach(() => {
        component.wfsUrl = 'http://my.service.org/error'
        component.loadLayers()
      })
      it('shows an error message', () => {
        expect(component.errorMessage).toBeTruthy()
        expect(component.loading).toBe(false)
        expect(component.layers.length).toBe(0)
      })
    })
    describe('error and then valid service', () => {
      beforeEach(async () => {
        component.wfsUrl = 'http://my.service.org/error'
        await component.loadLayers().catch(() => {
          // do nothing
        })
        component.wfsUrl = 'http://my.service.org/wfs'
        await component.loadLayers()
      })
      it('shows no error', () => {
        expect(component.errorMessage).toBeFalsy()
        expect(component.loading).toBe(false)
        expect(component.layers).not.toEqual([])
      })
    })
  })
  describe('addLayer', () => {
    beforeEach(() => {
      component.wfsUrl = 'http://my.service.org/wfs'
      component.addLayer({
        name: 'ft1',
        title: 'Feature Type 1',
      })
    })
    it('should add the selected layer in the current map context', () => {
      expect(mapFacade.applyContext).toHaveBeenCalledWith({
        ...mapCtxFixture(),
        layers: [
          ...mapCtxFixture().layers,
          {
            featureType: 'ft1',
            label: 'Feature Type 1',
            url: 'http://my.service.org/wfs',
            type: 'wfs',
          },
        ],
      })
    })
  })
})
