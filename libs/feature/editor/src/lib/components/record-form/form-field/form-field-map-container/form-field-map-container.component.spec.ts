import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldMapContainerComponent } from './form-field-map-container.component'
import {
  defaultMapStyleFixture,
  defaultMapStyleHlFixture,
  MapContextModel,
  MapFacade,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { of } from 'rxjs'
import { Style } from 'ol/style'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { Gn4Converter } from '@geonetwork-ui/api/metadata-converter'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateModule } from '@ngx-translate/core'
import { Component, Input } from '@angular/core'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { CommonModule } from '@angular/common'
import Map from 'ol/Map'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}
;(window as any).ResizeObserver = ResizeObserverMock
class Gn4MetadataMapperMock {
  readRecords = jest.fn((records) =>
    Promise.all(records.map((r) => this.readRecord(r)))
  )
  readRecord = jest.fn((record) => Promise.resolve(record))
}
class mapStyleServiceMock {
  createDefaultStyle = jest.fn(() => new Style())
  styles = {
    default: defaultMapStyleFixture(),
    defaultHL: defaultMapStyleHlFixture(),
  }
  createGeometryStyles = jest.fn(() => new Style())
  createStyleFunction = jest.fn()
}
class MapFacadeMock {
  addLayer = jest.fn()
  removeLayer = jest.fn()

  layers$ = of([])
}
class MapUtilsServiceMock {
  getLayerExtent = jest.fn(() => null)
  createEmptyMap = jest.fn(() => new Map())
}
class PlatformServiceInterfaceMock {
  searchKeywords = jest.fn(() =>
    of([{ label: 'Africa', thesaurus: { id: '1' } }])
  )
  getMe = jest.fn(() => of({}))
}
@Component({
  selector: 'gn-ui-map-context',
  template: '<div></div>',
})
export class MockMapContextComponent {
  @Input() context: MapContextModel
  @Input() mapConfig: MapConfig
}
@Component({
  selector: 'gn-ui-map',
  template: '<div></div>',
})
export class MockMapComponent {
  @Input() map: Map
}
describe('FormFieldMapContainerComponent', () => {
  let component: FormFieldMapContainerComponent
  let fixture: ComponentFixture<FormFieldMapContainerComponent>
  let mapFacade: MapFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockMapContextComponent, MockMapComponent],
      imports: [
        FormFieldMapContainerComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
        CommonModule,
      ],
      providers: [
        {
          provide: MapUtilsService,
          useClass: MapUtilsServiceMock,
        },
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
        {
          provide: MapStyleService,
          useClass: mapStyleServiceMock,
        },
        {
          provide: Gn4Converter,
          useClass: Gn4MetadataMapperMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
      ],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(FormFieldMapContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should remove previous layer and add a new layer with geometries', () => {
    component.spatialExtents = [
      {
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [0, 1],
              [1, 1],
              [1, 0],
              [0, 0],
            ],
          ],
        },
      },
    ]
    component.ngOnChanges()

    expect(
      mapFacade.layers$.subscribe((layers) => {
        expect(layers.length).toEqual(1)
      })
    )
  })

  it('should remove previous layer and add a new layer with bbox', () => {
    component.spatialExtents = [
      {
        bbox: [0, 0, 1, 1],
      },
    ]
    component.ngOnChanges()

    expect(
      mapFacade.layers$.subscribe((layers) => {
        expect(layers.length).toEqual(1)
      })
    )
  })

  it('should transform bbox to geometry', () => {
    const bbox = [0, 0, 1, 1] as [number, number, number, number]
    const geometry = component.bboxCoordsToGeometry(bbox)

    expect(geometry.type).toEqual('Polygon')
    expect(geometry).toEqual({
      coordinates: [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
          [0, 0],
        ],
      ],
      type: 'Polygon',
    })
  })
})
