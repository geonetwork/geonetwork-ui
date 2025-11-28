import { TestBed } from '@angular/core/testing'
import { SearchRouterContainerDirective } from './search-router.container.directive'
import { SearchFacade } from '@geonetwork-ui/feature/search'

const searchFacadeMock = {
  init: jest.fn(),
}

describe('SearchRouterContainerDirective', () => {
  let directive: SearchRouterContainerDirective

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchRouterContainerDirective,
        { provide: SearchFacade, useValue: searchFacadeMock },
      ],
    })
    directive = TestBed.inject(SearchRouterContainerDirective)
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
