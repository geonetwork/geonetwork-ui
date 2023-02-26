import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { TableViewComponent } from './table-view.component'
import { MetadataLinkType } from '@geonetwork-ui/util/shared'
import { of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { DataService } from '../service/data.service'
import { LINK_FIXTURES } from '@geonetwork-ui/util/shared/fixtures'

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
  readDataset = jest.fn((url) =>
    url.indexOf('error') > -1
      ? throwError(new Error('data loading error'))
      : of(SAMPLE_GEOJSON.features).pipe(delay(50))
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

describe('TableViewComponent', () => {
  let component: TableViewComponent
  let fixture: ComponentFixture<TableViewComponent>
  let dataService: DataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TableViewComponent,
        MockTableComponent,
        MockLoadingMaskComponent,
        MockPopupAlertComponent,
      ],
      providers: [
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
    })
      .overrideComponent(TableViewComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
    dataService = TestBed.inject(DataService)
    fixture = TestBed.createComponent(TableViewComponent)
    component = fixture.componentInstance
    component.link = LINK_FIXTURES.dataCsv
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    let tableComponent: MockTableComponent

    it('loads the data from the first available link', () => {
      expect(dataService.readDataset).toHaveBeenCalledWith(
        'http://my.server/files/abc.csv',
        'csv'
      )
    })

    describe('during data loading', () => {
      beforeEach(fakeAsync(() => {
        component.link = LINK_FIXTURES.dataCsv
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
        component.link = LINK_FIXTURES.dataCsv
        tick(200)
        fixture.detectChanges()
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
          component.link = LINK_FIXTURES.geodataJson
          fixture.detectChanges()
        })
        it('loads data from selected link', () => {
          expect(dataService.readDataset).toHaveBeenCalledWith(
            'http://my.server/files/geographic/dataset.geojson',
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
      component.link = {
        url: 'http://abcd.com/wfs/error',
        name: 'featuretype',
        protocol: 'OGC:WFS',
        type: MetadataLinkType.WFS,
      }
      fixture.detectChanges()
    })
    it('shows an error warning', () => {
      expect(component.error).toEqual('data loading error')
    })
  })
})
