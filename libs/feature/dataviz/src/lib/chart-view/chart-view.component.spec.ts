import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing'
import { ChartViewComponent } from './chart-view.component'
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { DataService } from '../service/data.service'
import { firstValueFrom, of, throwError } from 'rxjs'
import { By } from '@angular/platform-browser'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { MockBuilder } from 'ng-mocks'
import { ChartComponent } from '@geonetwork-ui/ui/dataviz'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const SAMPLE_DATA_ITEMS = [
  { type: 'Feature', properties: { id: 1 } },
  { type: 'Feature', properties: { id: 2 } },
]
const SAMPLE_CHART_DATA = [{ id: 1 }, { id: 2 }]

class DatasetReaderMock {
  constructor(private url: string) {
    let properties = [
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
      {
        name: 'propDate1',
        type: 'date',
        label: 'propDate1',
      },
      {
        name: 'propNum2',
        type: 'number',
        label: 'propNum2',
      },
    ]
    if (url.indexOf('no-string-props') > -1) {
      properties = properties.filter((p) => p.type !== 'string')
    }
    if (url.indexOf('no-number-props') > -1) {
      properties = properties.filter((p) => p.type !== 'number')
    }
    if (url.indexOf('no-date-props') > -1) {
      properties = properties.filter((p) => p.type !== 'date')
    }
    this.properties = Promise.resolve(properties)
    if (url.indexOf('error-props') > -1) {
      this.properties = Promise.reject(
        new FetchError('unknown', 'could not get props')
      )
    }
    DatasetReaderMock.instance = this
  }
  public static instance: DatasetReaderMock
  properties: Promise<any[]>
  groupBy = jest.fn(() => this)
  aggregate = jest.fn(() => this)
  read = jest.fn(() =>
    this.url.indexOf('more-results') > -1
      ? Promise.resolve(SAMPLE_DATA_ITEMS.concat(SAMPLE_DATA_ITEMS))
      : Promise.resolve(SAMPLE_DATA_ITEMS)
  )
}
class DataServiceMock {
  getDataset = jest.fn((link) => of(new DatasetReaderMock(link.url.toString())))
}

describe('ChartViewComponent', () => {
  let component: ChartViewComponent
  let fixture: ComponentFixture<ChartViewComponent>
  let dataService: DataService
  let chartComponent: ChartComponent

  beforeEach(() => MockBuilder(ChartViewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    component.link = aSetOfLinksFixture().dataCsv()
    flushMicrotasks()
    chartComponent = fixture.debugElement.query(
      By.directive(ChartComponent)
    ).componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial link input', () => {
    it('creates a dataset reader once from the link', () => {
      expect(dataService.getDataset).toHaveBeenCalledTimes(1)
      expect(dataService.getDataset).toHaveBeenCalledWith(
        aSetOfLinksFixture().dataCsv(),
        true
      )
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
    it('does not stay in loading state', () => {
      expect(component.loading).toBe(false)
    })
  })

  describe('when link changes', () => {
    beforeEach(fakeAsync(() => {
      jest.clearAllMocks()
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL('http://changed/'),
      }
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
    it('updates xProperty of the chartConfig$', async () => {
      const config = await firstValueFrom(component.chartConfig$)
      expect(config.xProperty).toBe('propStr2')
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
    it('updates yProperty of the chartConfig$', async () => {
      const config = await firstValueFrom(component.chartConfig$)
      expect(config.yProperty).toBe('propNum2')
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
    it('updates chartType of the chartConfig$', async () => {
      const config = await firstValueFrom(component.chartConfig$)
      expect(config.chartType).toBe('line')
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
    it('updates aggregation of the chartConfig$', async () => {
      const config = await firstValueFrom(component.chartConfig$)
      expect(config.aggregation).toBe('average')
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

  describe('dataset reader fails', () => {
    beforeEach(fakeAsync(() => {
      dataService.getDataset = () =>
        throwError(() => new Error('could not open dataset'))
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL('http://changed/'),
      }
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('does not stay in loading state', () => {
      expect(component.loading).toBe(false)
    })
    it('shows error', () => {
      expect(component.error).toBe('could not open dataset')
    })
    it('does not display chart', () => {
      const chart = fixture.debugElement.query(By.directive(ChartComponent))
      expect(chart).toBeFalsy()
    })
  })

  describe('dataset fails on properties info', () => {
    beforeEach(fakeAsync(() => {
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL('http://error-props/'),
      }
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('does not stay in loading state', () => {
      expect(component.loading).toBe(false)
    })
    it('shows error', () => {
      expect(component.error).toBe('dataset.error.unknown')
    })

    it('does not display chart', () => {
      const chart = fixture.debugElement.query(By.directive(ChartComponent))
      expect(chart).toBeFalsy()
    })
  })

  describe('no fitting property for x', () => {
    beforeEach(fakeAsync(() => {
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL('http://server.org/no-string-props/'),
      }
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('gives an empty value for X', () => {
      expect(chartComponent.labelProperty).toBe('')
    })
  })

  describe('no fitting property for y', () => {
    let aggChoicesComponent: DropdownSelectorComponent
    beforeEach(fakeAsync(() => {
      component.aggregation$.next('sum')
      component.link = {
        ...aSetOfLinksFixture().dataCsv(),
        url: new URL(
          'http://server.org/no-number-props/no-date-props/more-results/'
        ),
      }
      component.yProperty$.next('')
      flushMicrotasks()
      fixture.detectChanges()
      aggChoicesComponent = fixture.debugElement.query(
        By.css('.aggregation-choices')
      ).componentInstance
    }))
    it('switches to count aggregation', () => {
      expect(chartComponent.valueProperty).toBe('count()')
    })
    it('only offers sum aggregation', () => {
      expect(aggChoicesComponent.choices).toEqual([
        {
          label: 'chart.aggregation.count',
          value: 'count',
        },
      ])
    })
    it('gives new data to the chart', () => {
      expect(chartComponent.data).toEqual([
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
      ])
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
      component.featureCatalog$.next({
        featureTypes: [
          {
            name: 'someName',
            definition: 'definition',
            attributes: [
              { name: 'propNum1', code: 'Proper name', title: 'propNum1' },
            ],
          },
        ],
      })
      fixture.detectChanges()
    })
    it('should update properties correctly with featureAttributes', async () => {
      const properties = await firstValueFrom(component.properties$)
      expect(properties).toEqual([
        {
          name: 'propNum1',
          type: 'number',
          label: 'Proper name',
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
        {
          name: 'propDate1',
          type: 'date',
          label: 'propDate1',
        },
        {
          name: 'propNum2',
          type: 'number',
          label: 'propNum2',
        },
      ])
    })
  })
})
