import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of, Subject, throwError } from 'rxjs'
import { MdViewFacade } from '../state'

import { DataViewTableComponent } from './data-view-table.component'
import { TranslateModule } from '@ngx-translate/core'
import { delay } from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { MetadataLink, MetadataLinkType } from '@geonetwork-ui/util/shared'

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

const DATALINKS_FIXTURE: MetadataLink[] = [
  {
    label: 'CSV file',
    description: 'CSV file',
    name: 'some_file_name.csv',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.csv',
    type: MetadataLinkType.DOWNLOAD,
  },
]
const GEODATALINKS_FIXTURE: MetadataLink[] = [
  {
    label: 'Geojson file',
    description: 'Geojson file',
    name: 'some_file_name.geojson',
    protocol: 'WWW:DOWNLOAD',
    url: 'https://test.org/some_file_name.geojson',
    type: MetadataLinkType.DOWNLOAD,
  },
  {
    label: 'Service WFS',
    description: 'Service WFS',
    name: 'abc:featureType',
    protocol: 'OGC:WFS',
    url: 'https://test.org/wfs',
    type: MetadataLinkType.WFS,
  },
]

class MdViewFacadeMock {
  dataLinks$ = new Subject()
  geoDataLinks$ = new Subject()
}

class DataServiceMock {
  getGeoJsonDownloadUrlFromWfs = jest.fn((url) => of(url + '?download'))
  getGeoJsonDownloadUrlFromEsriRest = jest.fn((url) => of(url + '?download'))
  readDataset = jest.fn(() => of(SAMPLE_GEOJSON).pipe(delay(100)))
  readGeoJsonDataset = jest.fn((url) =>
    url.indexOf('error') > -1
      ? throwError(new Error('data loading error'))
      : of(SAMPLE_GEOJSON).pipe(delay(100))
  )
}

@Component({
  selector: 'gn-ui-table',
  template: '<div></div>',
})
export class MockTableComponent {
  @Input() data: []
  @Input() activeId
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
  let dataService: DataService

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
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    dataService = TestBed.inject(DataService)
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

    describe('when component is rendered', () => {
      beforeEach(() => {
        facade.dataLinks$.next(DATALINKS_FIXTURE)
        facade.geoDataLinks$.next(GEODATALINKS_FIXTURE)
        fixture.detectChanges()
        dropDownComponent = fixture.debugElement.query(
          By.directive(MockDropdownSelectorComponent)
        ).componentInstance
      })

      it('shows the dropdown with the same number of entries', () => {
        expect(dropDownComponent.choices).toEqual([
          {
            label: 'CSV file (csv)',
            value: 0,
          },
          {
            label: 'Geojson file (geojson)',
            value: 1,
          },
          {
            label: 'Service WFS (WFS)',
            value: 2,
          },
        ])
      })

      it('loads the data from the first available link', () => {
        expect(dataService.readDataset).toHaveBeenCalledWith(
          'https://test.org/some_file_name.csv',
          'csv'
        )
      })
    })

    describe('during data loading', () => {
      beforeEach(fakeAsync(() => {
        facade.dataLinks$.next(DATALINKS_FIXTURE)
        facade.geoDataLinks$.next([])
        fixture.detectChanges()
        tick(50)
        discardPeriodicTasks()
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
        facade.geoDataLinks$.next(GEODATALINKS_FIXTURE)
        tick(200)
        fixture.detectChanges()

        dropDownComponent = fixture.debugElement.query(
          By.directive(MockDropdownSelectorComponent)
        ).componentInstance

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
          dropDownComponent = fixture.debugElement.query(
            By.directive(MockDropdownSelectorComponent)
          ).componentInstance
          dropDownComponent.selectValue.emit(1)
        })
        it('loads data from selected link', () => {
          expect(dataService.readDataset).toHaveBeenCalledWith(
            'https://test.org/some_file_name.geojson',
            'geojson'
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
    beforeEach(() => {
      facade.dataLinks$.next([])
      facade.geoDataLinks$.next([
        {
          url: 'http://abcd.com/wfs/error',
          name: 'featuretype',
          protocol: 'OGC:WFS',
          type: MetadataLinkType.WFS,
        },
      ])
    })
    it('shows an error warning', () => {
      expect(component.error).toEqual('data loading error')
    })
  })
})
