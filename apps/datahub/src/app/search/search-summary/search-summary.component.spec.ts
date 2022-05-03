import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BehaviorSubject } from 'rxjs'

import { SearchSummaryComponent } from './search-summary.component'

const state = { Org: { mel: true } }
const searchFacadeMock: any = {
  searchFilters$: new BehaviorSubject(state),
}
const searchServiceMock: any = {
  updateSearch: jest.fn(),
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
        {
          provide: SearchService,
          useValue: searchServiceMock,
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
      const divOrg = fixture.debugElement.query(By.css('.publisher'))
      expect(divOrg).toBeTruthy()
      expect(divOrg.nativeElement.innerHTML).toEqual('mel')
    })
  })

  describe('when user click on the close button', () => {
    beforeEach(() => {
      const closeBtn = fixture.debugElement.query(By.css('.close'))
      closeBtn.nativeElement.click()
    })
    it('removes the Org', () => {
      expect(searchServiceMock.updateSearch).toHaveBeenCalledWith({ Org: {} })
    })
  })

  describe('when no source', () => {
    beforeEach(() => {
      searchFacadeMock.searchFilters$.next({})
      fixture.detectChanges()
    })
    it('hides whole source block', () => {
      const divOrg = fixture.debugElement.query(By.css('.publisher'))
      expect(divOrg).toBeFalsy()
    })
  })
})
