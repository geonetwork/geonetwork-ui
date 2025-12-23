import { TestBed } from '@angular/core/testing'
import { SearchStateContainerDirective } from './search-state.container.directive.js'
import { SearchFacade } from '../search.facade.js'

const searchFacadeMock = {
  init: jest.fn(),
}

describe('SearchStateContainerDirective', () => {
  let directive: SearchStateContainerDirective

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchStateContainerDirective,
        { provide: SearchFacade, useValue: searchFacadeMock },
      ],
    })
    directive = TestBed.inject(SearchStateContainerDirective)
    directive.searchId = 'main'
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('should call main search on init', () => {
    directive.ngOnInit()
    expect(searchFacadeMock.init).toHaveBeenCalledWith('main')
  })
})
