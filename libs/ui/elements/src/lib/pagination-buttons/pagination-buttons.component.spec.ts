import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PaginationButtonsComponent } from './pagination-buttons.component'

describe('PaginationButtonsComponent', () => {
  let component: PaginationButtonsComponent
  let fixture: ComponentFixture<PaginationButtonsComponent>

  const mockChangePage = (page) => {
    component.setPage(page)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationButtonsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PaginationButtonsComponent)
    component = fixture.componentInstance
    component.currentPage = 3
    component.totalPages = 10
    component.calculateVisiblePages()
    component.changePage = mockChangePage
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('when using next arrow', () => {
    beforeEach(() => {
      component.currentPage = 2
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
      expect(component.currentPage).toBe(3)
    })
  })
  describe('when using previous arrow', () => {
    beforeEach(() => {
      component.currentPage = 4
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (ngIcon && ngIcon.getAttribute('name') === 'iconoirNavArrowLeft') {
          buttonElement.dispatchEvent(new Event('buttonClick'))
        }
      })
    })
    it('is should access previous page', () => {
      expect(component.currentPage).toBe(3)
    })
  })
  describe('when accessing first page', () => {
    beforeEach(() => {
      component.currentPage = 1
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
      component.currentPage = 10
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
      const paginationButtons =
        fixture.nativeElement.querySelectorAll('gn-ui-button')
      const pageBtnList = []
      paginationButtons.forEach((buttonElement) => {
        const ngIcon = buttonElement.querySelector('ng-icon')
        if (!ngIcon) {
          pageBtnList.push(buttonElement)
        }
      })
      pageBtnList[1].dispatchEvent(new Event('buttonClick'))
    })
    it('is should access the requested page', () => {
      expect(component.currentPage).toBe(2)
    })
  })
})
