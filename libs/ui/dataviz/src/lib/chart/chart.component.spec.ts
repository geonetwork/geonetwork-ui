import { ComponentFixture, TestBed } from '@angular/core/testing'
import { charItemFixture } from './chart.fixtures'
import { ChartComponent } from './chart.component'
import { Chart } from 'chart.js'
import { ChangeDetectionStrategy } from '@angular/core'

jest.mock('chart.js')
Chart.register = jest.fn()

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    })
      .overrideComponent(ChartComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    component.data = charItemFixture()
    component.labelProperty = 'name'
    component.valueProperty = 'age'
    component.prettyLabel = 'Age'
    component.type = 'bar'
    component.ngOnChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('before view is ready', () => {
    it('does not create a chart', () => {
      expect(Chart).not.toHaveBeenCalled()
    })
  })

  describe('when view is ready', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('should create chart', () => {
      expect(Chart).toHaveBeenCalledWith(expect.any(HTMLElement), {
        data: {
          datasets: [
            {
              data: [15, 10, 55],
              label: 'Age',
            },
          ],
          labels: ['name 1', 'name 2', 'name 3'],
        },
        options: {
          maintainAspectRatio: false,
          parsing: {},
          scales: {
            x: {
              ticks: {
                callback: expect.any(Function),
              },
            },
            y: {
              ticks: {
                callback: expect.any(Function),
              },
            },
          },
        },
        type: 'bar',
      })
    })

    describe('when data changes', () => {
      beforeEach(() => {
        component.data = charItemFixture().slice(0, 2)
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            data: {
              datasets: [
                {
                  data: [15, 10],
                  label: 'Age',
                },
              ],
              labels: ['name 1', 'name 2'],
            },
          })
        )
      })
    })

    describe('when axis values change', () => {
      beforeEach(() => {
        component.labelProperty = 'id'
        component.valueProperty = 'amount'
        component.prettyLabel = 'Amount'
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            data: {
              datasets: [
                {
                  data: [100, 101, 102],
                  label: 'Amount',
                },
              ],
              labels: ['id 1', 'id 2', 'id 3'],
            },
          })
        )
      })
    })

    describe('when chart type changes', () => {
      beforeEach(() => {
        component.type = 'pie'
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            type: 'pie',
          })
        )
      })
    })
  })

  describe('chart with secondary value', () => {
    beforeEach(() => {
      component.type = 'scatter'
      component.labelProperty = 'id'
      component.secondaryValueProperty = 'amount'
      fixture.detectChanges()
    })
    it('should create chart', () => {
      expect(Chart).toHaveBeenCalledWith(expect.any(HTMLElement), {
        data: {
          datasets: [
            {
              data: [
                {
                  x: 100,
                  y: 15,
                },
                {
                  x: 101,
                  y: 10,
                },
                {
                  x: 102,
                  y: 55,
                },
              ],
              label: 'Age',
            },
          ],
          labels: ['id 1', 'id 2', 'id 3'],
        },
        options: {
          maintainAspectRatio: false,
          parsing: {},
          scales: {
            x: {
              ticks: {
                callback: expect.any(Function),
              },
            },
            y: {
              ticks: {
                callback: expect.any(Function),
              },
            },
          },
        },
        type: 'scatter',
      })
    })
  })

  describe('chart types', () => {
    describe('scatter chart (no secondary value)', () => {
      beforeEach(() => {
        component.type = 'scatter'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            type: 'scatter',
          })
        )
      })
    })
    describe('line interpolated chart', () => {
      beforeEach(() => {
        component.type = 'line-interpolated'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            options: expect.objectContaining({
              elements: {
                line: {
                  cubicInterpolationMode: 'monotone',
                },
              },
            }),
            type: 'line',
          })
        )
      })
    })
    describe('horizontal bar chart', () => {
      beforeEach(() => {
        component.type = 'bar-horizontal'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            options: expect.objectContaining({
              indexAxis: 'y',
            }),
            type: 'bar',
          })
        )
      })
    })
  })
  describe('truncateString', () => {
    let result
    let input
    describe('length is less than or equal to truncateLength', () => {
      beforeEach(() => {
        const truncateLength = 13
        input = 'a short label'
        result = component.truncateString(input, truncateLength)
      })
      it('returns the original string', () => {
        expect(result).toEqual(input)
      })
    })
    describe('length is greater than truncateLength', () => {
      beforeEach(() => {
        const truncateLength = 13
        input = 'a little longer label'
        result = component.truncateString(input, truncateLength)
      })
      it('truncates the string', () => {
        expect(result).toEqual('a little long...')
      })
    })
    describe('input string is empty', () => {
      beforeEach(() => {
        const truncateLength = 5
        input = ''
        result = component.truncateString(input, truncateLength)
      })
      it('returns an empty string', () => {
        expect(result).toEqual('')
      })
    })
    describe('input string is null', () => {
      beforeEach(() => {
        const truncateLength = 5
        input = null
        result = component.truncateString(input, truncateLength)
      })
      it('returns an empty string', () => {
        expect(result).toEqual('')
      })
    })
  })
})
