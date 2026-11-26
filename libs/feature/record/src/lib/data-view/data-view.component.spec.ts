import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataViewComponent } from './data-view.component'
import {
  someDataLinksFixture,
  someGeoDatalinksFixture,
} from '@geonetwork-ui/common/fixtures'
import { MockBuilder } from 'ng-mocks'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import {
  ChartViewComponent,
  TableViewComponent,
} from '@geonetwork-ui/feature/dataviz'
import { hot } from 'jasmine-marbles'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { getLinkId } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model'
import { MdViewService } from '../service/mdview.service'

class MdViewFacadeMock {
  isHighUpdateFrequency$ = new Subject()
  dataLinks$ = new Subject()
  geoDataLinks$ = new Subject()
  chartConfig$ = new BehaviorSubject(null)
  setChartConfig = jest.fn()
}

class MdViewServiceMock {
  exceedsMaxFeatureCount$ = jest.fn(() => of(false))
}

const chartConfigMock = {
  aggregation: 'sum',
  xProperty: 'anneeappro',
  yProperty: 'nbre_com',
  chartType: 'bar',
}

describe('DataViewComponent', () => {
  let component: DataViewComponent
  let fixture: ComponentFixture<DataViewComponent>
  let mdViewFacade
  let dropdownComponent: DropdownSelectorComponent
  let tableViewComponent: TableViewComponent
  let chartViewComponent: ChartViewComponent

  beforeEach(() => MockBuilder(DataViewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: MdViewService,
          useClass: MdViewServiceMock,
        },
        provideI18n(),
      ],
    }).compileComponents()
    mdViewFacade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state in table mode', () => {
    beforeEach(fakeAsync(() => {
      component.mode = 'table'
      fixture.detectChanges()
      mdViewFacade.dataLinks$.next(someDataLinksFixture())
      mdViewFacade.geoDataLinks$.next(someGeoDatalinksFixture())
      flushMicrotasks()
      fixture.detectChanges()

      dropdownComponent = fixture.debugElement.query(
        By.directive(DropdownSelectorComponent)
      ).componentInstance
      tableViewComponent = fixture.debugElement.query(
        By.directive(TableViewComponent)
      ).componentInstance
    }))

    describe('when component is rendered', () => {
      describe('Selected view is table or chart', () => {
        it('shows the dropdown with the same number of entries', () => {
          expect(dropdownComponent.choices).toEqual([
            {
              label: 'CSV file (csv)',
              value: getLinkId(someDataLinksFixture()[1]),
            },
            {
              label: 'Data in XLS format (excel)',
              value: getLinkId(someDataLinksFixture()[0]),
            },
            {
              label: 'Geojson file (geojson)',
              value: getLinkId(someGeoDatalinksFixture()[0]),
            },
            {
              label: 'Service WFS (WFS)',
              value: getLinkId(someGeoDatalinksFixture()[1]),
            },
          ])
        })
        it('no config - displays the first link of the table', () => {
          expect(tableViewComponent.link).toEqual(someDataLinksFixture()[1])
        })
        it('config - displays the config link and selects the right option for the table', () => {
          component.datavizConfig = {
            view: 'table',
            source: someDataLinksFixture()[0],
          }
          fixture.detectChanges()
          expect(tableViewComponent.link).toEqual(
            component.linkMap.get(getLinkId(someDataLinksFixture()[0]))
          )
          expect(dropdownComponent.selected).toEqual(
            getLinkId(someDataLinksFixture()[0])
          )
        })
        it('config - sets the chartConfig for chart view', () => {
          component.mode = 'chart'
          component.datavizConfig = {
            view: 'chart',
            source: someDataLinksFixture()[0],
            chartConfig: chartConfigMock,
          }
          fixture.detectChanges()
          expect(component._chartConfig).toEqual(chartConfigMock)
        })
      })
    })

    describe('when switching data link', () => {
      beforeEach(fakeAsync(() => {
        dropdownComponent.selectValue.emit(
          getLinkId(someGeoDatalinksFixture()[1])
        )
        flushMicrotasks()
        fixture.detectChanges()
      }))
      it('displays link in the table', () => {
        expect(tableViewComponent.link).toEqual(
          component.linkMap.get(getLinkId(someGeoDatalinksFixture()[1]))
        )
      })
    })
  })

  describe('use chart view component in chart mode', () => {
    beforeEach(fakeAsync(() => {
      component.mode = 'chart'
      fixture.detectChanges()
      chartViewComponent = fixture.debugElement.query(
        By.directive(ChartViewComponent)
      ).componentInstance
      chartViewComponent.chartConfig$.next(chartConfigMock)
    }))
    it('creates a chart view component to render data', () => {
      expect(
        fixture.debugElement.query(By.directive(ChartViewComponent))
      ).toBeTruthy()
    })
    it('does not create a table view component to render data', () => {
      expect(
        fixture.debugElement.query(By.directive(TableViewComponent))
      ).toBeFalsy()
    })
    it('calls setChartConfig', () => {
      expect(mdViewFacade.setChartConfig).toHaveBeenCalledWith(chartConfigMock)
    })
  })

  describe('get current dataviz config', () => {
    let firstLink: DatasetOnlineResource

    beforeEach(fakeAsync(() => {
      firstLink = {
        url: new URL('http://example.com'),
        type: 'link',
        name: 'test',
      } as DatasetOnlineResource
      mdViewFacade.chartConfig$ = new BehaviorSubject(null)
      component.dropdownChoices$.subscribe()
      mdViewFacade.dataLinks$.next([firstLink])
      mdViewFacade.geoDataLinks$.next([])
      flushMicrotasks()
      fixture.detectChanges()
    }))

    it('returns the dataviz config for the table view', fakeAsync(() => {
      component.mode = 'table'

      const config = component.getDatavizConfig()

      expect(config).toEqual({
        view: 'table',
        source: firstLink,
        chartConfig: null,
      })
    }))

    it('returns the dataviz config for the chart view', fakeAsync(() => {
      component.mode = 'chart'
      mdViewFacade.chartConfig$.next(chartConfigMock)

      const config = component.getDatavizConfig()

      expect(config).toEqual({
        view: 'chart',
        source: firstLink,
        chartConfig: chartConfigMock,
      })
    }))
  })

  describe('When the WFS link has too many features', () => {
    beforeEach(fakeAsync(() => {
      const mdViewService = TestBed.inject(
        MdViewService
      ) as unknown as MdViewServiceMock
      mdViewService.exceedsMaxFeatureCount$.mockReturnValue(of(true))

      fixture = TestBed.createComponent(DataViewComponent)
      component = fixture.componentInstance

      component.mode = 'chart'
      fixture.detectChanges()

      mdViewFacade.dataLinks$.next(someDataLinksFixture())
      mdViewFacade.geoDataLinks$.next(someGeoDatalinksFixture())
      flushMicrotasks()
      fixture.detectChanges()

      dropdownComponent = fixture.debugElement.query(
        By.directive(DropdownSelectorComponent)
      ).componentInstance

      dropdownComponent.selectValue.emit(
        getLinkId(someGeoDatalinksFixture()[1])
      )
      flushMicrotasks()
      fixture.detectChanges()
    }))

    it('should set hidePreview to true', () => {
      const expected = hot('(a|)', { a: true })
      expect(component.hidePreview$).toBeObservable(expected)
    })
  })
})
