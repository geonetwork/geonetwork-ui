import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapStateContainerComponent } from './map-state-container.component'
import { MapFacade } from '../+state/map.facade'
import { of } from 'rxjs'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { mapCtxLayerXyzFixture } from '@geonetwork-ui/common/fixtures'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { By } from '@angular/platform-browser'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'

describe('MapContainerComponent', () => {
  let component: MapStateContainerComponent
  let fixture: ComponentFixture<MapStateContainerComponent>
  let mapFacade: MapFacade

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    return MockBuilder(MapStateContainerComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MapFacade, {
          context$: of({
            layers: [mapCtxLayerXyzFixture()],
            view: null,
          }),
          selectFeatures: jest.fn(),
          clearFeatureSelection: jest.fn(),
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(MapStateContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('context$', () => {
    it('gives the context to the map container', async () => {
      const mapContainer = fixture.debugElement.query(
        By.directive(MapContainerComponent)
      )
      expect(mapContainer.componentInstance.context).toStrictEqual({
        layers: [mapCtxLayerXyzFixture()],
        view: null,
      })
    })
  })

  describe('handleFeaturesClicked', () => {
    it('select features on click', () => {
      component.handleFeaturesClicked([
        { type: 'Feature', geometry: null, properties: {} },
      ])
      expect(mapFacade.selectFeatures).toHaveBeenCalledWith([
        {
          geometry: null,
          properties: {},
          type: 'Feature',
        },
      ])
    })
    it('clears feature selection when no features', () => {
      component.handleFeaturesClicked([])
      expect(mapFacade.clearFeatureSelection).toHaveBeenCalled()
    })
  })
})
