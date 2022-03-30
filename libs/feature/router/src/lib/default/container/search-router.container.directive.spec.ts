import { SearchRouterContainerDirective } from './search-router.container.directive'

const searchFacadeMock: any = {
  init: jest.fn(),
}

describe('SearchRouterContainerDirective', () => {
  let directive: SearchRouterContainerDirective
  beforeEach(() => {
    directive = new SearchRouterContainerDirective(searchFacadeMock)
    directive.searchId = 'main'
  })
  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('should create an instance', () => {
    directive.ngOnInit()
    expect(searchFacadeMock.init).toHaveBeenCalledWith('main')
  })
})
