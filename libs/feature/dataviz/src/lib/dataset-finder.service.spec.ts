import { TestBed } from '@angular/core/testing'

import { DatasetFinderService } from './dataset-finder.service'

describe('DatasetFinderService', () => {
  let service: DatasetFinderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DatasetFinderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
