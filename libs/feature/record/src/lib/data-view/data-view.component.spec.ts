import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Subject } from 'rxjs'
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
      it('shows the dropdown with the same number of entries', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            label: 'CSV file (csv)',
            value: JSON.stringify(someDataLinksFixture()[1]),
          },
          {
            label: 'Data in XLS format (excel)',
            value: JSON.stringify(someDataLinksFixture()[0]),
          },
          {
            label: 'Geojson file (geojson)',
            value: JSON.stringify(someGeoDatalinksFixture()[0]),
          },
          {
            label: 'Service WFS (WFS)',
            value: JSON.stringify(someGeoDatalinksFixture()[1]),
          },
        ])
      })
      it('displays link in the table', () => {
        expect(tableViewComponent.link).toEqual(someDataLinksFixture()[1])
      })
    })

    describe('when switching data link', () => {
      beforeEach(fakeAsync(() => {
        dropdownComponent.selectValue.emit(
          JSON.stringify(someGeoDatalinksFixture()[1])
        )
        flushMicrotasks()
        fixture.detectChanges()
      }))
      it('displays link in the table', () => {
        expect(tableViewComponent.link.description).toEqual(
          someGeoDatalinksFixture()[1].description
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
