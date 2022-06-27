import { TestBed } from '@angular/core/testing'

import { DatahubRouterService } from './datahub-router.service'

describe('DatahubRouterInitServiceService', () => {
  let service: DatahubRouterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DatahubRouterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
