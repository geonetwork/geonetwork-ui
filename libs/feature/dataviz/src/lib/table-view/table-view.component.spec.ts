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
import { LINK_FIXTURES } from '@geonetwork-ui/common/fixtures'
import { FetchError } from '@geonetwork-ui/data-fetcher'

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
  })
  beforeEach(fakeAsync(() => {
    component.link = LINK_FIXTURES.dataCsv
    fixture.detectChanges()
    flushMicrotasks()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    let tableComponent: MockTableComponent

    it('loads the data from the first available link', () => {
      expect(dataService.getDataset).toHaveBeenCalledWith(LINK_FIXTURES.dataCsv)
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
        fixture.detectChanges()
        flushMicrotasks()
        tableComponent = fixture.debugElement.query(
          By.directive(MockTableComponent)
        ).componentInstance
        fixture.detectChanges()
      }))

      it('displays mocked data in the table', () => {
        expect(tableComponent.data).toEqual(SAMPLE_TABLE_DATA)
      })

      describe('when switching data link', () => {
        beforeEach(fakeAsync(() => {
          component.link = LINK_FIXTURES.geodataJson
          flushMicrotasks()
          fixture.detectChanges()
        }))
        it('loads data from selected link', () => {
          expect(dataService.getDataset).toHaveBeenCalledWith(
            LINK_FIXTURES.geodataJson
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
        ...LINK_FIXTURES.dataCsv,
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
