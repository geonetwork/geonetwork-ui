import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state/index.js'
import { DataViewComponent } from './data-view.component.js'
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

class MdViewFacadeMock {
  isHighUpdateFrequency$ = new Subject()
  dataLinks$ = new Subject()
  geoDataLinks$ = new Subject()
  setChartConfig = jest.fn()
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
  let facade
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
        provideI18n(),
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
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
      facade.dataLinks$.next(someDataLinksFixture())
      facade.geoDataLinks$.next(someGeoDatalinksFixture())
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
      describe('Selected view is map', () => {
        beforeEach(() => {
          component.selectedView = 'map'
          fixture.detectChanges()
        })
        it('config - should not take the config into account', () => {
          component.datavizConfig = {
            view: 'map',
            source: someGeoDatalinksFixture()[0],
          }
          fixture.detectChanges()
          const emitSpy = jest.spyOn(component.linkSelected, 'emit')
          expect(emitSpy).toHaveBeenCalledTimes(0)
          expect(component._chartConfig).toBe(null)
          expect(component._selectedChoice).toBe(null)
        })
        it('no config - should not emit the first link', () => {
          const emitSpy = jest.spyOn(component.linkSelected, 'emit')
          expect(emitSpy).toHaveBeenCalledTimes(0)
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
      expect(facade.setChartConfig).toHaveBeenCalledWith(chartConfigMock)
    })
  })
  describe('When the WFS link has too many features', () => {
    beforeEach(fakeAsync(() => {
      component.mode = 'chart'
      fixture.detectChanges()
      facade.dataLinks$.next(someDataLinksFixture())
      facade.geoDataLinks$.next(someGeoDatalinksFixture())
      flushMicrotasks()
      fixture.detectChanges()

      dropdownComponent = fixture.debugElement.query(
        By.directive(DropdownSelectorComponent)
      ).componentInstance
      dropdownComponent.selectValue.emit(
        JSON.stringify(someGeoDatalinksFixture()[1])
      )
      component.excludeWfs$.next(true)
      flushMicrotasks()
      fixture.detectChanges()
    }))
    it('should set hidePreview to true', () => {
      const expected = hot('a', { a: true })
      expect(component.hidePreview$).toBeObservable(expected)
    })
  })
})
