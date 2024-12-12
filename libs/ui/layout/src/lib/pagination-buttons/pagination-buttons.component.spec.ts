import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PaginationButtonsComponent } from './pagination-buttons.component'
import { Paginable } from '../paginable.interface'

class MockPaginable implements Paginable {
  currentPage = 1
  pagesCount = 5
  isFirstPage = true
  isLastPage = false
  goToPage = jest.fn()
  goToPrevPage = jest.fn()
  goToNextPage = jest.fn()
}

describe('PaginationButtonsComponent', () => {
  let component: PaginationButtonsComponent
  let fixture: ComponentFixture<PaginationButtonsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationButtonsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PaginationButtonsComponent)
    component = fixture.componentInstance
    component.listComponent = new MockPaginable()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when using next arrow', () => {
    beforeEach(() => {
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (ngIcon && ngIcon.getAttribute('name') === 'iconoirNavArrowRight') {
          buttonElement.dispatchEvent(new Event('buttonClick'))
        }
      })
    })
    it('should access next page on click', () => {
      expect(component.listComponent.goToNextPage).toHaveBeenCalled()
    })
  })
  describe('when using previous arrow', () => {
    beforeEach(() => {
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (ngIcon && ngIcon.getAttribute('name') === 'iconoirNavArrowLeft') {
          buttonElement.dispatchEvent(new Event('buttonClick'))
        }
      })
    })
    it('should access previous page on click', () => {
      expect(component.listComponent.goToPrevPage).toHaveBeenCalled()
    })
  })
  describe('when accessing first page', () => {
    beforeEach(() => {
      component.listComponent.isFirstPage = true
      fixture.detectChanges()
    })
    it('is should disable the previous arrow', () => {
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (ngIcon && ngIcon.textContent.trim() === 'chevron_left') {
          const prevBtn = buttonElement.disabled
          expect(prevBtn).toBeTruthy()
        }
      })
    })
  })
  describe('when accessing last page', () => {
    beforeEach(() => {
      component.listComponent.isLastPage = true
      fixture.detectChanges()
    })
    it('is should disable the next arrow', () => {
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (ngIcon && ngIcon.textContent.trim() === 'chevron_right') {
          const nextBtn = buttonElement.disabled
          expect(nextBtn).toBeTruthy()
        }
      })
    })
  })
  describe('when clicking on page button', () => {
    beforeEach(() => {
      const paginationButton =
        fixture.nativeElement.querySelector('[data-test=page-2]')
      paginationButton.dispatchEvent(new Event('buttonClick'))
    })
    it('should access the requested page', () => {
      expect(component.listComponent.goToPage).toHaveBeenCalledWith(2)
    })
  })
})
