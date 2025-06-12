import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing'
import { TableViewComponent } from './table-view.component'
import { delay, firstValueFrom, of, throwError } from 'rxjs'
import { ChangeDetectionStrategy } from '@angular/core'
import { By } from '@angular/platform-browser'
import { DataService } from '../service/data.service'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { BaseReader, FetchError } from '@geonetwork-ui/data-fetcher'
import { MockBuilder } from 'ng-mocks'
import { LoadingMaskComponent } from '@geonetwork-ui/ui/widgets'
import { DataTableComponent } from '@geonetwork-ui/ui/dataviz'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const SAMPLE_DATA_ITEMS_CSV = [
  { type: 'Feature', properties: { id: 1 } },
  { type: 'Feature', properties: { id: 2 } },
]
const SAMPLE_DATA_ITEMS_GEOJSON = [
  { type: 'Feature', properties: { id: 3 } },
  { type: 'Feature', properties: { id: 4 } },
]

class DatasetCsvReaderMock {
  read = jest.fn(() => Promise.resolve(SAMPLE_DATA_ITEMS_CSV))
  properties = Promise.resolve([
    { name: 'propNum1', type: 'number' },
    { name: 'propStr1', type: 'string' },
    { name: 'propStr2', type: 'string' },
  ])
}

class DatasetGeoJsonReaderMock {
  read = jest.fn(() => Promise.resolve(SAMPLE_DATA_ITEMS_GEOJSON))
  properties = Promise.resolve([
    { name: 'propStr1', type: 'string' },
    { name: 'propStr2', type: 'string' },
  ])
}
class DataServiceMock {
  getDataset = jest.fn(({ url }) => {
    if (url.toString().indexOf('error') > -1) {
      return throwError(() => new FetchError('unknown', 'data loading error'))
    } else if (url.toString().indexOf('csv') > -1) {
      return of(new DatasetCsvReaderMock()).pipe(delay(100))
    } else {
      return of(new DatasetGeoJsonReaderMock()).pipe(delay(100))
    }
  })
}

describe('TableViewComponent', () => {
  let component: TableViewComponent
  let fixture: ComponentFixture<TableViewComponent>
  let dataService: DataService

  beforeEach(() => MockBuilder(TableViewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
    })
      .overrideComponent(TableViewComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
    dataService = TestBed.inject(DataService)
    fixture = TestBed.createComponent(TableViewComponent)
    component = fixture.componentInstance
  })
  beforeEach(fakeAsync(() => {
    component.link = aSetOfLinksFixture().dataCsv()
    component.featureCatalog = {
      featureTypes: [
        {
          name: 'someName',
          definition: 'definition',
          attributes: [
            { name: 'propNum1', code: 'Proper name', title: 'propNum1' },
          ],
        },
      ],
    }
    fixture.detectChanges()
    flushMicrotasks()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    let tableComponent: DataTableComponent

    it('loads the data from the first available link', () => {
      expect(dataService.getDataset).toHaveBeenCalledWith(
        aSetOfLinksFixture().dataCsv(),
        true
      )
    })

    describe('when link is not defined', () => {
      beforeEach(() => {
        component.link = null
        fixture.detectChanges()
      })
      it('sets tableData undefined', async () => {
        const tableData = await firstValueFrom(component.tableData$)
        expect(tableData).toBeUndefined()
      })
    })

    describe('during data loading', () => {
      beforeEach(fakeAsync(() => {
        component.link = aSetOfLinksFixture().dataCsv()
        tick(50)
        discardPeriodicTasks()
      }))

      it('shows a loading indicator', () => {
        expect(
          fixture.debugElement.query(By.directive(LoadingMaskComponent))
        ).toBeTruthy()
      })
    })

    describe('when data is loaded', () => {
      beforeEach(fakeAsync(() => {
        component.link = aSetOfLinksFixture().dataCsv()
        tick(500)
        fixture.detectChanges()
        flushMicrotasks()
        tableComponent = fixture.debugElement.query(
          By.directive(DataTableComponent)
        ).componentInstance
        fixture.detectChanges()
      }))

      it('passes dataset reader to table', () => {
        expect(tableComponent.dataset).toBeInstanceOf(DatasetCsvReaderMock)
      })

      it('displays data in the table', async () => {
        const data = await tableComponent.dataset.read()
        expect(data).toEqual(SAMPLE_DATA_ITEMS_CSV)
      })

      describe('when switching data link', () => {
        beforeEach(fakeAsync(() => {
          component.link = aSetOfLinksFixture().geodataJson()
          tick(500)
          flushMicrotasks()
          fixture.detectChanges()
        }))
        it('loads data from selected link', () => {
          expect(dataService.getDataset).toHaveBeenCalledWith(
            aSetOfLinksFixture().geodataJson(),
            true
          )
        })
        it('displays mocked data in the table', () => {
          expect(tableComponent.dataset).toBeInstanceOf(
            DatasetGeoJsonReaderMock
          )
        })
        it('displays data in the table', async () => {
          const data = await tableComponent.dataset.read()
          expect(data).toEqual(SAMPLE_DATA_ITEMS_GEOJSON)
        })
      })
    })
  })
  describe('error when loading data', () => {
    beforeEach(fakeAsync(() => {
      dataService.getDataset = () =>
        throwError(() => new Error('data loading error'))
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL('http://changed/'),
      }
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('shows an error warning', () => {
      expect(component.error).toEqual('data loading error')
    })
  })
  describe('FetchError when loading data', () => {
    beforeEach(fakeAsync(() => {
      component.link = {
        url: new URL('http://abcd.com/wfs/error'),
        type: 'download',
      }
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('shows an error warning', () => {
      expect(component.error).toEqual('dataset.error.unknown')
    })
  })
  describe('when cache is deactivated', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.cacheActive = false
      component.link = aSetOfLinksFixture().dataCsv()
      fixture.detectChanges()
      tick(500)
      flushMicrotasks()
    }))

    it('loads the data without the cache', () => {
      expect(dataService.getDataset).toHaveBeenCalledWith(
        aSetOfLinksFixture().dataCsv(),
        false
      )
    })
  })
  describe('When link is restricted', () => {
    it('shows an error message', () => {
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        accessRestricted: true,
      }
      fixture.detectChanges()
      expect(component.error).toEqual('dataset.error.restrictedAccess')
    })
  })
  describe('setProperties', () => {
    beforeEach(() => {
      const dataset = {
        properties: Promise.resolve([
          {
            name: 'propNum1',
            type: 'number',
            label: 'propNum1',
          },
          {
            name: 'propStr1',
            type: 'string',
            label: 'propStr1',
          },
          {
            name: 'propStr2',
            type: 'string',
            label: 'propStr2',
          },
        ]),
      } as unknown as BaseReader

      component.setProperties(dataset)
      fixture.detectChanges()
    })
    it('should update properties correctly with featureAttributes', async () => {
      expect(component.featureAttributes).toEqual([
        { label: 'Proper name', value: 'propNum1' },
        { label: 'propStr1', value: 'propStr1' },
        { label: 'propStr2', value: 'propStr2' },
      ])
    })
  })
})
