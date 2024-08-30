import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { PageSelectorComponent } from './page-selector.component'
import { editorConfigFixture } from '@geonetwork-ui/common/fixtures'
import { BehaviorSubject } from 'rxjs'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { By } from '@angular/platform-browser'

class EditorFacadeMock {
  editorConfig$ = new BehaviorSubject(editorConfigFixture())
  currentPage$ = new BehaviorSubject(0)
  setCurrentPage = jest.fn()
}

describe('PageSelectorComponent', () => {
  let component: PageSelectorComponent
  let fixture: ComponentFixture<PageSelectorComponent>
  let facade: EditorFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), PageSelectorComponent],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(PageSelectorComponent)
    component = fixture.componentInstance
    facade = TestBed.inject(EditorFacade) as unknown as EditorFacadeMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the correct number of pages', () => {
    const pages = fixture.debugElement.queryAll(By.css('.w-10.h-10'))
    expect(pages.length).toBe(editorConfigFixture().pages.length)
  })

  it('should highlight the current page', () => {
    const currentPageIndex = facade.currentPage$.getValue()
    const currentPageElement = fixture.debugElement.queryAll(
      By.css('.w-10.h-10')
    )[currentPageIndex]
    expect(currentPageElement.nativeElement.classList).toContain('bg-primary')
  })

  it('should call pageSectionClickHandler with the correct index', () => {
    jest.spyOn(component, 'pageSectionClickHandler')
    const button = fixture.debugElement.queryAll(By.css('gn-ui-button'))[1]
    button.triggerEventHandler('buttonClick', null)
    fixture.detectChanges()
    expect(component.pageSectionClickHandler).toHaveBeenCalledWith(1)
  })

  it('should call facade.setCurrentPage with the correct index', () => {
    const index = 1
    component.pageSectionClickHandler(index)
    expect(facade.setCurrentPage).toHaveBeenCalledWith(index)
  })
})
