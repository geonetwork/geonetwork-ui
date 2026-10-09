import { TestBed } from '@angular/core/testing'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { MockProvider } from 'ng-mocks'
import { MAX_FEATURE_COUNT, MdViewService } from './mdview.service'
import { MdViewFacade } from '../state'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model'

describe('MdViewService', () => {
  let service: MdViewService
  let facade: jest.Mocked<MdViewFacade>
  let dataService: jest.Mocked<DataService>
  let selectedLink$: Subject<DatasetOnlineResource>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MdViewService,
        MockProvider(MdViewFacade, {
          geoDataLinksWithGeometry$: new BehaviorSubject([]),
        }),
        MockProvider(DataService, {
          getWfsFeatureCount: jest.fn(),
        }),
        {
          provide: MAX_FEATURE_COUNT,
          useValue: 100,
        },
      ],
    })

    service = TestBed.inject(MdViewService)
    facade = TestBed.inject(MdViewFacade) as jest.Mocked<MdViewFacade>
    dataService = TestBed.inject(DataService) as jest.Mocked<DataService>
    selectedLink$ = new Subject<DatasetOnlineResource>()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('exceedsMaxFeatureCount$', () => {
    it('should return false when no WFS link is present', (done) => {
      facade.geoDataLinksWithGeometry$.next([])

      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        expect(result).toBe(false)
        done()
      })

      selectedLink$.next(null)
    })

    it('should return false when WFS link feature count is less than maxFeatureCount', (done) => {
      const link = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'test',
      } as DatasetOnlineResource

      dataService.getWfsFeatureCount.mockReturnValue(of(50))

      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        expect(result).toBe(false)
        expect(dataService.getWfsFeatureCount).toHaveBeenCalledWith(
          'http://example.com/',
          'test'
        )
        done()
      })

      facade.geoDataLinksWithGeometry$.next([link])
      selectedLink$.next(link)
    })

    it('should return true when WFS link feature count exceeds maxFeatureCount', (done) => {
      const link = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'test',
      } as DatasetOnlineResource

      dataService.getWfsFeatureCount.mockReturnValue(of(150))

      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        expect(result).toBe(true)
        done()
      })

      facade.geoDataLinksWithGeometry$.next([link])
      selectedLink$.next(link)
    })

    it('should return true when switching between non-exceeding and exceeding maxFeatureCount links', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'test',
      } as DatasetOnlineResource
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'switch test',
      } as DatasetOnlineResource

      dataService.getWfsFeatureCount.mockImplementation((_, name) => {
        return name === 'switch test' ? of(150) : of(50)
      })

      let emittedCount = 0
      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        emittedCount++
        if (emittedCount === 2) {
          expect(result).toBe(true)
          done()
        }
      })

      facade.geoDataLinksWithGeometry$.next([firstLink])
      selectedLink$.next(firstLink)

      facade.geoDataLinksWithGeometry$.next([secondLink])
      selectedLink$.next(secondLink)
    })

    it('should return false when switching between exceeding and non-exceeding maxFeatureCount links', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'test',
      } as DatasetOnlineResource
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'switch test',
      } as DatasetOnlineResource

      dataService.getWfsFeatureCount.mockImplementation((_, name) => {
        return name === 'switch test' ? of(50) : of(150)
      })

      let emittedCount = 0
      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        emittedCount++
        if (emittedCount === 2) {
          expect(result).toBe(false)
          done()
        }
      })

      facade.geoDataLinksWithGeometry$.next([firstLink])
      selectedLink$.next(firstLink)

      facade.geoDataLinksWithGeometry$.next([secondLink])
      selectedLink$.next(secondLink)
    })

    it('should return true when switching from a non-WFS link to a WFS link exceeding maxFeatureCount', (done) => {
      const firstLink = {
        accessServiceProtocol: 'wms',
        url: new URL('http://example.com'),
        name: 'test',
      } as DatasetOnlineResource
      const secondLink = {
        accessServiceProtocol: 'wfs',
        url: new URL('http://example.com'),
        name: 'switch test',
      } as DatasetOnlineResource

      dataService.getWfsFeatureCount.mockReturnValue(of(150))

      let emittedCount = 0
      service.exceedsMaxFeatureCount$(selectedLink$).subscribe((result) => {
        emittedCount++
        if (emittedCount === 2) {
          expect(result).toBe(true)
          done()
        }
      })

      facade.geoDataLinksWithGeometry$.next([firstLink])
      selectedLink$.next(firstLink)

      facade.geoDataLinksWithGeometry$.next([secondLink])
      selectedLink$.next(secondLink)
    })
  })
})
