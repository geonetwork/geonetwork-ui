import { SearchService } from './search.service'

describe('SearchService', () => {
  let service: SearchService

  beforeEach(() => {
    service = new SearchService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
