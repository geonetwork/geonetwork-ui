import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CHART_ITEM_FIXTURE } from './chart.fixtures'
import { ChartComponent } from './chart.component'
import { Chart } from 'chart.js'

jest.mock('chart.js')
Chart.register = jest.fn()

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    component.data = CHART_ITEM_FIXTURE
    component.xAxis = 'name'
    component.yAxis = 'age'
    component.chartType = 'bar'
  })

  describe('create chart', () => {
    let createChartSpy
    let getChartTypeSpy
    let getOptionsSpy

    beforeEach(() => {
      createChartSpy = jest.spyOn(component, 'createChart')
      getChartTypeSpy = jest.spyOn(component, 'getChartType')
      getOptionsSpy = jest.spyOn(component, 'getOptions')
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should call create chart', () => {
      expect(createChartSpy).toHaveBeenCalled()
    })

    it('should call getChartType for mapping', () => {
      expect(getChartTypeSpy).toHaveBeenCalled()
    })

    it('should call getOptions for ChartType dependent options', () => {
      expect(getOptionsSpy).toHaveBeenCalled()
    })

    it('should create a chart', () => {
      expect(component.chart).toBeTruthy()
    })
  })
})
