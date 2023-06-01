import { TestBed } from '@angular/core/testing'
import { LocationSearchService } from './location-search.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

const RESULT_FIXTURE = [
  {
    attrs: {
      detail: 'zurigo zh',
      featureId: '261',
      geom_quadindex: '030003',
      geom_st_box2d:
        'BOX(2676224.6939999983 1241584.1049999967,2689665.813000001 1254306.2330000028)',
      label: '<b>Zurigo (ZH)</b>',
      lat: 47.37721252441406,
      lon: 8.527311325073242,
      num: 1,
      objectclass: '',
      origin: 'gg25',
      rank: 2,
      x: 1247945.25,
      y: 2682217,
      zoomlevel: 4294967295,
    },
    id: 153,
    weight: 7,
  },
  {
    attrs: {
      detail: 'zurich zh',
      featureId: '261',
      geom_quadindex: '030003',
      geom_st_box2d:
        'BOX(2676224.6939999983 1241584.1049999967,2689665.813000001 1254306.2330000028)',
      label: '<b>Zurich (ZH)</b>',
      lat: 47.37721252441406,
      lon: 8.527311325073242,
      num: 1,
      objectclass: '',
      origin: 'gg25',
      rank: 2,
      x: 1247945.25,
      y: 2682217,
      zoomlevel: 4294967295,
    },
    id: 154,
    weight: 7,
  },
]
describe('LocationSearchService', () => {
  let service: LocationSearchService
  let httpController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents()

    service = TestBed.inject(LocationSearchService)

    httpController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpController.verify()
  })

  it('should create', () => {
    expect(service).toBeTruthy()
  })

  describe('request successful', () => {
    it('should send a request to geo admin api with query', (done) => {
      const customQuery = 'simple query'
      service.getLocationSearch(customQuery).subscribe((data) => {
        expect(data).toStrictEqual(RESULT_FIXTURE)
        done()
      })

      httpController
        .match((request) => {
          return (
            request.url.startsWith(
              'https://api3.geo.admin.ch/rest/services/api/SearchServer'
            ) && request.url.includes('simple+query')
          )
        })[0]
        .flush({ results: RESULT_FIXTURE })
    })
  })

  describe('request fails', () => {
    it('should send a request to geo admin api with query', (done) => {
      const customQuery = 'simple query'
      service.getLocationSearch(customQuery).subscribe((data) => {
        expect(data).toStrictEqual([])
        done()
      })

      httpController
        .match((request) => {
          return (
            request.url.startsWith(
              'https://api3.geo.admin.ch/rest/services/api/SearchServer'
            ) && request.url.includes('simple+query')
          )
        })[0]
        .flush('error!!!', { status: 404, statusText: 'Not found' })
    })
  })
})
