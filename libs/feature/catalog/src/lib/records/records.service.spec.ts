import { TestBed } from '@angular/core/testing'
import { RecordsService } from './records.service'
import { aggsOnly } from '@geonetwork-ui/util-shared/fixtures'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

describe('RecordsService', () => {
  let service: RecordsService
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(RecordsService)
    httpController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('recordsCount$', () => {
    describe('when the request works as expected', () => {
      it('emits the total amount of records', () => {
        let count
        service.recordsCount$.subscribe((v) => (count = v))
        httpController
          .match((req) => /_search/.test(req.url))[0]
          .flush(aggsOnly)
        expect(count).toBe(6073)
      })
      it('does not call the api several times', () => {
        service.recordsCount$.subscribe()
        service.recordsCount$.subscribe()
        service.recordsCount$.subscribe()
        const reqCount = httpController.match((req) =>
          /_search/.test(req.url)
        ).length
        expect(reqCount).toBe(1)
      })
    })

    describe('when the request does not behave as expected', () => {
      it('emits 0', () => {
        let count
        service.recordsCount$.subscribe((v) => (count = v))
        httpController
          .match((req) => /_search/.test(req.url))[0]
          .error(new ProgressEvent('blargz'))
        expect(count).toBe(0)
      })
    })
  })
})
