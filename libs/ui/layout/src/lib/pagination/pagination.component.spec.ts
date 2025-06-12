import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { PaginationComponent } from './pagination.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { Paginable } from '../paginable.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class MockPaginable implements Paginable {
  currentPage = 1
  pagesCount = 5
  isFirstPage = true
  isLastPage = false
  goToPage = jest.fn()
  goToPrevPage = jest.fn()
  goToNextPage = jest.fn()
}

describe('PaginationComponent', () => {
  let component: PaginationComponent
  let fixture: ComponentFixture<PaginationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance
    component.listComponent = new MockPaginable()
    component.hideButton = false
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('next button', () => {
    let btn: ButtonComponent
    beforeEach(() => {
      btn = fixture.debugElement.queryAll(By.directive(ButtonComponent))[0]
        ?.componentInstance
    })
    it('is displayed by default', () => {
      expect(btn).toBeTruthy()
    })
    it('is hidden if hideButton = true', () => {
      component.hideButton = true
      fixture.detectChanges()
      expect(
        fixture.debugElement.queryAll(By.directive(ButtonComponent)).length
      ).toBe(2)
    })
    it('is disabled if last page', () => {
      component.listComponent.isLastPage = true
      fixture.detectChanges()
      expect(btn.disabled).toBe(true)
    })
    it('goes to next page', () => {
      btn.buttonClick.emit()
      expect(component.listComponent.goToNextPage).toHaveBeenCalled()
    })
  })

  describe('prev and next buttons', () => {
    let prevButton: ButtonComponent
    let nextButton: ButtonComponent
    beforeEach(() => {
      prevButton = fixture.debugElement.queryAll(
        By.directive(ButtonComponent)
      )[1].componentInstance
      nextButton = fixture.debugElement.queryAll(
        By.directive(ButtonComponent)
      )[2].componentInstance
    })
    it('prev button disabled if first page', () => {
      component.listComponent.isFirstPage = true
      fixture.detectChanges()
      expect(prevButton.disabled).toBe(true)
    })
    it('prev button enabled if not first page', () => {
      component.listComponent.isFirstPage = false
      fixture.detectChanges()
      expect(prevButton.disabled).toBe(false)
    })
    it('calls goToPrevPage', () => {
      prevButton.buttonClick.emit()
      expect(component.listComponent.goToPrevPage).toHaveBeenCalled()
    })
    it('next button disabled if last page', () => {
      component.listComponent.isLastPage = true
      fixture.detectChanges()
      expect(nextButton.disabled).toBe(true)
    })
    it('next button enabled if not last page', () => {
      component.listComponent.isLastPage = false
      fixture.detectChanges()
      expect(nextButton.disabled).toBe(false)
    })
    it('calls goToNextPage', () => {
      nextButton.buttonClick.emit()
      expect(component.listComponent.goToNextPage).toHaveBeenCalled()
    })
  })
})
