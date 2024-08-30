import { TestBed } from '@angular/core/testing'
import {
  someFigureItemFixture,
  someHabFigureItemFixture,
} from './figure.fixtures'

import { FigureService } from './figure.service'

describe('FigureServiceService', () => {
  let service: FigureService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FigureService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#operations', () => {
    const data = [10, 50, 100, 0]

    it('sum', () => {
      expect(service['operations']['sum'](data)).toBe(160)
    })
    it('average', () => {
      expect(service['operations']['average'](data)).toBe(40)
    })
  })

  describe('#compute', () => {
    let expression
    let dataset
    let figure

    describe('average', () => {
      beforeEach(() => {
        dataset = someFigureItemFixture()
        expression = 'average|age'
        figure = service.compute(expression, dataset)
      })

      it('returns the correct average', () => {
        expect(figure).toEqual(26.666666666666668)
      })
    })
    describe('sum', () => {
      beforeEach(() => {
        dataset = someHabFigureItemFixture()
        expression = 'sum|pop'
        figure = service.compute(expression, dataset)
      })

      it('returns the correct sum', () => {
        expect(figure).toEqual(159176260999)
      })
    })
    describe('error', () => {
      beforeEach(() => {
        dataset = someFigureItemFixture()
        expression = 'avera---age'
        figure = service.compute(expression, dataset)
      })
      it('returns Nan', () => {
        expect(figure).toBeNaN()
      })
    })
  })
})
