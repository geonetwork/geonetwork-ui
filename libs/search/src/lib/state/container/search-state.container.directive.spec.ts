import { SearchStateContainerDirective } from './search-state.container.directive'

const searchFacadeMock: any = {
  init: jest.fn(),
}

describe('SearchStateContainerDirective', () => {
  let directive: SearchStateContainerDirective
  beforeEach(() => {
    directive = new SearchStateContainerDirective(searchFacadeMock)
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
