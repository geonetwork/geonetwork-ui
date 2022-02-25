import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  DEFAULT_STYLE_FIXTURE,
  DEFAULT_STYLE_HL_FIXTURE,
  FeatureInfoService,
  MapContextModel,
  MapManagerService,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style } from 'ol/style'
import { MdViewFacade } from '../state/mdview.facade'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { Observable, of, Subject, throwError } from 'rxjs'
import { DataViewMapComponent } from './data-view-map.component'
import { TranslateModule } from '@ngx-translate/core'
import { DataService } from '../service/data.service'
import { delay } from 'rxjs/operators'
import {
  FEATURE_COLLECTION_POINT_FIXTURE_4326,
  MetadataLinkValid,
} from '@geonetwork-ui/util/shared'
import { MapConfig } from '@geonetwork-ui/util/app-config'

const mapConfigMock = {
  MAX_ZOOM: 10,
  MAX_EXTENT: [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855],
  DO_NOT_USE_DEFAULT_BASEMAP: false,
  EXTERNAL_VIEWER_URL_TEMPLATE:
    'https://example.com/myviewer?layer=${layer_name}&url=${service_url}&type=${service_type}',
  EXTERNAL_VIEWER_OPEN_NEW_TAB: true,
  MAP_LAYERS: [
    {
      TYPE: 'wms',
      URL: 'https://some-wms-server',
      NAME: 'some_layername',
    },
    {
      TYPE: 'wfs',
      URL: 'https://some-wfs-server',
      NAME: 'some_layername',
    },
  ],
}
jest.mock('@geonetwork-ui/util/app-config', () => ({
  getMapConfig: () => mapConfigMock,
  isConfigLoaded: jest.fn(() => true),
}))

class MdViewFacadeMock {
  mapApiLinks$ = new Subject()
  geoDataLinks$ = new Subject()
}

class MapUtilsServiceMock {
  getLayerExtent = jest.fn(function () {
    return new Observable((observer) => {
      this._observer = observer
      if (this._returnImmediately) {
        this._observer.next(null)
      }
    })
  })
  _returnImmediately = true
  _observer = null
}

const SAMPLE_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 123,
      properties: {
        test: 'abcd',
      },
      geometry: {},
    },
  ],
}

class DataServiceMock {
  getGeoJsonDownloadUrlFromWfs = jest.fn((url) => of(url + '?download'))
  getGeoJsonDownloadUrlFromEsriRest = jest.fn((url) => of(url + '?download'))
  readGeoJsonDataset = jest.fn((url) =>
    url.indexOf('error') > -1
      ? throwError(new Error('data loading error'))
      : of(SAMPLE_GEOJSON).pipe(delay(100))
  )
}

const mapStyleServiceMock = {
  createDefaultStyle: jest.fn(() => [new Style()]),
  styles: {
    default: DEFAULT_STYLE_FIXTURE,
    defaultHL: DEFAULT_STYLE_HL_FIXTURE,
  },
}
const mapManagerMock = {}

const featureInfoServiceMock = {
  handleFeatureInfo: jest.fn(),
  features$: new Subject(),
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
  selector: 'gn-ui-dropdown-selector',
  template: '<div></div>',
})
export class MockDropdownSelectorComponent {
  @Input() choices: unknown[]
  @Input() showTitle
  @Output() selectValue = new EventEmitter()
}

@Component({
  selector: 'gn-ui-external-viewer-button',
  template: '<div></div>',
})
export class MockExternalViewerButtonComponent {
  @Input() link: MetadataLinkValid
  @Input() mapConfig: MapConfig
}

@Component({
  selector: 'gn-ui-loading-mask',
  template: '<div></div>',
})
export class MockLoadingMaskComponent {
  @Input() message
}

@Component({
  selector: 'gn-ui-popup-alert',
  template: '<div></div>',
})
export class MockPopupAlertComponent {}

describe('DataViewMapComponent', () => {
  let component: DataViewMapComponent
  let fixture: ComponentFixture<DataViewMapComponent>
  let mdViewFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewMapComponent,
        MockMapContextComponent,
        MockDropdownSelectorComponent,
        MockExternalViewerButtonComponent,
        MockLoadingMaskComponent,
        MockPopupAlertComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: MapUtilsService,
          useClass: MapUtilsServiceMock,
        },
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
        {
          provide: MapStyleService,
          useValue: mapStyleServiceMock,
        },
        {
          provide: MapManagerService,
          useValue: mapManagerMock,
        },
        {
          provide: FeatureInfoService,
          useValue: featureInfoServiceMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('map layers', () => {
    let mapComponent: MockMapContextComponent
    let dropdownComponent: DropdownSelectorComponent
    let externalViewerButtonComponent: MockExternalViewerButtonComponent

    beforeEach(() => {
      mapComponent = fixture.debugElement.query(
        By.directive(MockMapContextComponent)
      ).componentInstance
      dropdownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
      externalViewerButtonComponent = fixture.debugElement.query(
        By.directive(MockExternalViewerButtonComponent)
      ).componentInstance
    })

    describe('with no link compatible with MAP_API or GEODATA usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with no layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [],
          view: expect.any(Object),
        })
      })
      it('emits map config to map component', () => {
        expect(mapComponent.mapConfig).toEqual(mapConfigMock)
      })
      it('emits map config to external viewer component', () => {
        expect(externalViewerButtonComponent.mapConfig).toEqual(mapConfigMock)
      })
      it('emits no link to external viewer component', () => {
        expect(externalViewerButtonComponent.link).toEqual(undefined)
      })
      it('provides a placeholder value to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: expect.any(String),
          },
        ])
      })
    })

    describe('with several links compatible with MAP_API usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            label: 'layer1',
            protocol: 'OGC:WMS--1-3-0',
          },
          {
            url: 'http://abcd.com/',
            name: 'layer2',
            label: 'layer2',
            protocol: 'OGC:WMS--1-1-0',
          },
        ])
        mdViewFacade.geoDataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with the first compatible link', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              url: 'http://abcd.com/',
              name: 'layer1',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
      it('provides a list of links to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: 'layer1 (WMS)',
          },
          {
            value: 1,
            label: 'layer2 (WMS)',
          },
        ])
      })
      it('provides first (selected) link to the external viewer component', () => {
        expect(externalViewerButtonComponent.link).toEqual({
          url: 'http://abcd.com/',
          label: 'layer1',
          name: 'layer1',
          protocol: 'OGC:WMS--1-3-0',
        })
      })
    })

    describe('with links compatible with MAP_API and GEODATA usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            label: 'layer1',
            protocol: 'OGC:WMS',
          },
        ])
        mdViewFacade.geoDataLinks$.next([
          {
            url: 'http://abcd.com/wfs',
            name: 'featuretype',
            label: 'featuretype',
            protocol: 'OGC:WFS--2-0-0',
          },
          {
            url: 'http://abcd.com/data.geojson',
            name: 'data.geojson',
            label: 'data.geojson',
            protocol: 'WWW:DOWNLOAD',
            format: 'geojson',
          },
        ])
        fixture.detectChanges()
      })
      it('provides a list of links to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: 'layer1 (WMS)',
          },
          {
            value: 1,
            label: 'featuretype (WFS)',
          },
          {
            value: 2,
            label: 'data.geojson (geojson)',
          },
        ])
      })
      it('provides first (selected) link to the external viewer component', () => {
        expect(externalViewerButtonComponent.link).toEqual({
          url: 'http://abcd.com/',
          name: 'layer1',
          label: 'layer1',
          protocol: 'OGC:WMS',
        })
      })
    })

    describe('with a link using WFS protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([
          {
            url: 'http://abcd.com/wfs',
            name: 'featuretype',
            protocol: 'OGC:WFS',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the downloaded data from WFS', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              type: 'geojson',
              data: SAMPLE_GEOJSON,
            },
          ],
          view: expect.any(Object),
        })
      })
    })

    describe('with a link using ESRI:REST protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the the downloaded data from WFS', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              type: 'geojson',
              data: SAMPLE_GEOJSON,
            },
          ],
          view: expect.any(Object),
        })
      })
    })

    describe('with a link using WFS which returns an error', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([
          {
            url: 'http://abcd.com/wfs/error',
            name: 'featuretype',
            protocol: 'OGC:WFS',
          },
        ])
      })
      it('shows an error', () => {
        expect(component.error).toEqual('data loading error')
      })
    })

    describe('with a link using DOWNLOAD protocol', () => {
      describe('during download', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([])
          mdViewFacade.geoDataLinks$.next([
            {
              url: 'http://abcd.com/data.geojson',
              name: 'data.geojson',
              protocol: 'WWW:DOWNLOAD--https',
              format: 'geojson',
            },
          ])
          fixture.detectChanges()
          tick(50)
          discardPeriodicTasks()
        }))
        it('does not emit immediately a map context', () => {
          expect(mapComponent.context).toBe(null)
        })
        it('shows a loading indicator', () => {
          expect(
            fixture.debugElement.query(By.directive(MockLoadingMaskComponent))
          ).toBeTruthy()
        })
      })
      describe('after download', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([])
          mdViewFacade.geoDataLinks$.next([
            {
              url: 'http://abcd.com/data.geojson',
              name: 'data.geojson',
              protocol: 'WWW:DOWNLOAD--https',
              format: 'geojson',
            },
          ])
          fixture.detectChanges()
          tick(200)
        }))
        it('emits a map context after loading with the downloaded data', () => {
          fixture.detectChanges()
          expect(mapComponent.context).toEqual({
            layers: [
              {
                type: 'geojson',
                data: SAMPLE_GEOJSON,
              },
            ],
            view: expect.any(Object),
          })
        })
        it('does not show a loading indicator', () => {
          fixture.detectChanges()
          expect(
            fixture.debugElement.query(By.directive(MockLoadingMaskComponent))
          ).toBeFalsy()
        })
      })
    })

    describe('when receiving several metadata records', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([
          {
            url: 'http://abcd.com/data.geojson',
            name: 'data.geojson',
            label: 'data.geojson',
            protocol: 'WWW:DOWNLOAD',
            format: 'geojson',
          },
        ])
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer',
            label: 'layer',
            protocol: 'OGC:WMS',
          },
        ])
        mdViewFacade.geoDataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with the link from the last record', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              url: 'http://abcd.com/',
              name: 'layer',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
      it('provides a list of links to the dropdown', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            value: 0,
            label: 'layer (WMS)',
          },
        ])
      })
      it('provides first (selected) link to the external viewer component', () => {
        expect(externalViewerButtonComponent.link).toEqual({
          url: 'http://abcd.com/',
          name: 'layer',
          label: 'layer',
          protocol: 'OGC:WMS',
        })
      })
    })

    describe('when selecting a layer', () => {
      beforeEach(inject([MapUtilsService], (mapUtils) => {
        mapUtils._returnImmediately = false
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            protocol: 'OGC:WMS',
          },
          {
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS',
          },
        ])
        mdViewFacade.geoDataLinks$.next([])
        dropdownComponent.selectValue.emit(1)
        fixture.detectChanges()
      }))
      describe('while extent is not ready', () => {
        it('does not emit a map context', () => {
          expect(mapComponent.context).toBeFalsy()
        })
      })
      describe('when extent is received', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtils._observer.next([-100, -200, 100, 200])
          fixture.detectChanges()
        }))
        it('emits a new map context with the selected layer and the computed extent', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                type: 'wms',
              },
            ],
            view: {
              extent: [-100, -200, 100, 200],
            },
          })
        })
        it('provides selected link to the external viewer component', () => {
          expect(externalViewerButtonComponent.link).toEqual({
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS',
          })
        })
      })
      describe('when extent computation fails', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtils._observer.error('extent computation failed')
          fixture.detectChanges()
        }))
        it('emits a new map context with the selected layer and a default view', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                type: 'wms',
              },
            ],
            view: expect.any(Object),
          })
        })
        it('provides selected link to the external viewer component', () => {
          expect(externalViewerButtonComponent.link).toEqual({
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS',
          })
        })
      })
      describe('selecting another layer, while extent is not ready', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtils._observer.next([-10, -20, 10, 20])
          dropdownComponent.selectValue.emit(0)
          fixture.detectChanges()
        }))
        it('does not emit another map context', () => {
          expect(mapComponent.context.layers).toEqual([
            {
              url: 'http://abcd.com/',
              name: 'layer2',
              type: 'wms',
            },
          ])
        })
      })
    })
  })

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
  const selectionFeatures = [
    vectorLayer
      .getSource()
      .getFeatures()
      .find((feature) => feature.getId() === 2),
  ]

  describe('feature info', () => {
    it('creates selection style', () => {
      expect(component['selectionStyle']).toBeTruthy()
    })
    describe('#onMapFeatureSelect', () => {
      beforeEach(() => {
        const changeDetectorRef =
          fixture.debugElement.injector.get(ChangeDetectorRef)
        jest.spyOn(changeDetectorRef.constructor.prototype, 'detectChanges')
        jest.spyOn(component, 'resetSelection')
        featureInfoServiceMock.features$.next(selectionFeatures)
      })
      it('reset the selection first', () => {
        expect(component.resetSelection).toHaveBeenCalled()
      })
      it('set the selection', () => {
        expect(component.selection).toBe(selectionFeatures[0])
      })
      it('change detection applied', () => {
        expect(component['changeRef'].detectChanges).toHaveBeenCalled()
      })
      it('set feature style', () => {
        expect(component.selection.getStyle()).toBe(component['selectionStyle'])
      })
    })
    describe('#resetSelection', () => {
      beforeEach(() => {
        component.selection = selectionFeatures[0]
        component.resetSelection()
      })
      it('reset the style of the feature', () => {
        expect(selectionFeatures[0].getStyle()).toBeNull()
      })
      it('remove the selection', () => {
        expect(component.selection).toBeFalsy()
      })
    })
    describe('changing the map context', () => {
      beforeEach(() => {
        jest.spyOn(component, 'resetSelection')
        mdViewFacade.geoDataLinks$.next([])
        mdViewFacade.mapApiLinks$.next([])
      })
      it('resets selection', () => {
        expect(component.resetSelection).toHaveBeenCalled()
      })
    })
  })
})
