import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MapContextModel } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { Subject } from 'rxjs'
import { DataViewMapComponent } from './data-view-map.component'

jest.mock('@camptocamp/ogc-client', () => ({
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve({
        getFeatureUrl: () => this.url + '?GetFeature',
        getServiceInfo: () => ({}),
        supportsJson: () => this.url.indexOf('nojson') === -1,
      })
    }
  },
}))

// mock a 100ms delay before serving the geojson file
jest.mock('@geonetwork-ui/data-fetcher', () => ({
  readDataset: (url) =>
    new Promise((resolve, reject) => {
      url.indexOf('error') === -1
        ? setTimeout(() => resolve(SAMPLE_GEOJSON.features), 100)
        : reject(new Error('data loading error'))
    }),
}))

class MdViewFacadeMock {
  mapApiLinks$ = new Subject()
  dataLinks$ = new Subject()
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

@Component({
  selector: 'gn-ui-map-context',
  template: '<div></div>',
})
export class MockMapContextComponent {
  @Input() context: MapContextModel
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
  selector: 'gn-ui-loading-mask',
  template: '<div></div>',
})
export class MockLoadingMaskComponent {}

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
        MockLoadingMaskComponent,
        MockPopupAlertComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
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

    beforeEach(() => {
      mapComponent = fixture.debugElement.query(
        By.directive(MockMapContextComponent)
      ).componentInstance
      dropdownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
    })

    describe('with no link compatible with MAP_API or DATA usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with only the base layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [component.getBackgroundLayer()],
          view: expect.any(Object),
        })
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
            protocol: 'OGC:WMS--1-3-0',
          },
          {
            url: 'http://abcd.com/',
            name: 'layer2',
            protocol: 'OGC:WMS--1-1-0',
          },
        ])
        mdViewFacade.dataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with the base layer and the first compatible link', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
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
            label: 'layer1 (OGC:WMS--1-3-0)',
          },
          {
            value: 1,
            label: 'layer2 (OGC:WMS--1-1-0)',
          },
        ])
      })
    })

    describe('with links compatible with MAP_API and DATA usage', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer1',
            protocol: 'OGC:WMS',
          },
        ])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/wfs',
            name: 'featuretype',
            protocol: 'OGC:WFS--2-0-0',
          },
          {
            url: 'http://abcd.com/data.geojson',
            name: 'data.geojson',
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
            label: 'layer1 (OGC:WMS)',
          },
          {
            value: 1,
            label: 'featuretype (OGC:WFS--2-0-0)',
          },
          {
            value: 2,
            label: 'data.geojson (WWW:DOWNLOAD)',
          },
        ])
      })
    })

    describe('with a link using WFS protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/wfs',
            name: 'featuretype',
            protocol: 'OGC:WFS',
          },
        ])
        tick(200)
        fixture.detectChanges()
      }))
      it('emits a map context with the base layer and the downloaded data from WFS', fakeAsync(() => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              type: 'geojson',
              data: SAMPLE_GEOJSON,
            },
          ],
          view: expect.any(Object),
        })
      }))
    })

    describe('with a link using WFS which returns an error', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/wfs/error',
            name: 'featuretype',
            protocol: 'OGC:WFS',
          },
        ])
        tick()
        fixture.detectChanges()
        flush()
      }))
      it('shows an error', () => {
        expect(component.error).toEqual('data loading error')
      })
    })

    describe('with a link using WFS protocol not supporting geojson', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/wfs/nojson',
            name: 'featuretype',
            protocol: 'OGC:WFS',
          },
        ])
        tick()
        fixture.detectChanges()
        flush()
      }))
      it('shows an error', () => {
        expect(component.error).toEqual('map.wfs.geojson.not.supported')
      })
    })

    describe('with a link using DOWNLOAD protocol', () => {
      beforeEach(fakeAsync(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/data.geojson',
            name: 'data.geojson',
            protocol: 'WWW:DOWNLOAD--https',
            format: 'geojson',
          },
        ])
        fixture.detectChanges()
        tick(50)
        flush()
      }))
      it('does not emit immediately a map context', () => {
        expect(mapComponent.context).toBe(null)
      })
      it('shows a loading indicator', () => {
        expect(
          fixture.debugElement.query(By.directive(MockLoadingMaskComponent))
        ).toBeTruthy()
      })
      it('emits a map context after loading with the base layer and the downloaded data', fakeAsync(() => {
        tick(200)
        fixture.detectChanges()
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              type: 'geojson',
              data: SAMPLE_GEOJSON,
            },
          ],
          view: expect.any(Object),
        })
      }))
      it('does not show a loading indicator after loading', fakeAsync(() => {
        tick(200)
        fixture.detectChanges()
        expect(
          fixture.debugElement.query(By.directive(MockLoadingMaskComponent))
        ).toBeFalsy()
      }))
    })

    describe('when receiving several metadata records', () => {
      beforeEach(() => {
        mdViewFacade.mapApiLinks$.next([])
        mdViewFacade.dataLinks$.next([
          {
            url: 'http://abcd.com/data.geojson',
            name: 'data.geojson',
            protocol: 'WWW:DOWNLOAD',
            format: 'geojson',
          },
        ])
        mdViewFacade.mapApiLinks$.next([
          {
            url: 'http://abcd.com/',
            name: 'layer',
            protocol: 'OGC:WMS',
          },
        ])
        mdViewFacade.dataLinks$.next([])
        fixture.detectChanges()
      })
      it('emits a map context with the link from the last record', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
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
            label: 'layer (OGC:WMS)',
          },
        ])
      })
    })

    describe('when selecting a layer', () => {
      beforeEach(() => {
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
        mdViewFacade.dataLinks$.next([])
        dropdownComponent.selectValue.emit(1)
        fixture.detectChanges()
      })
      it('emits a new map context with the selected layer', () => {
        expect(mapComponent.context).toEqual({
          layers: [
            component.getBackgroundLayer(),
            {
              url: 'http://abcd.com/',
              name: 'layer2',
              type: 'wms',
            },
          ],
          view: expect.any(Object),
        })
      })
    })
  })
})
