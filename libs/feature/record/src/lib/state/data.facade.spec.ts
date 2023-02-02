import { TestBed } from '@angular/core/testing'

import { DataFacade } from './data.facade'

describe('DataFacade', () => {
  let service: DataFacade

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DataFacade)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
