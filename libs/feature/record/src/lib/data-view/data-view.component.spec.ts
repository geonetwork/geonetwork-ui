import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, Subject } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataViewComponent } from './data-view.component'
import { TranslateModule } from '@ngx-translate/core'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/dataviz-configuration.model'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'
import { LINK_FIXTURES } from '@geonetwork-ui/common/fixtures'

const DATALINKS_FIXTURE: DatasetDistribution[] = [
  LINK_FIXTURES.dataXls,
  {
    description: 'CSV file',
    name: 'some_file_name.csv',
    url: new URL('https://test.org/some_file_name.csv'),
    type: 'download',
  },
]

const GEODATALINKS_FIXTURE: DatasetDistribution[] = [
  {
    description: 'Geojson file',
    name: 'some_file_name.geojson',
    url: new URL('https://test.org/some_file_name.geojson'),
    type: 'download',
  },
  {
    description: 'Service WFS',
    name: 'abc:featureType',
    url: new URL('https://test.org/wfs'),
    type: 'service',
    accessServiceProtocol: 'wfs',
  },
]

class MdViewFacadeMock {
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

@Component({
  selector: 'gn-ui-table-view',
  template: '<div></div>',
})
export class MockTableViewComponent {
  @Input() link: DatasetDistribution
}

@Component({
  selector: 'gn-ui-chart-view',
  template: '<div></div>',
})
export class MockChartViewComponent {
  @Input() link: DatasetDistribution
  @Output() chartConfig$ = new BehaviorSubject<DatavizConfigurationModel>(null)
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

describe('DataViewComponent', () => {
  let component: DataViewComponent
  let fixture: ComponentFixture<DataViewComponent>
  let facade
  let dropdownComponent: MockDropdownSelectorComponent
  let tableViewComponent: MockTableViewComponent
  let chartViewComponent: MockChartViewComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataViewComponent,
        MockTableViewComponent,
        MockChartViewComponent,
        MockDropdownSelectorComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
      imports: [TranslateModule.forRoot()],
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
      facade.dataLinks$.next(DATALINKS_FIXTURE)
      facade.geoDataLinks$.next(GEODATALINKS_FIXTURE)
      flushMicrotasks()
      fixture.detectChanges()

      dropdownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
      tableViewComponent = fixture.debugElement.query(
        By.directive(MockTableViewComponent)
      ).componentInstance
    }))
    describe('when component is rendered', () => {
      it('shows the dropdown with the same number of entries', () => {
        expect(dropdownComponent.choices).toEqual([
          {
            label: 'CSV file (csv)',
            value: JSON.stringify(DATALINKS_FIXTURE[1]),
          },
          {
            label: 'Data in XLS format (excel)',
            value: JSON.stringify(DATALINKS_FIXTURE[0]),
          },
          {
            label: 'Geojson file (geojson)',
            value: JSON.stringify(GEODATALINKS_FIXTURE[0]),
          },
          {
            label: 'Service WFS (WFS)',
            value: JSON.stringify(GEODATALINKS_FIXTURE[1]),
          },
        ])
      })
      it('displays link in the table', () => {
        expect(tableViewComponent.link).toEqual(DATALINKS_FIXTURE[1])
      })
    })

    describe('when switching data link', () => {
      beforeEach(fakeAsync(() => {
        dropdownComponent.selectValue.emit(
          JSON.stringify(GEODATALINKS_FIXTURE[1])
        )
        flushMicrotasks()
        fixture.detectChanges()
      }))
      it('displays link in the table', () => {
        expect(tableViewComponent.link.description).toEqual(
          GEODATALINKS_FIXTURE[1].description
        )
      })
    })
  })
  describe('use chart view component in chart mode', () => {
    beforeEach(fakeAsync(() => {
      component.mode = 'chart'
      fixture.detectChanges()
      chartViewComponent = fixture.debugElement.query(
        By.directive(MockChartViewComponent)
      ).componentInstance
      chartViewComponent.chartConfig$.next(chartConfigMock)
    }))
    it('creates a chart view component to render data', () => {
      expect(
        fixture.debugElement.query(By.directive(MockChartViewComponent))
      ).toBeTruthy()
    })
    it('does not create a table view component to render data', () => {
      expect(
        fixture.debugElement.query(By.directive(MockTableViewComponent))
      ).toBeFalsy()
    })
    it('calls setChartConfig', () => {
      expect(facade.setChartConfig).toHaveBeenCalledWith(chartConfigMock)
    })
  })
})
