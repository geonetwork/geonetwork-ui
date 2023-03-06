import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing'
import { ChartViewComponent } from './chart-view.component'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { DataService } from '../service/data.service'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { LINK_FIXTURES } from '@geonetwork-ui/util/shared/fixtures'

@Component({
  selector: 'gn-ui-chart',
  template: '<div></div>',
})
export class MockChartComponent {
  @Input() data: object[]
  @Input() labelProperty: string
  @Input() valueProperty: string
  @Input() secondaryValueProperty: string
  @Input() type: string
}

@Component({
  selector: 'gn-ui-dropdown-selector',
  template: '<div></div>',
})
export class MockDropdownSelectorComponent {
  @Input() choices: unknown[]
  @Output() selectValue = new EventEmitter<any>()
}

const SAMPLE_DATA_ITEMS = [
  { type: 'Feature', properties: { id: 1 } },
  { type: 'Feature', properties: { id: 2 } },
]
const SAMPLE_CHART_DATA = [{ id: 1 }, { id: 2 }]

class DatasetReaderMock {
  constructor() {
    DatasetReaderMock.instance = this
  }
  public static instance: DatasetReaderMock
  properties = Promise.resolve([
    {
      name: 'propNum1',
      type: 'number',
    },
    {
      name: 'propStr1',
      type: 'string',
    },
    {
      name: 'propStr2',
      type: 'string',
    },
    {
      name: 'propDate1',
      type: 'date',
    },
    {
      name: 'propNum2',
      type: 'number',
    },
  ])
  groupBy = jest.fn(() => this)
  aggregate = jest.fn(() => this)
  read = jest.fn(() => Promise.resolve(SAMPLE_DATA_ITEMS))
}
class DataServiceMock {
  getDataset = jest.fn(() => of(new DatasetReaderMock()))
}

describe('ChartViewComponent', () => {
  let component: ChartViewComponent
  let fixture: ComponentFixture<ChartViewComponent>
  let dataService: DataService
  let chartComponent: MockChartComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChartViewComponent,
        MockDropdownSelectorComponent,
        MockChartComponent,
      ],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
    })
      .overrideComponent(ChartViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    dataService = TestBed.inject(DataService)
    fixture = TestBed.createComponent(ChartViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  beforeEach(fakeAsync(() => {
    component.link = LINK_FIXTURES.dataCsv
    flushMicrotasks()
    chartComponent = fixture.debugElement.query(
      By.directive(MockChartComponent)
    ).componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial link input', () => {
    it('creates a dataset reader once from the link', () => {
      expect(dataService.getDataset).toHaveBeenCalledTimes(1)
      expect(dataService.getDataset).toHaveBeenCalledWith(LINK_FIXTURES.dataCsv)
    })
    it('choses the first string property for X', () => {
      expect(chartComponent.labelProperty).toBe('distinct(propStr1)')
    })
    it('choses the first numeric property for Y', () => {
      expect(chartComponent.valueProperty).toBe('sum(propNum1)')
    })
    it('reads dataset using sum aggregation, grouped by distinct X values', () => {
      expect(DatasetReaderMock.instance.groupBy).toHaveBeenCalledWith([
        'distinct',
        'propStr1',
      ])
      expect(DatasetReaderMock.instance.aggregate).toHaveBeenCalledWith([
        'sum',
        'propNum1',
      ])
      expect(DatasetReaderMock.instance.read).toHaveBeenCalledTimes(1)
    })
    it('renders bar chart', () => {
      expect(chartComponent.type).toBe('bar')
      expect(chartComponent.data).toEqual(SAMPLE_CHART_DATA)
    })
  })

  describe('when link changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.link = { ...LINK_FIXTURES.dataCsv, url: 'http://changed/' }
      flushMicrotasks()
    }))
    it('recreates the dataset reader', () => {
      expect(dataService.getDataset).toHaveBeenCalledTimes(1)
    })
  })

  describe('when x property changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.xProperty$.next('propStr2')
      tick(10)
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('does not re-create the dataset reader', () => {
      expect(dataService.getDataset).not.toHaveBeenCalled()
    })
    it('reads dataset', () => {
      expect(DatasetReaderMock.instance.groupBy).toHaveBeenCalledWith([
        'distinct',
        'propStr2',
      ])
      expect(DatasetReaderMock.instance.read).toHaveBeenCalledTimes(1)
    })
    it('uses the new value for X', () => {
      expect(chartComponent.labelProperty).toBe('distinct(propStr2)')
    })
  })

  describe('when y property changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.yProperty$.next('propNum2')
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('does not re-create the dataset reader', () => {
      expect(dataService.getDataset).not.toHaveBeenCalled()
    })
    it('reads dataset', () => {
      expect(DatasetReaderMock.instance.aggregate).toHaveBeenCalledWith([
        'sum',
        'propNum2',
      ])
      expect(DatasetReaderMock.instance.read).toHaveBeenCalledTimes(1)
    })
    it('uses the new value for Y', () => {
      expect(chartComponent.valueProperty).toBe('sum(propNum2)')
    })
  })

  describe('when chart type changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.chartType = 'line'
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('does not re-create the dataset reader', () => {
      expect(dataService.getDataset).not.toHaveBeenCalled()
    })
    it('does not read dataset again', () => {
      expect(DatasetReaderMock.instance.read).not.toHaveBeenCalled()
    })
    it('update chart', () => {
      expect(chartComponent.type).toBe('line')
    })
  })

  describe('when aggregation type changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.aggregation$.next('average')
      flushMicrotasks()
    }))
    it('does not re-create the dataset reader', () => {
      expect(dataService.getDataset).not.toHaveBeenCalled()
    })
    it('reads dataset', () => {
      expect(DatasetReaderMock.instance.aggregate).toHaveBeenCalledWith([
        'average',
        'propNum1',
      ])
      expect(DatasetReaderMock.instance.read).toHaveBeenCalledTimes(1)
    })
  })

  describe('count aggregation', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.aggregation$.next('count')
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('reads dataset with count() aggregation', () => {
      expect(DatasetReaderMock.instance.aggregate).toHaveBeenCalledWith([
        'count',
      ])
      expect(DatasetReaderMock.instance.read).toHaveBeenCalledTimes(1)
    })
    it('hides the Y property field', () => {
      const select = fixture.debugElement.query(By.css('.select-y-prop'))
      expect(select).toBeFalsy()
    })
  })
})
