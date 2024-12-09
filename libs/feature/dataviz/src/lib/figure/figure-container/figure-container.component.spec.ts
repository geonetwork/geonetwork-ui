import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  someFigureItemFixture,
  someHabFigureItemFixture,
} from '../figure.fixtures'
import { FigureContainerComponent } from './figure-container.component'
import { MockBuilder } from 'ng-mocks'
import { FigureService } from '../figure.service'

describe('FigureContainerComponent', () => {
  let component: FigureContainerComponent
  let fixture: ComponentFixture<FigureContainerComponent>

  beforeEach(() => MockBuilder(FigureContainerComponent).keep(FigureService))

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('when average', () => {
    beforeEach(() => {
      component.dataset = someFigureItemFixture()
      component.expression = 'average|age'
      component.ngOnChanges()
    })
    it('computes the average', () => {
      expect(component.figure).toEqual('26.67')
    })
    it('with correct digits', () => {
      component.digits = 3
      component.ngOnChanges()
      expect(component.figure).toEqual('26.667')
    })
  })
  describe('when sum', () => {
    beforeEach(() => {
      component.dataset = someHabFigureItemFixture()
      component.expression = 'sum|pop'
      component.ngOnChanges()
    })
    it('computes the sum', () => {
      expect(component.figure).toEqual('159176260999')
    })
  })
  describe('when bad expression', () => {
    beforeEach(() => {
      component.dataset = someHabFigureItemFixture()
      component.expression = 'sumfds--fdfdspop'
      component.ngOnChanges()
    })
    it('returns Nan', () => {
      expect(component.figure).toEqual('NaN')
    })
  })
})
