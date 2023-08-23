import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  defaultMapOptions,
  FEATURE_MAP_OPTIONS,
  FeatureInfoService,
  MapContextLayerTypeEnum,
  MapManagerService,
} from '@geonetwork-ui/feature/map'
import { FEATURE_COLLECTION_POINT_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import { Map } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Subject } from 'rxjs'

import { GeoTableViewComponent } from './geo-table-view.component'

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON().readFeatures(
      FEATURE_COLLECTION_POINT_FIXTURE_4326,
      {
        featureProjection: 'EPSG:3857',
        dataProjection: 'EPSG:4326',
      }
    ),
  }),
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
const featureInfoServiceMock = {
  handleFeatureInfo: jest.fn(),
  features$: new Subject(),
}

const mapManagerMock = {
  map: mapMock,
}

describe('GeoTableViewComponent', () => {
  let component: GeoTableViewComponent
  let fixture: ComponentFixture<GeoTableViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeoTableViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FeatureInfoService,
          useValue: featureInfoServiceMock,
        },
        {
          provide: MapManagerService,
          useValue: mapManagerMock,
        },
        {
          provide: FEATURE_MAP_OPTIONS,
          useValue: defaultMapOptions,
        },
      ],
    })
      .overrideComponent(GeoTableViewComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTableViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('init', () => {
    it('data for the table', () => {
      expect(component.tableData).toEqual(
        component.data.features.map((f) => ({
          id: f.id,
          ...f.properties,
        }))
      )
    })

    it('map context', () => {
      expect(component.mapContext).toEqual({
        layers: [
          {
            type: MapContextLayerTypeEnum.XYZ,
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          },
          {
            type: MapContextLayerTypeEnum.GEOJSON,
            data: component.data,
          },
        ],
      })
    })
    it('feature info', () => {
      expect(featureInfoServiceMock.handleFeatureInfo).toHaveBeenCalled()
    })
    it('map objects', () => {
      expect(component['view']).toBe(mapMock.getView())
      expect(component['vectorLayer']).toBe(vectorLayer)
      expect(component['features'].length).toBe(
        FEATURE_COLLECTION_POINT_FIXTURE_4326.features.length
      )
    })
  })

  describe('#onTableSelect', () => {
    let tableEntry
    beforeEach(() => {
      tableEntry = {
        id: 1,
        name: 'feature 1',
      }
      jest.spyOn(component['view'], 'fit')
      component.onTableSelect(tableEntry)
    })
    it('set the selection', () => {
      expect(component.selectionId).toBe(1)
      expect(component.selection).toBe(
        component['vectorSource']
          .getFeatures()
          .find((feature) => feature.getId() === 1)
      )
    })
    it('zoom on feature', () => {
      expect(component['view'].fit).toHaveBeenCalled()
    })
  })

  describe('#onMapFeatureSelect', () => {
    let features
    beforeEach(() => {
      features = [
        component['vectorSource']
          .getFeatures()
          .find((feature) => feature.getId() === 2),
      ]
      const changeDetectorRef =
        fixture.debugElement.injector.get(ChangeDetectorRef)
      jest.spyOn(changeDetectorRef.constructor.prototype, 'detectChanges')
      jest.spyOn(component['vectorLayer'], 'changed')
      featureInfoServiceMock.features$.next(features)
    })
    it('set the selection', () => {
      expect(component.selectionId).toBe(2)
      expect(component.selection).toBe(features[0])
    })
    it('layer is refreshed', () => {
      expect(component['vectorLayer'].changed).toHaveBeenCalled()
      expect(component['changeRef'].detectChanges).toHaveBeenCalled()
    })
  })
})
