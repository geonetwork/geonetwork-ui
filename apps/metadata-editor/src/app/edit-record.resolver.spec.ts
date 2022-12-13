import { TestBed } from '@angular/core/testing'
import { EditRecordResolver } from './edit-record.resolver'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('EditRecordResolver', () => {
  let resolver: EditRecordResolver

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    resolver = TestBed.inject(EditRecordResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
