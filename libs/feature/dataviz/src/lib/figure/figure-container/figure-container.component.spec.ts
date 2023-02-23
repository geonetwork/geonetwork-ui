import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FIGURE_ITEM_FIXTURE,
  FIGURE_ITEM_FIXTURE_HAB,
} from './../figure.fixtures'
import { FigureContainerComponent } from './figure-container.component'

describe('FigureContainerComponent', () => {
  let component: FigureContainerComponent
  let fixture: ComponentFixture<FigureContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigureContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FigureContainerComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

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
      component.dataset = FIGURE_ITEM_FIXTURE
      component.expression = 'average|age'
      component.ngOnChanges(null)
    })
    it('computes the average', () => {
      expect(component.figure).toEqual('26.67')
    })
    it('with correct digits', () => {
      component.digits = 3
      component.ngOnChanges(null)
      expect(component.figure).toEqual('26.667')
    })
  })
  describe('when sum', () => {
    beforeEach(() => {
      component.dataset = FIGURE_ITEM_FIXTURE_HAB
      component.expression = 'sum|pop'
      component.ngOnChanges(null)
    })
    it('computes the sum', () => {
      expect(component.figure).toEqual('159176260999')
    })
  })
  describe('when bad expression', () => {
    beforeEach(() => {
      component.dataset = FIGURE_ITEM_FIXTURE_HAB
      component.expression = 'sumfds--fdfdspop'
      component.ngOnChanges(null)
    })
    it('returns Nan', () => {
      expect(component.figure).toEqual('NaN')
    })
  })
})
