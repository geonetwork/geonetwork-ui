import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ViewportIntersectorComponent } from './viewport-intersector.component'

describe('ViewportIntersectorComponent', () => {
  let component: ViewportIntersectorComponent
  let fixture: ComponentFixture<ViewportIntersectorComponent>
  let intersectionObserverMock: any

  beforeAll(() => {
    intersectionObserverMock = jest.fn()
    intersectionObserverMock.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
    })
    window.IntersectionObserver = intersectionObserverMock
  })

  beforeEach(async () => {
    jest.clearAllMocks()

    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(ViewportIntersectorComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('observer', () => {
    describe('before component init', () => {
      it('does not create an intersection observer', () => {
        expect(window.IntersectionObserver).not.toHaveBeenCalled()
      })
    })
    describe('after component init', () => {
      beforeEach(() => {
        fixture.detectChanges()
      })
      it('creates an intersection observer', () => {
        expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
      })
      it('calls observe once', () => {
        expect(component.observer?.observe).toHaveBeenCalledTimes(1)
      })
    })
    describe('after component destroy', () => {
      beforeEach(() => {
        fixture.detectChanges()
        fixture.destroy()
      })
      it('calls unobserve once', () => {
        expect(component.observer?.unobserve).toHaveBeenCalledTimes(1)
      })
    })
  })
})
