import { RecordsService } from './records.service'
import { of } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'

class RecordsRepositoryMock {
  getMatchesCount = jest.fn(() => of(123))
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
        service.getRecordsCount().subscribe((v) => (count = v))
        expect(count).toBe(123)
      })
      it('calls the api with filters', (done) => {
        const configFilters: FieldFilters = {
          resourceType: {
            service: false,
            map: false,
            'map/static': false,
            mapDigital: false,
          },
        }
        service.getRecordsCount(configFilters).subscribe((result) => {
          expect(result).toBe(123)
          expect(repository.getMatchesCount).toHaveBeenCalledWith(configFilters)
          done()
        })
      })
    })
  })
})
