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
import { MapViewComponent } from './map-view.component'
import { TranslateModule } from '@ngx-translate/core'
import { delay } from 'rxjs/operators'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { FEATURE_COLLECTION_POINT_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import { Collection } from 'ol'
import { Interaction } from 'ol/interaction'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

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
  getOptionalMapConfig: () => mapConfigMock,
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
  getWmtsOptionsFromCapabilities = jest.fn(function () {
    return new Observable((observer) => {
      observer.next(null)
    })
  })
  prioritizePageScroll = jest.fn()
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
  getDownloadUrlsFromWfs = jest.fn((url) => of(url.toString() + '?download'))
  getDownloadUrlFromEsriRest = jest.fn((url) => url + '?download')
  readAsGeoJson = jest.fn(({ url }) =>
    url.toString().indexOf('error') > -1
      ? throwError(new Error('data loading error'))
      : of(SAMPLE_GEOJSON).pipe(delay(100))
  )
}

class MapStyleServiceMock {
  createDefaultStyle = jest.fn(() => [new Style()])
  styles = {
    default: DEFAULT_STYLE_FIXTURE,
    defaultHL: DEFAULT_STYLE_HL_FIXTURE,
  }
}

class OpenLayersMapMock {
  _size = undefined
  updateSize() {
    this._size = [100, 100]
  }
  getSize() {
    return this._size
  }
  getInteractions() {
    return new InteractionsMock()
  }
}

class InteractionsMock extends Collection<Interaction> {}

class mapManagerMock {
  map = new OpenLayersMapMock()
}

class FeatureInfoServiceMock {
  handleFeatureInfo = jest.fn()
  features$ = new Subject()
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
  @Input() link: DatasetDistribution
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

describe('MapViewComponent', () => {
  let component: MapViewComponent
  let fixture: ComponentFixture<MapViewComponent>
  let mdViewFacade
  let mapUtilsService
  let featureInfoService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapViewComponent,
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
          useClass: MapStyleServiceMock,
        },
        {
          provide: MapManagerService,
          useClass: mapManagerMock,
        },
        {
          provide: FeatureInfoService,
          useClass: FeatureInfoServiceMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
    mapUtilsService = TestBed.inject(MapUtilsService)
    featureInfoService = TestBed.inject(FeatureInfoService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent)
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
            url: new URL('http://abcd.com/'),
            name: 'layer1',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
          {
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
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
          url: new URL('http://abcd.com/'),
          name: 'layer1',
          type: 'service',
          accessServiceProtocol: 'wms',
        })
      })
    })

    describe('with links compatible with MAP_API and GEODATA usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/'),
            name: 'layer1',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
        ])
        mdViewFacade.geoDataLinks$.next([
          {
            url: new URL('http://abcd.com/wfs'),
            name: 'featuretype',
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            url: new URL('http://abcd.com/data.geojson'),
            name: 'data.geojson',
            type: 'download',
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
          url: new URL('http://abcd.com/'),
          name: 'layer1',
          type: 'service',
          accessServiceProtocol: 'wms',
        })
      })
    })

    describe('with a link using WFS protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinks$.next([
          {
            url: new URL('http://abcd.com/wfs'),
            name: 'featuretype',
            type: 'service',
            accessServiceProtocol: 'wfs',
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

    describe('with a link using WMTS protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/wmts'),
            name: 'orthophoto',
            type: 'service',
            accessServiceProtocol: 'wmts',
          },
        ])
        mdViewFacade.geoDataLinks$.next([])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the downloaded data from WFS', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              type: 'wmts',
              options: expect.any(Object),
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
            name: 'mes_hdf',
            url: new URL(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/FeatureServer/0'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the the downloaded data from the ESRI REST API', () => {
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
            url: new URL('http://abcd.com/wfs/error'),
            name: 'featuretype',
            type: 'service',
            accessServiceProtocol: 'wfs',
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
              url: new URL('http://abcd.com/data.geojson'),
              name: 'data.geojson',
              type: 'download',
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
              url: new URL('http://abcd.com/data.geojson'),
              name: 'data.geojson',
              type: 'download',
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
            url: new URL('http://abcd.com/data.geojson'),
            name: 'data.geojson',
            type: 'download',
          },
        ])
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/'),
            name: 'layer',
            type: 'service',
            accessServiceProtocol: 'wms',
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
          url: new URL('http://abcd.com/'),
          name: 'layer',
          type: 'service',
          accessServiceProtocol: 'wms',
        })
      })
    })

    describe('when selecting a layer', () => {
      beforeEach(() => {
        mapUtilsService._returnImmediately = false
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/'),
            name: 'layer1',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
          {
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
        ])
        mdViewFacade.geoDataLinks$.next([])
        dropdownComponent.selectValue.emit(1)
        fixture.detectChanges()
      })
      describe('while extent is not ready', () => {
        it('does not emit a map context', () => {
          expect(mapComponent.context).toBeFalsy()
        })
      })
      describe('when extent is received', () => {
        beforeEach(() => {
          mapUtilsService._observer.next([-100, -200, 100, 200])
          fixture.detectChanges()
        })
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
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          })
        })
      })
      describe('when extent could not be determined', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtilsService._observer.next(null)
          fixture.detectChanges()
        }))
        it('emits a new map context with the selected layer and extent null', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                type: 'wms',
              },
            ],
            view: {
              extent: null,
            },
          })
        })
        it('provides selected link to the external viewer component', () => {
          expect(externalViewerButtonComponent.link).toEqual({
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          })
        })
      })
      describe('when extent computation fails', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtilsService._observer.error('extent computation failed')
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
            view: { extent: undefined },
          })
        })
        it('provides selected link to the external viewer component', () => {
          expect(externalViewerButtonComponent.link).toEqual({
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          })
        })
      })
      describe('selecting another layer, while extent is not ready', () => {
        beforeEach(inject([MapUtilsService], (mapUtils) => {
          mapUtilsService._observer.next([-10, -20, 10, 20])
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

  describe('prioritizePageScroll', () => {
    it('calls prioritzePageScroll with interactions', () => {
      expect(mapUtilsService.prioritizePageScroll).toHaveBeenCalledWith(
        expect.any(InteractionsMock)
      )
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
        featureInfoService.features$.next(selectionFeatures)
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
