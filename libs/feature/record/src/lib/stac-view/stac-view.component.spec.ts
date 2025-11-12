import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StacViewComponent } from './stac-view.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  DatasetTemporalExtent,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { of } from 'rxjs'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { MdViewFacade } from '../state'
import { TranslateService } from '@ngx-translate/core'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { MockBuilder, MockProvider, ngMocks } from 'ng-mocks'

describe('StacViewComponent', () => {
  let component: StacViewComponent
  let fixture: ComponentFixture<StacViewComponent>

  const mockTemporalExtent: DatasetTemporalExtent = {
    start: new Date('2020-01-01T00:00:00Z'),
    end: new Date('2023-12-31T23:59:59Z'),
  }

  const mockDatasetRecord: DatasetRecord = {
    kind: 'dataset',
    temporalExtents: [mockTemporalExtent],
  } as DatasetRecord

  const mockStacDocument = {
    features: [
      {
        id: 'item1',
        properties: { datetime: '2023-01-01T00:00:00Z' },
      },
      {
        id: 'item2',
        properties: { datetime: '2023-01-02T00:00:00Z' },
      },
    ],
    links: [
      { rel: 'previous', href: 'http://example.com/page1' },
      { rel: 'next', href: 'http://example.com/page3' },
    ],
  }

  const mockStacLink = {
    url: { href: 'http://example.com/stac' },
    name: 'STAC API',
    description: 'Mock STAC API link',
    type: 'stac-api',
    accessServiceProtocol: 'http',
  } as any

  beforeEach(() => MockBuilder(StacViewComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(DataService, {
          getItemsFromStacApi: jest
            .fn()
            .mockReturnValue(Promise.resolve(mockStacDocument)),
        }),
        MockProvider(MdViewFacade, {
          metadata$: of(mockDatasetRecord),
          stacLinks$: of([mockStacLink]),
        }),
        MockProvider(TranslateService, {
          instant: jest
            .fn()
            .mockImplementation((key, params) => `translated:${key}`),
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(StacViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should initialize temporal extent from metadata', () => {
      component.ngOnInit()
      expect(component.initialTemporalExtent).toEqual(mockTemporalExtent)
      expect(component.currentTemporalExtent$.value).toEqual(mockTemporalExtent)
    })

    it('should initialize with default temporal extent when no temporal extents exist', () => {
      const recordWithoutExtents = { ...mockDatasetRecord, temporalExtents: [] }
      const facade = ngMocks.findInstance(MdViewFacade)
      facade.metadata$ = of(recordWithoutExtents)
      component.ngOnInit()
      expect(component.initialTemporalExtent).toEqual({
        start: null,
        end: null,
      })
      expect(component.currentTemporalExtent$.value).toEqual({
        start: null,
        end: null,
      })
    })

    it('should set current page URL from STAC links', () => {
      component.ngOnInit()
      expect(component.currentPageUrl$.value).toBe('http://example.com/stac')
    })

    it('should handle when no STAC links are available', () => {
      const facade = ngMocks.findInstance(MdViewFacade)
      facade.stacLinks$ = of([])
      component.ngOnInit()
      expect(component.currentPageUrl$.value).toBe(null)
    })
  })

  describe('items$ observable', () => {
    beforeEach(() => {
      component.ngOnInit()
    })

    it('should fetch items when both URL and temporal extent are available', (done) => {
      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(mockTemporalExtent)

      component.items$.subscribe((items) => {
        expect(items).toEqual([
          { id: 'item1', properties: { datetime: '2023-01-01T00:00:00Z' } },
          { id: 'item2', properties: { datetime: '2023-01-02T00:00:00Z' } },
        ])
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          {
            limit: 12,
            datetime: {
              start: mockTemporalExtent.start,
              end: mockTemporalExtent.end,
            },
          }
        )
        done()
      })
    })

    it('should fetch items without datetime filter when temporal extent is null', (done) => {
      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      component.items$.subscribe((items) => {
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          { limit: 12 }
        )
        done()
      })
    })

    it('should update pagination URLs after successful fetch', (done) => {
      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      component.items$.subscribe(() => {
        expect(component.previousPageUrl).toBe('http://example.com/page1')
        expect(component.nextPageUrl).toBe('http://example.com/page3')
        done()
      })
    })

    it('should handle API errors gracefully', (done) => {
      const error = new Error('dataset.error.message')
      const dataService = ngMocks.findInstance(DataService)
      dataService.getItemsFromStacApi = jest
        .fn()
        .mockReturnValue(Promise.reject(error))

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      component.items$.subscribe((items) => {
        expect(items).toEqual([])
        expect(component.error).toBe('translated:dataset.error.message')
        done()
      })
    })

    it('should display info message and show no-results button when no items are returned', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      dataService.getItemsFromStacApi = jest.fn().mockReturnValue(
        Promise.resolve({ features: [], links: [] } as {
          features: Array<any>
          links: Array<any>
        })
      )

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      component.items$.subscribe((items) => {
        expect(items).toEqual([])
        expect(component.error).toBeNull()
        fixture.detectChanges()
        const noResultsButton =
          fixture.nativeElement.querySelector('#no-results-button')
        expect(noResultsButton).not.toBeNull()
        done()
      })
    })
  })

  describe('onTemporalExtentChange', () => {
    it('should update current temporal extent, remove pagination token and set filter modified flag', () => {
      const newExtent: DatasetTemporalExtent = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      }
      jest.spyOn(component, 'removePaginationToken')
      component.onTemporalExtentChange(newExtent)
      expect(component.currentTemporalExtent$.value).toEqual(newExtent)
      expect(component.removePaginationToken).toHaveBeenCalled()
      expect(component.isFilterModified).toBe(true)
    })
  })

  describe('onResetFilters', () => {
    it('should reset temporal extent to initial value and clear modified flag', () => {
      component.initialTemporalExtent = mockTemporalExtent
      component.isFilterModified = true
      component.onResetFilters()
      expect(component.currentTemporalExtent$.value).toEqual(mockTemporalExtent)
      expect(component.isFilterModified).toBe(false)
    })
  })

  describe('handleError', () => {
    it('should handle FetchError', () => {
      const fetchError = new FetchError('http', 'NETWORK_ERROR', 404)
      component.handleError(fetchError)
      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(
        'dataset.error.http',
        { info: 'NETWORK_ERROR' }
      )
      expect(component.error).toBe('translated:dataset.error.http')
    })

    it('should handle generic Error', () => {
      const genericError = new Error('Test error message')
      component.handleError(genericError)
      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(
        'Test error message'
      )
      expect(component.error).toBe('translated:Test error message')
    })

    it('should handle string error', () => {
      const stringError = 'String error message'
      component.handleError(stringError)
      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(stringError)
      expect(component.error).toBe('translated:String error message')
    })

    it('should clear error when making a new API call', (done) => {
      component.error = 'Previous error'
      component.ngOnInit()
      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)
      component.items$.subscribe(() => {
        expect(component.error).toBe(null)
        done()
      })
    })
  })

  describe('pagination', () => {
    beforeEach(() => {
      component.previousPageUrl = 'http://example.com/page1'
      component.nextPageUrl = 'http://example.com/page3'
    })

    describe('isFirstPage', () => {
      it('should return true when previousPageUrl is null', () => {
        component.previousPageUrl = null
        expect(component.isFirstPage).toBe(true)
      })

      it('should return false when previousPageUrl is not null', () => {
        expect(component.isFirstPage).toBe(false)
      })
    })

    describe('isLastPage', () => {
      it('should return true when nextPageUrl is null', () => {
        component.nextPageUrl = null
        expect(component.isLastPage).toBe(true)
      })

      it('should return false when nextPageUrl is not null', () => {
        expect(component.isLastPage).toBe(false)
      })
    })

    describe('goToNextPage', () => {
      it('should update currentPageUrl$ with nextPageUrl', () => {
        component.goToNextPage()
        expect(component.currentPageUrl$.value).toBe('http://example.com/page3')
      })
    })

    describe('goToPrevPage', () => {
      it('should update currentPageUrl$ with previousPageUrl', () => {
        component.goToPrevPage()
        expect(component.currentPageUrl$.value).toBe('http://example.com/page1')
      })
    })
  })
})
