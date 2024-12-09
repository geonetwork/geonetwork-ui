import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PaginationDotsComponent } from './pagination-dots.component'
import { By } from '@angular/platform-browser'
import { Paginable } from '../paginable.interface'

class MockPaginable implements Paginable {
  currentPage = 4
  pagesCount = 5
  isFirstPage = false
  isLastPage = false
  goToPage = jest.fn()
  goToPrevPage = jest.fn()
  goToNextPage = jest.fn()
}

describe('PaginationDotsComponent', () => {
  let component: PaginationDotsComponent
  let fixture: ComponentFixture<PaginationDotsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationDotsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PaginationDotsComponent)
    component = fixture.componentInstance
    component.listComponent = new MockPaginable()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('dots', () => {
    let dots: HTMLElement[]
    beforeEach(() => {
      dots = fixture.debugElement
        .queryAll(By.css('.pagination-dot'))
        .map((dot) => dot.nativeElement)
    })
    it('has 1 dot per page', () => {
      expect(dots.length).toBe(component.listComponent.pagesCount)
    })
    it('switches to a page on click', () => {
      dots[2].click()
      expect(component.listComponent.goToPage).toHaveBeenCalledWith(3) // page index is 1-based
    })
    it('shows selected page as active', () => {
      expect(dots[2].classList).not.toContain('bg-primary')
      expect(dots[3].classList).toContain('bg-primary')
      expect(dots[4].classList).not.toContain('bg-primary')
    })
  })
})
