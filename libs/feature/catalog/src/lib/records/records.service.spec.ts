import { TestBed } from '@angular/core/testing'
import { RecordsService } from './records.service'
import { SAMPLE_SEARCH_RESULTS } from '@geonetwork-ui/common/fixtures'
import { of, throwError } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

class RecordsRepositoryMock {
  search = jest.fn(() => of(SAMPLE_SEARCH_RESULTS))
}

describe('RecordsService', () => {
  let service: RecordsService
  let repository: RecordsRepositoryInterface

  beforeEach(() => {
    repository = new RecordsRepositoryMock() as any
    service = new RecordsService(repository)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('recordsCount$', () => {
    describe('when the request works as expected', () => {
      it('emits the total amount of records', () => {
        let count
        service.recordsCount$.subscribe((v) => (count = v))
        expect(count).toBe(123)
      })
      it('does not call the api several times', () => {
        service.recordsCount$.subscribe()
        service.recordsCount$.subscribe()
        service.recordsCount$.subscribe()
        expect(repository.search).toHaveBeenCalledTimes(1)
      })
    })

    describe('when the request does not behave as expected', () => {
      beforeEach(() => {
        repository.search = () => throwError(() => 'blargz')
        service = new RecordsService(repository) // create a new service to enable the changed repository behaviour
      })
      it('emits 0', () => {
        let count
        service.recordsCount$.subscribe((v) => (count = v))
        expect(count).toBe(0)
      })
    })
  })
})
