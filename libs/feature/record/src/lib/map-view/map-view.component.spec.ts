import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { of, Subject, throwError } from 'rxjs'
import { MapViewComponent } from './map-view.component'
import { TranslateService } from '@ngx-translate/core'
import { delay } from 'rxjs/operators'
import { pointFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import { Collection } from 'ol'
import { Interaction } from 'ol/interaction'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import * as geoSdkCore from '@geospatial-sdk/core'
import { MapContext } from '@geospatial-sdk/core'
import {
  MapContainerComponent,
  MapLegendComponent,
  prioritizePageScroll,
} from '@geonetwork-ui/ui/map'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { ExternalViewerButtonComponent } from '../external-viewer-button/external-viewer-button.component'
import { LoadingMaskComponent } from '@geonetwork-ui/ui/widgets'
import { FetchError } from '@geonetwork-ui/data-fetcher'

jest.mock('@geonetwork-ui/ui/map', () => ({
  ...jest.requireActual('@geonetwork-ui/ui/map'),
  prioritizePageScroll: jest.fn(),
}))

jest.mock('@geospatial-sdk/core', () => {
  let returnImmediately = true
  let resolver
  let rejecter
  return {
    createViewFromLayer: jest.fn(function () {
      return new Promise((resolve, reject) => {
        resolver = resolve
        rejecter = reject
        if (returnImmediately) {
          resolve(null)
        }
      })
    }),
    returnImmediately(v) {
      returnImmediately = v
    },
    resolve(v) {
      resolver(v)
    },
    reject(v) {
      rejecter(v)
    },
  }
})

const recordMapExtent = [-30, -60, 30, 60]

const emptyMapContext = {
  layers: [],
  view: {
    extent: recordMapExtent,
  },
} as MapContext

class MdViewFacadeMock {
  mapApiLinks$ = new Subject()
  geoDataLinksWithGeometry$ = new Subject()
  metadata$ = of({ title: 'abcd' })
}

class MapUtilsServiceMock {
  getRecordExtent = jest.fn(() => recordMapExtent)
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
      ? throwError(() => new Error('data loading error'))
      : of(SAMPLE_GEOJSON).pipe(delay(100))
  )
  getGeodataLinksFromTms = jest.fn((mapLink) => {
    return mapLink.url.toString().indexOf('error') > -1
      ? Promise.reject([mapLink])
      : Promise.resolve([mapLink])
  })
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

@Component({
  selector: 'gn-ui-map-container',
  template: '<div></div>',
  standalone: true,
})
export class MockMapContainerComponent {
  @Input() context: MapContext
  openlayersMap = Promise.resolve(new OpenLayersMapMock())
}

describe('MapViewComponent', () => {
  let component: MapViewComponent
  let fixture: ComponentFixture<MapViewComponent>
  let mdViewFacade
  let mapComponent: MockMapContainerComponent

  beforeEach(() => {
    jest.clearAllMocks()
    geoSdkCore.returnImmediately(true)
  })

  beforeEach(() =>
    MockBuilder(MapViewComponent).replace(
      MapContainerComponent,
      MockMapContainerComponent
    )
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        MockProvider(TranslateService, {
          instant: jest.fn((key: string) => key),
        }),
      ],
    })
      .overrideComponent(MapViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    mapComponent = fixture.debugElement.query(
      By.directive(MockMapContainerComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('map layers', () => {
    let dropdownComponent: DropdownSelectorComponent
    let externalViewerButtonComponent: ExternalViewerButtonComponent

    beforeEach(() => {
      dropdownComponent = fixture.debugElement.query(
        By.directive(DropdownSelectorComponent)
      ).componentInstance
      externalViewerButtonComponent = fixture.debugElement.query(
        By.directive(ExternalViewerButtonComponent)
      ).componentInstance
    })

    describe('with no link compatible with MAP_API or GEODATA usage', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        tick()
        fixture.detectChanges()
      }))
      it('emits a map context with no layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [],
          view: expect.any(Object),
        })
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
      beforeEach(fakeAsync(() => {
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
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        tick()
        fixture.detectChanges()
      }))
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
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/'),
            name: 'layer1',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
        ])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
          {
            url: new URL('http://abcd.com/data/ogcapi'),
            name: 'ogc api',
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
        ])
        tick()
        fixture.detectChanges()
      }))
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
          {
            value: 3,
            label: 'ogc api',
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

    describe('excludeWfs = true: with links compatible with MAP_API and GEODATA usage', () => {
      beforeEach(fakeAsync(() => {
        component.excludeWfs$.next(true)
        mdViewFacade.mapApiLinks$.next([
          {
            url: new URL('http://abcd.com/'),
            name: 'layer1',
            type: 'service',
            accessServiceProtocol: 'wms',
          },
        ])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
          {
            url: new URL('http://abcd.com/data/ogcapi'),
            name: 'ogc api',
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
        ])
      }))
      it('provides a list of links to the dropdown (including the WFS layer)', () => {
        fixture.detectChanges()
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
          {
            value: 3,
            label: 'ogc api',
          },
        ])
      })
      describe('when selecting the WFS layer (excludeWfs)', () => {
        beforeEach(fakeAsync(() => {
          dropdownComponent.selectValue.emit(1)
          component.excludeWfs$.next(true)
          tick()
          fixture.detectChanges()
        }))
        it('set hidePreview to true', () => {
          expect(component.hidePreview).toEqual(true)
        })
        it('emits a map context with no layer', () => {
          expect(mapComponent.context).toEqual({
            layers: [],
            view: expect.any(Object),
          })
        })
      })
    })

    describe('with a link using WFS protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the downloaded data from WFS', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            {
              name: 'orthophoto',
              type: 'wmts',
              url: 'http://abcd.com/wmts',
            },
          ],
          view: expect.any(Object),
        })
      })
    })

    describe('with a link using TMS protocol', () => {
      describe('points to a maplibre-style json', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([
            {
              url: new URL('http://abcd.com/tms/style.json'),
              name: 'orthophoto',
              type: 'service',
              accessServiceProtocol: 'maplibre-style',
            },
          ])
          mdViewFacade.geoDataLinksWithGeometry$.next([])
          tick(200)
          fixture.detectChanges()
        }))
        it('emits a map context using maplibre-style with styleUrl', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                name: 'orthophoto',
                type: 'maplibre-style',
                styleUrl: 'http://abcd.com/tms/style.json',
              },
            ],
            view: expect.any(Object),
          })
        })
      })
      describe('containing NO style', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([
            {
              url: new URL('http://abcd.com/tms'),
              name: 'orthophoto',
              type: 'service',
              accessServiceProtocol: 'tms',
            },
          ])
          mdViewFacade.geoDataLinksWithGeometry$.next([])
          tick(200)
          fixture.detectChanges()
        }))
        it('emits a map context using mvt tile format with root url', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                name: 'orthophoto',
                type: 'xyz',
                tileFormat: 'application/vnd.mapbox-vector-tile',
                url: 'http://abcd.com/tms/{z}/{x}/{y}.pbf',
              },
            ],
            view: expect.any(Object),
          })
        })
      })
      describe('when endpoint is in error', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([
            {
              url: new URL('http://error.com/tms'),
              name: 'tmserror',
              type: 'service',
              accessServiceProtocol: 'tms',
            },
          ])
          mdViewFacade.geoDataLinksWithGeometry$.next([])
          tick(200)
          fixture.detectChanges()
        }))
        it('still emits a map context using mvt tile format with root url', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                name: 'tmserror',
                type: 'xyz',
                tileFormat: 'application/vnd.mapbox-vector-tile',
                url: 'http://error.com/tms/{z}/{x}/{y}.pbf',
              },
            ],
            view: expect.any(Object),
          })
        })
      })
    })

    describe('with a link using ESRI:REST protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
      it('emits a map context with the downloaded data from the ESRI REST API', () => {
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

    describe('with a link using OGC API protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
          {
            name: 'ogc layer',
            url: new URL('http://abcd.com/data/ogcapi'),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the downloaded data from the OGC Features API', () => {
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
        jest.spyOn(component, 'handleError')
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
      it('sets loading to false', () => {
        expect(component.loading).toEqual(false)
      })
      it('calls handleError', () => {
        expect(component.handleError).toHaveBeenCalled()
      })
    })

    describe('with a link using DOWNLOAD protocol', () => {
      describe('during download', () => {
        beforeEach(() => {
          mdViewFacade.mapApiLinks$.next([])
          mdViewFacade.geoDataLinksWithGeometry$.next([
            {
              url: new URL('http://abcd.com/data.geojson'),
              name: 'data.geojson',
              type: 'download',
            },
          ])
        })
        beforeEach(() => {
          fixture.detectChanges()
        })
        it('emit an empty map context', () => {
          expect(mapComponent.context).toEqual(emptyMapContext)
        })
        it('shows a loading indicator', () => {
          expect(
            fixture.debugElement.query(By.directive(LoadingMaskComponent))
          ).toBeTruthy()
        })
      })
      describe('after download', () => {
        beforeEach(fakeAsync(() => {
          mdViewFacade.mapApiLinks$.next([])
          mdViewFacade.geoDataLinksWithGeometry$.next([
            {
              url: new URL('http://abcd.com/data.geojson'),
              name: 'data.geojson',
              type: 'download',
            },
          ])
          tick(200)
          fixture.detectChanges()
        }))
        it('emits a map context after loading with the downloaded data', () => {
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
          expect(
            fixture.debugElement.query(By.directive(LoadingMaskComponent))
          ).toBeFalsy()
        })
      })
    })

    describe('when receiving several metadata records', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
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
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        tick()
        fixture.detectChanges()
      }))
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
      beforeEach(fakeAsync(() => {
        geoSdkCore.returnImmediately(false)
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
          {
            url: new URL('http://abcd.com/'),
            name: 'layer3',
            type: 'service',
            accessRestricted: true,
          },
        ])
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        dropdownComponent.selectValue.emit(1)
        tick()
        fixture.detectChanges()
      }))
      describe('while extent is not ready', () => {
        it('emit a empty map context', () => {
          expect(mapComponent.context).toEqual(emptyMapContext)
        })
      })
      describe('when extent is received', () => {
        beforeEach(fakeAsync(() => {
          geoSdkCore.resolve({ extent: [-100, -200, 100, 200] })
          tick()
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
            url: new URL('http://abcd.com/'),
            name: 'layer2',
            type: 'service',
            accessServiceProtocol: 'wms',
          })
        })
      })
      describe('when extent could not be determined', () => {
        beforeEach(fakeAsync(() => {
          geoSdkCore.resolve(null)
          tick()
          fixture.detectChanges()
        }))
        it('emits a new map context with the selected layer and extent from the record', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                type: 'wms',
              },
            ],
            view: {
              extent: recordMapExtent,
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
        beforeEach(fakeAsync(() => {
          geoSdkCore.reject('extent computation failed')
          tick()
          fixture.detectChanges()
        }))
        it('emits a new map context with the selected layer and extent from the record', () => {
          expect(mapComponent.context).toEqual({
            layers: [
              {
                url: 'http://abcd.com/',
                name: 'layer2',
                type: 'wms',
              },
            ],
            view: { extent: recordMapExtent },
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
        beforeEach(fakeAsync(() => {
          geoSdkCore.resolve({ extent: recordMapExtent })
          tick()
          dropdownComponent.selectValue.emit(0)
          tick()
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
      describe('When link is restricted', () => {
        beforeEach(fakeAsync(() => {
          dropdownComponent.selectValue.emit(2)
          tick()
          fixture.detectChanges()
        }))
        it('shows an error message', () => {
          expect(component.error).toEqual('dataset.error.restrictedAccess')
        })
      })
    })
  })

  describe('prioritizePageScroll', () => {
    it('calls prioritzePageScroll with interactions', () => {
      expect(prioritizePageScroll).toHaveBeenCalledWith(
        expect.any(InteractionsMock)
      )
    })
  })

  describe('feature info', () => {
    let selectionFeatures
    beforeEach(() => {
      selectionFeatures = pointFeatureCollectionFixture().features.filter(
        (feature) => feature.id === 2
      )
    })

    describe('#onMapFeatureSelect', () => {
      beforeEach(() => {
        const changeDetectorRef =
          fixture.debugElement.injector.get(ChangeDetectorRef)
        jest.spyOn(changeDetectorRef.constructor.prototype, 'detectChanges')
        jest.spyOn(component, 'resetSelection')
        component.onMapFeatureSelect(selectionFeatures)
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
      it.skip('set feature style', () => {
        // FIXME: restore test
        expect(component.selection.getStyle()).toBe(component['selectionStyle'])
      })
    })
    describe('#resetSelection', () => {
      beforeEach(() => {
        component.selection = selectionFeatures[0]
        component.resetSelection()
      })
      it.skip('reset the style of the feature', () => {
        // FIXME: restore test
        expect(selectionFeatures[0].getStyle()).toBeNull()
      })
      it('remove the selection', () => {
        expect(component.selection).toBeFalsy()
      })
    })
    describe('changing the map context', () => {
      beforeEach(() => {
        jest.spyOn(component, 'resetSelection')
        mdViewFacade.geoDataLinksWithGeometry$.next([])
        mdViewFacade.mapApiLinks$.next([])
      })
      it('resets selection', () => {
        expect(component.resetSelection).toHaveBeenCalled()
      })
    })
  })

  describe('display legend', () => {
    it('should render the MapLegendComponent', () => {
      const legendComponent = fixture.debugElement.query(
        By.directive(MapLegendComponent)
      )
      expect(legendComponent).toBeTruthy()
    })
    it('should handle legendStatusChange event', () => {
      const legendComponent = fixture.debugElement.query(
        By.directive(MapLegendComponent)
      ).componentInstance
      const legendStatusChangeSpy = jest.spyOn(
        component,
        'onLegendStatusChange'
      )
      legendComponent.legendStatusChange.emit(true)
      expect(legendStatusChangeSpy).toHaveBeenCalledWith(true)
    })
  })
  describe('map view extent', () => {
    describe('if no record extent', () => {
      beforeEach(fakeAsync(() => {
        component['mapUtils'].getRecordExtent = jest.fn(() => null)

        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.geoDataLinksWithGeometry$.next([
          {
            name: 'ogc layer',
            url: new URL('http://abcd.com/data/ogcapi'),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('uses a default view', () => {
        expect(mapComponent.context).toEqual({
          layers: expect.any(Array),
          view: null,
        })
      })
    })
  })

  describe('#onSourceLoadError', () => {
    it('should set error message for 403 status', () => {
      const error = { httpStatus: 403 } as geoSdkCore.SourceLoadErrorEvent
      component.onSourceLoadError(error)
      expect(component.error).toBe('dataset.error.forbidden')
    })

    it('should set error message for 401 status', () => {
      const error = { httpStatus: 401 } as geoSdkCore.SourceLoadErrorEvent
      component.onSourceLoadError(error)
      expect(component.error).toBe('dataset.error.forbidden')
    })

    it('should set error message for other statuses', () => {
      const error = { httpStatus: 500 } as geoSdkCore.SourceLoadErrorEvent
      component.onSourceLoadError(error)
      expect(component.error).toBe('dataset.error.http')
    })
  })

  describe('#handleError', () => {
    it('should set error message for FetchError', () => {
      const error = new FetchError('forbidden', 'info')
      component.handleError(error)
      expect(component.error).toBe('dataset.error.forbidden')
    })

    it('should set error message for Error instance', () => {
      const error = new Error('error.message')
      component.handleError(error)
      expect(component.error).toBe('error.message')
    })

    it('should set error message for string error', () => {
      const error = 'string error'
      component.handleError(error)
      expect(component.error).toBe('string error')
    })
  })
  describe('style selector with TMS', () => {
    it('handles error when TMS endpoint is in error', fakeAsync(() => {
      const dataService = TestBed.inject(
        DataService
      ) as unknown as DataServiceMock
      dataService.getGeodataLinksFromTms.mockImplementation((link) =>
        Promise.reject(new Error('Endpoint is in error'))
      )
      mdViewFacade.mapApiLinks$.next([
        {
          url: new URL('http://abcd.com/tms'),
          name: 'orthophoto',
          type: 'service',
          accessServiceProtocol: 'tms',
        },
      ])
      mdViewFacade.geoDataLinksWithGeometry$.next([])
      tick(200)
      fixture.detectChanges()
      const dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      const styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent
      expect(styleDropdown.disabled).toBeTruthy()
      expect(styleDropdown.choices).toEqual([
        {
          label: '\u00A0\u00A0\u00A0\u00A0',
          value: 0,
        },
      ])
    }))
    it('enables and populates styles for selected TMS', fakeAsync(() => {
      const dataService = TestBed.inject(
        DataService
      ) as unknown as DataServiceMock
      dataService.getGeodataLinksFromTms.mockImplementation((link) =>
        Promise.resolve([
          link,
          {
            ...link,
            accessServiceProtocol: 'maplibre-style',
            url: new URL('http://abcd.com/tms/style/a.json'),
            name: 'style-A',
          },
          {
            ...link,
            accessServiceProtocol: 'maplibre-style',
            url: new URL('http://abcd.com/tms/style/b.json'),
            name: 'style-B',
          },
        ])
      )

      mdViewFacade.mapApiLinks$.next([
        {
          url: new URL('http://abcd.com/tms'),
          name: 'orthophoto',
          type: 'service',
          accessServiceProtocol: 'tms',
        },
      ])
      mdViewFacade.geoDataLinksWithGeometry$.next([])

      tick(200)
      fixture.detectChanges()

      const dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      const styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent

      expect(styleDropdown.disabled).toBeFalsy()
      expect(styleDropdown.choices.map((c) => c.label)).toEqual([
        'style-A',
        'style-B',
      ])
    }))
    it('resets style selection when switching away and back', fakeAsync(() => {
      const ds = TestBed.inject(DataService) as unknown as DataServiceMock
      ds.getGeodataLinksFromTms.mockImplementation((link) =>
        Promise.resolve([
          link,
          {
            ...link,
            accessServiceProtocol: 'maplibre-style',
            url: new URL('http://abcd.com/tms/style/a.json'),
            name: 'style-A',
          },
          {
            ...link,
            accessServiceProtocol: 'maplibre-style',
            url: new URL('http://abcd.com/tms/style/b.json'),
            name: 'style-B',
          },
        ])
      )
      mdViewFacade.mapApiLinks$.next([
        {
          url: new URL('http://abcd.com/tms'),
          name: 'orthophoto',
          type: 'service',
          accessServiceProtocol: 'tms',
        },
        {
          url: new URL('http://abcd.com/wms'),
          name: 'layer-wms',
          type: 'service',
          accessServiceProtocol: 'wms',
        },
      ])
      mdViewFacade.geoDataLinksWithGeometry$.next([])

      tick(200)
      fixture.detectChanges()

      let dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      const srcDropdown = dropdowns[0]
        .componentInstance as DropdownSelectorComponent
      let styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent

      styleDropdown.selectValue.emit(1)
      tick()
      fixture.detectChanges()
      expect(mapComponent.context.layers[0].styleUrl).toBe(
        'http://abcd.com/tms/style/b.json'
      )

      srcDropdown.selectValue.emit(1)
      tick()
      fixture.detectChanges()

      dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent
      expect(styleDropdown.disabled).toBeTruthy()

      srcDropdown.selectValue.emit(0)
      tick()
      fixture.detectChanges()

      dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent

      expect(styleDropdown.disabled).toBeFalsy()
      expect(styleDropdown.choices[0].label).toBe('style-A')
      expect(mapComponent.context.layers[0].styleUrl).toBe(
        'http://abcd.com/tms/style/a.json'
      )
    }))

    it('disables style dropdown when no TMS is present', fakeAsync(() => {
      mdViewFacade.mapApiLinks$.next([
        {
          url: new URL('http://abcd.com/wms'),
          name: 'layer-wms',
          type: 'service',
          accessServiceProtocol: 'wms',
        },
      ])
      mdViewFacade.geoDataLinksWithGeometry$.next([])

      tick(200)
      fixture.detectChanges()

      const dropdowns = fixture.debugElement.queryAll(
        By.directive(DropdownSelectorComponent)
      )
      const styleDropdown = dropdowns[1]
        .componentInstance as DropdownSelectorComponent

      expect(styleDropdown.disabled).toBeTruthy()
      expect(styleDropdown.choices.length).toBe(1)
    }))
  })
})
