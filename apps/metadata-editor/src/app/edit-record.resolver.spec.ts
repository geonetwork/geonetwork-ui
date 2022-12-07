import { TestBed } from '@angular/core/testing'

import { EditRecordResolver } from './edit-record.resolver'

describe('EditRecordResolver', () => {
  let resolver: EditRecordResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    resolver = TestBed.inject(EditRecordResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
