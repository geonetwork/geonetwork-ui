import { Component, Input, EventEmitter, Output } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'

import { DataViewTableComponent } from './data-view-table.component'
import { readDataset } from '@geonetwork-ui/data-fetcher'
import { TranslateModule } from '@ngx-translate/core'

jest.mock('@camptocamp/ogc-client', () => ({
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve({
        getFeatureUrl: () => this.url + '?GetFeature',
        getFeatureTypeSummary: () => ({
          name: 'MockName',
          outputFormats: ['geojson', 'csv'],
        }),
        supportsJson: () => true,
      })
    }
  },
}))

// mock a 100ms delay before serving the file
jest.mock('@geonetwork-ui/data-fetcher', () => ({
  readDataset: jest.fn(
    (url) =>
      new Promise((resolve, reject) => {
        url.indexOf('error') === -1
          ? setTimeout(() => resolve(SAMPLE_GEOJSON.features), 100)
          : reject(new Error('data loading error'))
      })
  ),
}))

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

const DATALINKS_FIXTURE = [
  {
    description: 'CSV file',
    name: 'some_file_name.csv',
    format: 'csv',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.csv',
  },
  {
    description: 'Geojson file',
    name: 'some_file_name.geojson',
    format: 'geojson',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.geojson',
  },
  {
    description: 'Service WFS',
    name: 'abc:featureType',
    protocol: 'OGC:WFS',
    url: 'https://test.org/wfs',
  },
]

class MdViewFacadeMock {
  dataLinks$ = new Subject()
}

@Component({
  selector: 'gn-ui-table',
  template: '<div></div>',
})
export class MockTableComponent {
  @Input() data: []
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<number>()
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
export class MockLoadingMaskComponent {
  @Input() message
}

@Component({
  selector: 'gn-ui-popup-alert',
  template: '<div></div>',
})
export class MockPopupAlertComponent {}

describe('DataViewTableComponent', () => {
  let component: DataViewTableComponent
  let fixture: ComponentFixture<DataViewTableComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewTableComponent,
        MockTableComponent,
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
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    let dropDownComponent: MockDropdownSelectorComponent
    let tableComponent: MockTableComponent

    beforeEach(() => {
      dropDownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
    })

    describe('when component is rendered', () => {
      beforeEach(() => {
        facade.dataLinks$.next(DATALINKS_FIXTURE)
        fixture.detectChanges()
      })

      it('shows the dropdown with the same number of entries', () => {
        expect(dropDownComponent.choices).toEqual([
          {
            label: 'CSV file',
            value: 0,
          },
          {
            label: 'Geojson file',
            value: 1,
          },
          {
            label: 'Service WFS',
            value: 2,
          },
        ])
      })

      it('loads the data from the first available link', () => {
        expect(readDataset).toHaveBeenCalledWith(
          'https://test.org/some_file_name.csv'
        )
      })
    })

    describe('during data loading', () => {
      beforeEach(fakeAsync(() => {
        facade.dataLinks$.next(DATALINKS_FIXTURE)
        tick(50)
        fixture.detectChanges()
        flush()
      }))
      it('shows a loading indicator', () => {
        expect(
          fixture.debugElement.query(By.directive(MockLoadingMaskComponent))
        ).toBeTruthy()
      })
    })
    describe('when data is loaded', () => {
      beforeEach(fakeAsync(() => {
        facade.dataLinks$.next(DATALINKS_FIXTURE)
        tick(200)
        fixture.detectChanges()
        flush()

        tableComponent = fixture.debugElement.query(
          By.directive(MockTableComponent)
        ).componentInstance
      }))
      it('displays mocked data in the table', () => {
        expect(tableComponent.data).toEqual([
          {
            id: SAMPLE_GEOJSON.features[0].id,
            ...SAMPLE_GEOJSON.features[0].properties,
          },
        ])
      })

      describe('when switching data link', () => {
        beforeEach(() => {
          dropDownComponent.selectValue.emit(1)
        })
        it('loads data from selected link', () => {
          expect(readDataset).toHaveBeenCalledWith(
            'https://test.org/some_file_name.geojson'
          )
        })
        it('displays mocked data in the table', () => {
          expect(tableComponent.data).toEqual([
            {
              id: SAMPLE_GEOJSON.features[0].id,
              ...SAMPLE_GEOJSON.features[0].properties,
            },
          ])
        })
      })
    })
  })
  describe('error when loading data', () => {
    beforeEach(fakeAsync(() => {
      facade.dataLinks$.next([
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
    it('shows an error warning', () => {
      expect(component.error).toEqual('data loading error')
    })
  })
})
