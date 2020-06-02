import { TestBed } from '@angular/core/testing'

import { GnApiService } from './gn-api.service'

describe('GnApiService', () => {
  let service: GnApiService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(GnApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
