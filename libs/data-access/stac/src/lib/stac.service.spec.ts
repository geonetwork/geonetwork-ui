import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { StacService } from './stac.service'
import { StacItemCollection, StacQueryResponse } from './models/stac.model'

describe('StacService', () => {
  let service: StacService
  let httpMock: HttpTestingController

  const mockStacCollection: StacItemCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        stac_version: '1.0.0',
        id: 'item-1',
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
        properties: {
          datetime: '2024-01-01T00:00:00Z',
        },
        links: [],
        assets: {},
      },
      {
        type: 'Feature',
        stac_version: '1.0.0',
        id: 'item-2',
        geometry: {
          type: 'Point',
          coordinates: [1, 1],
        },
        properties: {
          datetime: '2024-01-02T00:00:00Z',
        },
        links: [],
        assets: {},
      },
    ],
    links: [
      {
        rel: 'self',
        href: 'https://api.stac.example.com/collections/test/items',
      },
      {
        rel: 'next',
        href: 'https://api.stac.example.com/collections/test/items?page=2',
      },
    ],
    context: {
      returned: 2,
      matched: 100,
      limit: 12,
    },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StacService],
    })
    service = TestBed.inject(StacService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('queryItems', () => {
    it('should query STAC items with default parameters', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'

      service.queryItems(url).subscribe((response: StacQueryResponse) => {
        expect(response.items.length).toBe(2)
        expect(response.items[0].id).toBe('item-1')
        expect(response.links.next).toBe(
          'https://api.stac.example.com/collections/test/items?page=2'
        )
        expect(response.totalMatched).toBe(100)
        expect(response.totalReturned).toBe(2)
        done()
      })

      const req = httpMock.expectOne(
        (request) =>
          request.url === url && request.params.get('limit') === '12'
      )
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should include bbox parameter when provided', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'
      const bbox: [number, number, number, number] = [-10, 40, 10, 50]

      service.queryItems(url, { bbox }).subscribe(() => {
        done()
      })

      const req = httpMock.expectOne(
        (request) =>
          request.url === url &&
          request.params.get('bbox') === bbox.join(',') &&
          request.params.get('limit') === '12'
      )
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should include datetime parameter when provided', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'
      const datetime = '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z'

      service.queryItems(url, { datetime }).subscribe(() => {
        done()
      })

      const req = httpMock.expectOne(
        (request) =>
          request.url === url &&
          request.params.get('datetime') === datetime &&
          request.params.get('limit') === '12'
      )
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should include custom limit when provided', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'
      const limit = 50

      service.queryItems(url, { limit }).subscribe(() => {
        done()
      })

      const req = httpMock.expectOne(
        (request) =>
          request.url === url && request.params.get('limit') === '50'
      )
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should include all parameters when provided', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'
      const bbox: [number, number, number, number] = [-10, 40, 10, 50]
      const datetime = '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z'
      const limit = 20

      service.queryItems(url, { bbox, datetime, limit }).subscribe(() => {
        done()
      })

      const req = httpMock.expectOne(
        (request) =>
          request.url === url &&
          request.params.get('bbox') === bbox.join(',') &&
          request.params.get('datetime') === datetime &&
          request.params.get('limit') === '20'
      )
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should handle errors appropriately', (done) => {
      const url = 'https://api.stac.example.com/collections/test/items'
      const errorMessage = 'Collection not found'

      service.queryItems(url).subscribe({
        next: () => fail('should have failed'),
        error: (error: Error) => {
          expect(error.message).toBe(errorMessage)
          done()
        },
      })

      const req = httpMock.expectOne(
        (request) => request.url === url && request.params.has('limit')
      )
      req.flush('Not found', { status: 404, statusText: 'Not Found' })
    })
  })

  describe('fetchNextPage', () => {
    it('should fetch next page using provided URL', (done) => {
      const nextUrl =
        'https://api.stac.example.com/collections/test/items?page=2'

      service.fetchNextPage(nextUrl).subscribe((response: StacQueryResponse) => {
        expect(response.items.length).toBe(2)
        done()
      })

      const req = httpMock.expectOne(nextUrl)
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should throw error when no URL is provided', (done) => {
      service.fetchNextPage('').subscribe({
        next: () => fail('should have failed'),
        error: (error: Error) => {
          expect(error.message).toBe('No next page URL provided')
          done()
        },
      })
    })
  })

  describe('fetchPreviousPage', () => {
    it('should fetch previous page using provided URL', (done) => {
      const prevUrl =
        'https://api.stac.example.com/collections/test/items?page=1'

      service
        .fetchPreviousPage(prevUrl)
        .subscribe((response: StacQueryResponse) => {
          expect(response.items.length).toBe(2)
          done()
        })

      const req = httpMock.expectOne(prevUrl)
      expect(req.request.method).toBe('GET')
      req.flush(mockStacCollection)
    })

    it('should throw error when no URL is provided', (done) => {
      service.fetchPreviousPage('').subscribe({
        next: () => fail('should have failed'),
        error: (error: Error) => {
          expect(error.message).toBe('No previous page URL provided')
          done()
        },
      })
    })
  })
})
