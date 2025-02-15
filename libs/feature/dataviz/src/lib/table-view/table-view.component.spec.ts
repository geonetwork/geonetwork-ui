import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing'
import { TableViewComponent } from './table-view.component'
import { of, throwError } from 'rxjs'
import { ChangeDetectionStrategy, importProvidersFrom } from '@angular/core'
import { By } from '@angular/platform-browser'
import { DataService } from '../service/data.service'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { MockBuilder } from 'ng-mocks'
import { TranslateModule } from '@ngx-translate/core'
import { LoadingMaskComponent } from '@geonetwork-ui/ui/widgets'
import { TableComponent } from '@geonetwork-ui/ui/dataviz'

const SAMPLE_DATA_ITEMS = [
  { type: 'Feature', properties: { id: 1 } },
  { type: 'Feature', properties: { id: 2 } },
]
const SAMPLE_TABLE_DATA = [{ id: 1 }, { id: 2 }]

class DatasetReaderMock {
  read = jest.fn(() => Promise.resolve(SAMPLE_DATA_ITEMS))
}
class DataServiceMock {
  getDataset = jest.fn(({ url }) =>
    url.toString().indexOf('error') > -1
      ? throwError(() => new FetchError('unknown', 'data loading error'))
      : of(new DatasetReaderMock())
  )
}

describe('TableViewComponent', () => {
  let component: TableViewComponent
  let fixture: ComponentFixture<TableViewComponent>
  let dataService: DataService

  beforeEach(() => MockBuilder(TableViewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
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
    fixture.detectChanges()
    flushMicrotasks()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    let tableComponent: TableComponent

    it('loads the data from the first available link', () => {
      expect(dataService.getDataset).toHaveBeenCalledWith(
        aSetOfLinksFixture().dataCsv()
      )
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
        fixture.detectChanges()
        flushMicrotasks()
        tableComponent = fixture.debugElement.query(
          By.directive(TableComponent)
        ).componentInstance
        fixture.detectChanges()
      }))

      it('displays mocked data in the table', () => {
        expect(tableComponent.data).toEqual(SAMPLE_TABLE_DATA)
      })

      describe('when switching data link', () => {
        beforeEach(fakeAsync(() => {
          component.link = aSetOfLinksFixture().geodataJson()
          flushMicrotasks()
          fixture.detectChanges()
        }))
        it('loads data from selected link', () => {
          expect(dataService.getDataset).toHaveBeenCalledWith(
            aSetOfLinksFixture().geodataJson()
          )
        })
        it('displays mocked data in the table', () => {
          expect(tableComponent.data).toEqual(SAMPLE_TABLE_DATA)
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
})
