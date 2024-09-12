import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GeocodingComponent } from './geocoding.component'
import { GeocodingService } from '../geocoding.service'
import { of } from 'rxjs'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MapFacade } from '../+state/map.facade'

describe('GeocodingComponent', () => {
  let component: GeocodingComponent
  let fixture: ComponentFixture<GeocodingComponent>
  let mapFacade: MapFacade

  beforeEach(() => {
    return MockBuilder(GeocodingComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(GeocodingService, {
          query: jest.fn().mockReturnValue(of([])),
        }),
        MockProvider(MapFacade, {
          context$: of({
            layers: [],
            view: null,
          }),
          applyContext: jest.fn(),
        }),
      ],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(GeocodingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.searchText).toBe('')
    expect(component.results).toEqual([])
  })

  describe('On Search Change', () => {
    describe('when search text is empty', () => {
      beforeEach(() => {
        component.onSearchChange('')
      })
      it('should not show any results', () => {
        expect(component.searchText).toEqual('')
        expect(component.results).toEqual([])
      })
    })
    describe('when search text is not empty', () => {
      beforeEach(() => {
        component.searchText = 'test'
      })
      it('should show results', () => {
        expect(component.searchText).toEqual('test')
        expect(component.results).toEqual([])
      })
    })
  })

  describe('zoomToLocation', () => {
    it('should zoom to the location of the result if geometry type is Point', async () => {
      const result = {
        geom: {
          type: 'Point',
          coordinates: [0, 0],
        },
      }
      await component.zoomToLocation(result)
      expect(mapFacade.applyContext).toHaveBeenCalledWith({
        layers: [],
        view: { center: [0, 0], zoom: 10 },
      })
    })

    it('should zoom to the location of the result if geometry type is Polygon', async () => {
      const result = {
        geom: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 1],
              [2, 2],
              [0, 0],
            ],
          ],
        },
      }
      await component.zoomToLocation(result)
      expect(mapFacade.applyContext).toHaveBeenCalledWith({
        layers: [],
        view: {
          geometry: {
            coordinates: [
              [
                [0, 0],
                [1, 1],
                [2, 2],
                [0, 0],
              ],
            ],
            type: 'Polygon',
          },
        },
      })
    })

    it('should log an error if geometry type is unsupported', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const result = {
        geom: {
          type: 'Unsupported',
          coordinates: [0, 0],
        },
      }
      await component.zoomToLocation(result)
      expect(consoleSpy).toHaveBeenCalledWith(
        `Unsupported geometry type: ${result.geom.type}`
      )
    })
  })
  describe('onEnterPress', () => {
    it('should zoom to the location of the first result', () => {
      const result = {
        geom: {
          coordinates: [[0, 0]],
        },
      }
      component.results = [result]
      const zoomToLocationSpy = jest.spyOn(component, 'zoomToLocation')
      component.onEnterPress()
      expect(zoomToLocationSpy).toHaveBeenCalledWith(result)
    })
  })
})
