import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PreviousNextButtonsComponent } from './previous-next-buttons.component'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
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

describe('PreviousNextButtonsComponent', () => {
  let component: PreviousNextButtonsComponent
  let fixture: ComponentFixture<PreviousNextButtonsComponent>
  let compiled: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousNextButtonsComponent)
    component = fixture.componentInstance
    component.listComponent = new MockPaginable()
    compiled = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onFirstElement', () => {
    beforeEach(() => {
      component.listComponent.isFirstPage = true
      component.listComponent.isLastPage = false
      fixture.detectChanges()
    })

    it('previous button should be disabled', () => {
      const previousButton = compiled.query(
        By.css('[data-test="previousButton"]')
      )
      expect(previousButton.attributes['ng-reflect-disabled']).toEqual('true')
    })

    it("next button shouldn't be disabled", () => {
      const nextButton = compiled.query(By.css('[data-test="nextButton"]'))
      expect(nextButton.attributes['ng-reflect-disabled']).toEqual('false')
    })
  })

  describe('onLastElement', () => {
    beforeEach(() => {
      component.listComponent.isFirstPage = false
      component.listComponent.isLastPage = true
      fixture.detectChanges()
    })

    it('previous button should be disabled', () => {
      const previousButton = compiled.query(
        By.css('[data-test="previousButton"]')
      )
      expect(previousButton.attributes['ng-reflect-disabled']).toEqual('false')
    })

    it("next button shouldn't be disabled", () => {
      const nextButton = compiled.query(By.css('[data-test="nextButton"]'))
      expect(nextButton.attributes['ng-reflect-disabled']).toEqual('true')
    })
  })
})
