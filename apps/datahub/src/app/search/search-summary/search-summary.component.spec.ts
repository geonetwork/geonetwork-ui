import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { BehaviorSubject } from 'rxjs'

import { SearchSummaryComponent } from './search-summary.component'

const state = { Org: { mel: true } }
const searchFacadeMock: any = {
  searchFilters$: new BehaviorSubject(state),
}
describe('SearchSummaryComponent', () => {
  let component: SearchSummaryComponent
  let fixture: ComponentFixture<SearchSummaryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSummaryComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
    })
      .overrideComponent(SearchSummaryComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when source', () => {
    it('displays source', () => {
      const divs = fixture.debugElement.queryAll(By.css('div'))
      const divSource = divs[1]
      expect(divSource).toBeTruthy()
      expect(divSource.children[1].nativeElement.innerHTML).toEqual('mel')
    })
  })
  describe('when no source', () => {
    beforeEach(() => {
      searchFacadeMock.searchFilters$.next({})
      fixture.detectChanges()
    })
    it('hides whole source block', () => {
      const divs = fixture.debugElement.queryAll(By.css('div'))
      const divSource = divs[1]
      expect(divSource).toBeFalsy()
    })
  })
})
