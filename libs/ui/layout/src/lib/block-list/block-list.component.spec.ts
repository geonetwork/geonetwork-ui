import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BlockListComponent } from './block-list.component'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  template: `<gn-ui-block-list>
    <div
      class="block"
      *ngFor="let block of blocks"
      #block
      style="width: 50px; height: 20px"
    ></div>
  </gn-ui-block-list>`,
})
class BlockListWrapperComponent {
  @Input() blocks = Array.from({ length: 24 }, (_, i) => i + 1)
}

describe('BlockListComponent', () => {
  let component: BlockListComponent
  let fixture: ComponentFixture<BlockListWrapperComponent>
  let blockEls: HTMLElement[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockListWrapperComponent],
      imports: [BlockListComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(BlockListWrapperComponent)
    component = fixture.debugElement.query(
      By.directive(BlockListComponent)
    ).componentInstance
    fixture.detectChanges()
    blockEls = fixture.debugElement
      .queryAll(By.css('.block'))
      .map((el) => el.nativeElement)
  })
  function initializeBlocks(length: number) {
    fixture.componentInstance.blocks = Array.from({ length }, (_, i) => i + 1)
    fixture.detectChanges()
  }

  function getVisibleBlocks(count: number) {
    return blockEls.slice(0, count).map((el) => el.style.display !== 'none')
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('pages computation', () => {
    interface PaginationTestCase {
      elements: number
      pageSize: number
      pages: number
    }

    const paginationCases: PaginationTestCase[] = [
      { elements: 1, pageSize: 3, pages: 1 },
      { elements: 3, pageSize: 3, pages: 1 },
      { elements: 4, pageSize: 4, pages: 1 },
      { elements: 12, pageSize: 4, pages: 3 },
      { elements: 13, pageSize: 6, pages: 3 },
      { elements: 18, pageSize: 6, pages: 3 },
      { elements: 19, pageSize: 8, pages: 3 },
      { elements: 24, pageSize: 8, pages: 3 },
      { elements: 80, pageSize: 8, pages: 10 },
    ]

    describe('pagination behavior', () => {
      paginationCases.forEach(({ elements, pageSize, pages }) => {
        it(`with ${elements} elements: shows ${pages} pages of ${pageSize} elements`, () => {
          initializeBlocks(elements)
          expect(component.pageSize).toBe(pageSize)
          expect(component.pagesCount).toBe(pages)
        })
      })
    })

    describe('previousPage', () => {
      beforeEach(() => {
        component.pageSize = 2
        component.goToPage(2)
        component.goToPrevPage()
      })
      it('changes to previous page', () => {
        expect(component['currentPage']).toEqual(1)
      })
    })

    describe('nextPage', () => {
      beforeEach(() => {
        component.pageSize = 2
        component.goToPage(1)
        component.goToNextPage()
      })
      it('changes to next page', () => {
        expect(component['currentPage']).toEqual(2)
      })
    })

    describe('isFirstPage', () => {
      it('returns true if the current page is the first one', () => {
        expect(component.isFirstPage).toBe(true)
      })
      it('returns false if the current page is not the first one', () => {
        component.goToPage(2)
        expect(component.isFirstPage).toBe(false)
      })
    })

    describe('isLastPage', () => {
      it('returns true if the current page is the last one', () => {
        component.goToPage(component.pagesCount)
        expect(component.isLastPage).toBe(true)
      })
      it('returns false if the current page is not the last one', () => {
        component.goToPage(2)
        expect(component.isLastPage).toBe(false)
      })
    })
  })
})
