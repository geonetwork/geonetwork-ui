import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BlockListComponent } from './resource-wrapper.component'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  template: `<gn-ui-resource-wrapper>
    <div
      class="block"
      *ngFor="let block of blocks"
      #block
      style="width: 50px; height: 20px"
    ></div>
  </gn-ui-resource-wrapper>`,
})
class BlockListWrapperComponent {
  @Input() blocks = [1, 2, 3, 4, 5, 6, 7]
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

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('pages computation', () => {
    it('shows 5 items per page initially', () => {
      const blocksVisibility = blockEls.map((el) => el.style.display !== 'none')
      expect(blocksVisibility).toEqual([
        true,
        true,
        true,
        true,
        true,
        false,
        false,
      ])
    })
    describe('click on step', () => {
      beforeEach(() => {
        component.goToPage(2)
      })
      it('updates visibility', () => {
        const blocksVisibility = blockEls.map(
          (el) => el.style.display !== 'none'
        )
        expect(blocksVisibility).toEqual([
          false,
          false,
          false,
          false,
          false,
          true,
          true,
        ])
      })
      it('emits the selected page', () => {
        expect(component['currentPage']).toEqual(2)
      })
    })
    describe('custom page size', () => {
      beforeEach(() => {
        component.pageSize = 3
        component.goToPage(3)
        fixture.detectChanges()
      })
      it('updates visibility', () => {
        const blocksVisibility = blockEls.map(
          (el) => el.style.display !== 'none'
        )
        expect(blocksVisibility).toEqual([
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ])
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
    beforeEach(() => {
      component.pageSize = 3
    })
    it('returns true if the current page is the first one', () => {
      expect(component.isFirstPage).toBe(true)
    })
    it('returns false if the current page is not the first one', () => {
      component.goToPage(2)
      expect(component.isFirstPage).toBe(false)
    })
  })

  describe('isLastPage', () => {
    beforeEach(() => {
      component.pageSize = 3
    })
    it('returns true if the current page is the last one', () => {
      component.goToPage(3)
      expect(component.isLastPage).toBe(true)
    })
    it('returns false if the current page is not the last one', () => {
      component.goToPage(2)
      expect(component.isLastPage).toBe(false)
    })
  })

  describe('set initial height as min height, keeps value when height changes', () => {
    beforeEach(() => {
      Object.defineProperties(
        component.resourceWrapperContainer.nativeElement,
        {
          clientHeight: {
            configurable: true,
            value: 150,
          },
        }
      )
      fixture.detectChanges()
      component.ngAfterViewInit()
      Object.defineProperties(
        component.resourceWrapperContainer.nativeElement,
        {
          clientHeight: {
            value: 50,
          },
        }
      )
      fixture.detectChanges()
    })
    it('sets the min height of the container according to its initial content', () => {
      expect(
        component.resourceWrapperContainer.nativeElement.style.minHeight
      ).toBe('150px')
    })
  })
})
