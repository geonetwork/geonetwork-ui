import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GeocodingComponent } from './geocoding.component'
import { MapManagerService } from '../manager/map-manager.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { FEATURE_COLLECTION_POINT_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { TranslateModule } from '@ngx-translate/core'
import { GeocodingService } from '../geocoding.service'
import { of } from 'rxjs'

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON().readFeatures(
      FEATURE_COLLECTION_POINT_FIXTURE_4326,
      {
        featureProjection: 'EPSG:3857',
        dataProjection: 'EPSG:4326',
      }
    ),
  }) as VectorSource<Feature<Geometry>>,
})

const mapMock = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'http://test',
      }),
    }),
    vectorLayer,
  ],
})

const mapManagerMock = {
  map: mapMock,
}

const geocodingServiceMock = {
  query: jest.fn().mockReturnValue(of([])),
}

describe('GeocodingComponent', () => {
  let component: GeocodingComponent
  let fixture: ComponentFixture<GeocodingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [GeocodingComponent],
      providers: [
        { provide: MapManagerService, useValue: mapManagerMock },
        { provide: GeocodingService, useValue: geocodingServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

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
    let viewMock: any
    let zoomToPointSpy: jest.SpyInstance
    let zoomToPolygonSpy: jest.SpyInstance

    beforeEach(() => {
      viewMock = {
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        fit: jest.fn(),
      }
      mapMock.getView = jest.fn().mockReturnValue(viewMock)
      zoomToPointSpy = jest.spyOn(component, 'zoomToPoint')
      zoomToPolygonSpy = jest.spyOn(component, 'zoomToPolygon')
    })

    it('should zoom to the location of the result if geometry type is Point', () => {
      const result = {
        geom: {
          type: 'Point',
          coordinates: [0, 0],
        },
      }
      component.zoomToLocation(result)
      expect(zoomToPointSpy).toHaveBeenCalledWith(
        result.geom.coordinates,
        viewMock
      )
    })

    it('should zoom to the location of the result if geometry type is Polygon', () => {
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
      component.zoomToLocation(result)
      expect(zoomToPolygonSpy).toHaveBeenCalledWith(
        result.geom.coordinates,
        viewMock
      )
    })

    it('should log an error if geometry type is unsupported', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const result = {
        geom: {
          type: 'Unsupported',
          coordinates: [0, 0],
        },
      }
      component.zoomToLocation(result)
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
