import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CarouselComponent } from './carousel.component'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { _triggerEvent } from 'embla-carousel'

jest.mock('embla-carousel', () => {
  let _callback = null
  return {
    default: () => ({
      scrollTo: jest.fn(function (step) {
        this._selected = step
        _callback()
      }),
      on(eventName, callback) {
        _callback = callback
        return this
      },
      scrollSnapList() {
        return [0, 0.5, 0.75, 1]
      },
      selectedScrollSnap() {
        return this._selected
      },
      _selected: 0,
    }),
    _triggerEvent() {
      _callback()
    },
    __esModule: true,
  }
})

@Component({
  template: `<gn-ui-carousel style="width: {{ width }}px">
    <div *ngFor="let block of blocks" style="width: 50px"></div>
  </gn-ui-carousel>`,
})
class CarouselWrapperComponent {
  @Input() blocks = [1, 2, 3]
  @Input() width = 100
}

describe('CarouselComponent', () => {
  let component: CarouselComponent
  let fixture: ComponentFixture<CarouselWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselWrapperComponent, CarouselComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(CarouselWrapperComponent)
    component = fixture.debugElement.query(
      By.directive(CarouselComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('steps computation', () => {
    beforeEach(() => {
      _triggerEvent()
    })
    it('computes steps initially', () => {
      expect(component.steps).toEqual([0, 0.5, 0.75, 1])
      expect(component.selectedStep).toEqual(0)
    })
    describe('click on step', () => {
      beforeEach(() => {
        component.scrollToStep(2)
      })
      it('calls #scrollTo', () => {
        expect(component.emblaApi.scrollTo).toHaveBeenCalledWith(2)
      })
      it('sets the clicked step as selected', () => {
        expect(component.selectedStep).toEqual(2)
      })
    })
  })
})
