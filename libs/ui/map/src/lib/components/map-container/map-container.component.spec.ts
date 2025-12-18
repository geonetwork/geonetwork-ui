import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MockBuilder } from 'ng-mocks'
import {
  mapCtxFixture,
  mapCtxLayerWmsFixture,
  mapCtxLayerXyzFixture,
} from '@geonetwork-ui/common/fixtures'
import { applyContextDiffToMap } from '@geospatial-sdk/openlayers'
import { MapContainerComponent } from './map-container.component.js'
import { computeMapContextDiff } from '@geospatial-sdk/core'

jest.mock('@geospatial-sdk/core', () => ({
  computeMapContextDiff: jest.fn(() => ({
    'this is': 'a diff',
  })),
}))

jest.mock('@geospatial-sdk/openlayers', () => ({
  applyContextDiffToMap: jest.fn(),
  createMapFromContext: jest.fn(() => Promise.resolve(new OpenLayersMapMock())),
  listen: jest.fn(),
}))

jest.mock('ol/proj', () => ({
  transformExtent: jest.fn((extent) => extent),
}))

let mapmutedCallback
let movestartCallback
let singleclickCallback
class OpenLayersMapMock {
  _size = undefined
  setTarget = jest.fn()
  updateSize() {
    this._size = [100, 100]
  }
  getSize() {
    return this._size
  }
  getView() {
    return {
      calculateExtent: jest.fn(() => [0, 0, 100, 100]),
      getProjection: jest.fn(() => 'EPSG:3857'),
    }
  }
  on(type, callback) {
    if (type === 'mapmuted') {
      mapmutedCallback = callback
    }
    if (type === 'movestart') {
      movestartCallback = callback
    }
    if (type === 'singleclick') {
      singleclickCallback = callback
    }
  }
  off() {
    // do nothing!
  }
}

const defaultBaseMap = {
  attributions:
    '<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>',
  type: 'xyz',
  url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
}

describe('MapContainerComponent', () => {
  let component: MapContainerComponent
  let fixture: ComponentFixture<MapContainerComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    return MockBuilder(MapContainerComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })

  describe('#processContext', () => {
    it('returns a default context if null provided', () => {
      expect(component.processContext(null)).toEqual({
        layers: [defaultBaseMap],
        view: {
          center: [0, 15],
          zoom: 2,
        },
      })
    })
    it('adds base layers to context', () => {
      const context = {
        layers: [mapCtxLayerWmsFixture()],
        view: null,
      }
      expect(component.processContext(context)).toEqual({
        layers: [defaultBaseMap, mapCtxLayerWmsFixture()],
        view: {
          center: [0, 15],
          zoom: 2,
        },
      })
    })
    it('uses provided basemaps if any', () => {
      component['basemapLayers'] = [mapCtxLayerXyzFixture()]
      const context = { layers: [], view: null }
      expect(component.processContext(context)).toEqual({
        layers: [defaultBaseMap, mapCtxLayerXyzFixture()],
        view: {
          center: [0, 15],
          zoom: 2,
        },
      })
    })
    it('does not use the default base layer if specified', () => {
      component['doNotUseDefaultBasemap'] = true
      const context = { layers: [mapCtxLayerXyzFixture()], view: null }
      expect(component.processContext(context)).toEqual({
        layers: [mapCtxLayerXyzFixture()],
        view: {
          center: [0, 15],
          zoom: 2,
        },
      })
    })
    it('applies map constraints if any', () => {
      component['mapViewConstraints'] = {
        maxZoom: 18,
        maxExtent: [10, 20, 30, 40],
      }
      const context = { layers: [mapCtxLayerXyzFixture()], view: null }
      expect(component.processContext(context)).toEqual({
        layers: [defaultBaseMap, mapCtxLayerXyzFixture()],
        view: {
          center: [0, 15],
          zoom: 2,
          maxExtent: [10, 20, 30, 40],
          maxZoom: 18,
        },
      })
    })
  })

  describe('#afterViewInit', () => {
    beforeEach(async () => {
      await component.ngAfterViewInit()
    })
    it('creates a map', () => {
      expect(component.olMap).toBeInstanceOf(OpenLayersMapMock)
    })
    describe('resolvedExtentChange emission', () => {
      it('emits resolvedExtentChange on init if the output is subscribed to', async () => {
        const emittedExtents: number[][] = []
        const newFixture = TestBed.createComponent(MapContainerComponent)
        const newComponent = newFixture.componentInstance
        newComponent.resolvedExtentChange.subscribe((extent) =>
          emittedExtents.push(extent)
        )
        newFixture.detectChanges()
        // Wait for the async ngAfterViewInit to complete
        await newFixture.whenStable()
        expect(emittedExtents).toEqual([[0, 0, 100, 100]])
      })
      it('does not emit resolvedExtentChange on init if the output is not subscribed to', async () => {
        const newFixture = TestBed.createComponent(MapContainerComponent)
        const newComponent = newFixture.componentInstance
        const emitSpy = jest.spyOn(
          newComponent._resolvedExtentChange || {
            emit: jest.fn(),
          },
          'emit'
        )
        newFixture.detectChanges()
        await newFixture.whenStable()
        expect(emitSpy).not.toHaveBeenCalled()
      })
    })
    describe('display message that map navigation has been muted', () => {
      let messageDisplayed
      beforeEach(() => {
        messageDisplayed = null
        component.displayMessage$.subscribe(
          (value) => (messageDisplayed = value)
        )
      })
      it('mapmuted event displays message after 300ms (delay for eventually hiding message)', fakeAsync(() => {
        mapmutedCallback()
        tick(400)
        expect(messageDisplayed).toEqual(true)
        discardPeriodicTasks()
      }))
      it('message goes away after 2s', fakeAsync(() => {
        mapmutedCallback()
        tick(2500)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
      it('message does not display if map fires movestart event', fakeAsync(() => {
        movestartCallback()
        tick(300)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
      it('message does not display if map fires singleclick event', fakeAsync(() => {
        singleclickCallback()
        tick(300)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
    })
  })

  describe('#ngOnChanges', () => {
    beforeEach(async () => {
      await component.ngAfterViewInit()
    })
    it('updates the map with the new context', async () => {
      const newContext = {
        ...mapCtxFixture(),
        layers: [mapCtxLayerWmsFixture()],
      }
      await component.ngOnChanges({
        context: {
          currentValue: mapCtxFixture(),
          previousValue: newContext,
          firstChange: false,
          isFirstChange: () => false,
        },
      })
      expect(computeMapContextDiff).toHaveBeenCalledWith(
        {
          layers: [defaultBaseMap, ...mapCtxFixture().layers],
          view: mapCtxFixture().view,
        },
        {
          layers: [defaultBaseMap, mapCtxLayerWmsFixture()],
          view: mapCtxFixture().view,
        }
      )
      expect(applyContextDiffToMap).toHaveBeenCalledWith(component.olMap, {
        'this is': 'a diff',
      })
    })
    describe('resolvedExtentChange emission on view changes', () => {
      it('emits resolvedExtentChange when viewChanges is true and output is subscribed to', async () => {
        const emittedExtents: number[][] = []
        const newFixture = TestBed.createComponent(MapContainerComponent)
        const newComponent = newFixture.componentInstance
        newComponent.resolvedExtentChange.subscribe((extent) =>
          emittedExtents.push(extent)
        )
        newFixture.detectChanges()
        await newFixture.whenStable()

        // Mock the diff to include viewChanges
        ;(computeMapContextDiff as jest.Mock).mockReturnValueOnce({
          viewChanges: { zoom: 5 },
        })

        const newContext = {
          ...mapCtxFixture(),
          view: { ...mapCtxFixture().view, zoom: 5 },
        }
        await newComponent.ngOnChanges({
          context: {
            currentValue: newContext,
            previousValue: mapCtxFixture(),
            firstChange: false,
            isFirstChange: () => false,
          },
        })

        // Should have emitted twice: once on init, once on view change
        expect(emittedExtents).toEqual([
          [0, 0, 100, 100],
          [0, 0, 100, 100],
        ])
      })
      it('does not emit resolvedExtentChange when viewChanges is false', async () => {
        const emittedExtents: number[][] = []
        const newFixture = TestBed.createComponent(MapContainerComponent)
        const newComponent = newFixture.componentInstance
        newComponent.resolvedExtentChange.subscribe((extent) =>
          emittedExtents.push(extent)
        )
        newFixture.detectChanges()
        await newFixture.whenStable()

        // Mock the diff with no viewChanges
        ;(computeMapContextDiff as jest.Mock).mockReturnValueOnce({
          layerChanges: [{ type: 'add' }],
        })

        const newContext = {
          ...mapCtxFixture(),
          layers: [mapCtxLayerWmsFixture()],
        }
        await newComponent.ngOnChanges({
          context: {
            currentValue: newContext,
            previousValue: mapCtxFixture(),
            firstChange: false,
            isFirstChange: () => false,
          },
        })

        // Should have emitted only once on init, not on layer change
        expect(emittedExtents).toEqual([[0, 0, 100, 100]])
      })
      it('does not emit resolvedExtentChange when output is not subscribed to', async () => {
        const newFixture = TestBed.createComponent(MapContainerComponent)
        const newComponent = newFixture.componentInstance
        newFixture.detectChanges()
        await newFixture.whenStable()

        // Mock the diff to include viewChanges
        ;(computeMapContextDiff as jest.Mock).mockReturnValueOnce({
          viewChanges: { zoom: 5 },
        })

        const newContext = {
          ...mapCtxFixture(),
          view: { ...mapCtxFixture().view, zoom: 5 },
        }
        await newComponent.ngOnChanges({
          context: {
            currentValue: newContext,
            previousValue: mapCtxFixture(),
            firstChange: false,
            isFirstChange: () => false,
          },
        })

        // Should not have created the emitter
        expect(newComponent._resolvedExtentChange).toBeNull()
      })
    })
  })
})
