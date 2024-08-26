import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromWmsComponent } from './add-layer-from-wms.component'
import { MapFacade } from '../+state/map.facade'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'

jest.mock('@camptocamp/ogc-client', () => ({
  WmsEndpoint: class {
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
    getLayers() {
      return [
        {
          name: 'layer1',
          title: 'Layer 1',
          children: [
            {
              title: 'Layer 2',
            },
            {
              name: 'layer3',
              title: 'Layer 3',
            },
          ],
        },
      ]
    }
  },
}))

class MapFacadeMock {
  addLayer = jest.fn()
}

describe('AddLayerFromWmsComponent', () => {
  let component: AddLayerFromWmsComponent
  let fixture: ComponentFixture<AddLayerFromWmsComponent>
  let mapFacade: MapFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), AddLayerFromWmsComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerFromWmsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
    expect(component.errorMessage).toBeFalsy()
    expect(component.loading).toBe(false)
    expect(component.layers).toEqual([])
  })

  describe('loadLayers', () => {
    describe('while layers are loading', () => {
      beforeEach(() => {
        component.wmsUrl = 'http://my.service.org/wait'
        component.loadLayers()
      })
      it('shows only a "loading" message', () => {
        expect(component.errorMessage).toBeFalsy()
        expect(component.loading).toBe(true)
        expect(component.layers).toEqual([])
      })
    })
    describe('valid WMS service', () => {
      beforeEach(() => {
        component.wmsUrl = 'http://my.service.org/wms'
        component.loadLayers()
      })
      it('shows a list of layers', () => {
        expect(component.errorMessage).toBeFalsy()
        expect(component.loading).toBe(false)
        expect(component.layers).toEqual([
          {
            name: 'layer1',
            title: 'Layer 1',
            children: expect.any(Array),
          },
        ])
      })
      it('should show an Add layer button for each layer with a name', () => {
        fixture.detectChanges()
        const layerElts = fixture.debugElement.queryAll(
          By.css('.layer-tree-item')
        )
        expect(layerElts.length).toBe(3)
        const hasButtons = layerElts.map(
          (layerElt) => !!layerElt.query(By.css('.layer-add-btn'))
        )
        expect(hasButtons).toEqual([true, false, true])
      })
    })
    describe('an error is received', () => {
      beforeEach(() => {
        component.wmsUrl = 'http://my.service.org/error'
        component.loadLayers().catch(() => {
          // do nothing
        })
      })
      it('shows the error', () => {
        expect(component.errorMessage).toContain('Something went wrong')
        expect(component.loading).toBe(false)
        expect(component.layers).toEqual([])
      })
    })
    describe('error and then valid service', () => {
      beforeEach(async () => {
        component.wmsUrl = 'http://my.service.org/error'
        await component.loadLayers().catch(() => {
          // do nothing
        })
        component.wmsUrl = 'http://my.service.org/wms'
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
      component.wmsUrl = 'http://my.service.org/wms'
      component.addLayer({
        name: 'myLayer',
        title: 'My Layer',
        abstract: 'This is my layer',
      })
    })
    it('adds the selected layer in the current map context', () => {
      expect(mapFacade.addLayer).toHaveBeenCalledWith({
        name: 'myLayer',
        title: 'My Layer',
        type: 'wms',
        url: 'http://my.service.org/wms',
      })
    })
  })
})
