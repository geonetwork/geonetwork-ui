import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
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
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { Extent } from '@geospatial-sdk/core/dist/model'
import { Component, Input } from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { Collection } from 'ol'
import { Interaction } from 'ol/interaction'

const DEBOUNCE_TIME_MS_PLUS_MARGIN = 500 + 100
const STAC_ITEMS_PER_PAGE = 12

jest.mock('@geonetwork-ui/ui/map', () => ({
  ...jest.requireActual('@geonetwork-ui/ui/map'),
  prioritizePageScroll: jest.fn(),
}))

class OpenLayersMapMock {
  _size = undefined
  updateSize() {
    this._size = [100, 100]
  }
  getSize() {
    return this._size
  }
  getInteractions() {
    return new InteractionsMock()
  }
}

class InteractionsMock extends Collection<Interaction> {}

@Component({
  selector: 'gn-ui-map-container',
  template: '<div></div>',
  standalone: true,
})
export class MockMapContainerComponent {
  @Input() context: MapContext
  openlayersMap = Promise.resolve(new OpenLayersMapMock())
}

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
  } as unknown as never

  const mockSpatialExtent = [1, 2, 3, 4] as [number, number, number, number]

  beforeEach(() =>
    MockBuilder(StacViewComponent).replace(
      MapContainerComponent,
      MockMapContainerComponent
    )
  )

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
        MockProvider(MapUtilsService, {
          getRecordExtent: jest.fn().mockReturnValue(mockSpatialExtent),
        }),
        MockProvider(TranslateService, {
          instant: jest.fn().mockImplementation((key) => `translated:${key}`),
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(StacViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
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

    it('should initialize spatial extent from metadata and set map context', () => {
      component.ngOnInit()

      expect(component.initialSpatialExtent).toEqual(mockSpatialExtent)
      expect(component.mapContext$.value).toEqual({
        layers: [],
        view: {
          extent: mockSpatialExtent,
        },
      })
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
      component.currentPageUrl$.next(null) // Reset to initial state
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
            limit: STAC_ITEMS_PER_PAGE,
            datetime: {
              start: mockTemporalExtent.start,
              end: mockTemporalExtent.end,
            },
          }
        )
        done()
      })
    })

    it('should fetch items with spatial filter when enabled', fakeAsync(() => {
      let receivedItems = null
      component.items$.subscribe((items) => {
        receivedItems = items
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)
      component.isSpatialFilterEnabled$.next(true)
      component.currentSpatialExtent$.next(mockSpatialExtent)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      const dataService = ngMocks.findInstance(DataService)
      expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
        'http://example.com/stac',
        {
          limit: STAC_ITEMS_PER_PAGE,
          bbox: mockSpatialExtent,
        }
      )
      expect(receivedItems).toEqual(mockStacDocument.features)
      discardPeriodicTasks()
    }))

    it('should not include bbox when spatial filter is disabled', fakeAsync(() => {
      let receivedItems = null
      component.items$.subscribe((items) => {
        receivedItems = items
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)
      component.isSpatialFilterEnabled$.next(false)
      component.currentSpatialExtent$.next(mockSpatialExtent)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      const dataService = ngMocks.findInstance(DataService)
      expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
        'http://example.com/stac',
        { limit: STAC_ITEMS_PER_PAGE }
      )
      expect(receivedItems).toEqual(mockStacDocument.features)
      discardPeriodicTasks()
    }))

    it('should not include bbox when spatial extent is null', fakeAsync(() => {
      let receivedItems = null
      component.items$.subscribe((items) => {
        receivedItems = items
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)
      component.isSpatialFilterEnabled$.next(true)
      component.currentSpatialExtent$.next(null)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      const dataService = ngMocks.findInstance(DataService)
      expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
        'http://example.com/stac',
        { limit: STAC_ITEMS_PER_PAGE }
      )
      expect(receivedItems).toEqual(mockStacDocument.features)
      discardPeriodicTasks()
    }))

    it('should fetch items without datetime filter when start and end date are null', fakeAsync(() => {
      component.items$.subscribe(() => {
        // Just subscribe to trigger the observable
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next({
        start: null,
        end: null,
      })

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      const dataService = ngMocks.findInstance(DataService)
      expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
        'http://example.com/stac',
        { limit: STAC_ITEMS_PER_PAGE }
      )
      discardPeriodicTasks()
    }))

    it('should update pagination URLs after successful fetch', fakeAsync(() => {
      component.items$.subscribe(() => {
        // Just subscribe to trigger the observable
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      expect(component.previousPageUrl).toBe('http://example.com/page1')
      expect(component.nextPageUrl).toBe('http://example.com/page3')
      discardPeriodicTasks()
    }))

    it('should handle API errors gracefully', () => {
      const error = new Error('dataset.error.message')
      component.handleError(error)
      expect(component.error).toBe('translated:dataset.error.message')
    })

    it('should display info message and show no-results button when no items are returned', fakeAsync(() => {
      const dataService = ngMocks.findInstance(DataService)
      dataService.getItemsFromStacApi = jest
        .fn()
        .mockReturnValue(
          Promise.resolve({ features: [], links: [] } as unknown as never)
        )

      let receivedItems = null
      component.items$.subscribe((items) => {
        receivedItems = items
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      expect(receivedItems).toEqual([])
      expect(component.error).toBeNull()
      fixture.detectChanges()
      const noResultsButton =
        fixture.nativeElement.querySelector('#no-results-button')
      expect(noResultsButton).not.toBeNull()
      discardPeriodicTasks()
    }))
  })

  describe('onTemporalExtentChange', () => {
    it('should update current temporal extent', () => {
      const newExtent: DatasetTemporalExtent = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      }
      component.onTemporalExtentChange(newExtent)
      expect(component.currentTemporalExtent$.value).toEqual(newExtent)
    })
  })

  describe('onSpatialExtentChange', () => {
    it('should update current spatial extent', () => {
      const newExtent = [5, 6, 7, 8] as [number, number, number, number]
      component.onSpatialExtentChange(newExtent)
      expect(component.currentSpatialExtent$.value).toEqual(newExtent)
    })
  })

  describe('onResolvedMapExtentChange', () => {
    it('should update resolved initial spatial extent', () => {
      const resolvedExtent = [9, 10, 11, 12] as [number, number, number, number]
      component.onResolvedMapExtentChange(resolvedExtent)
      expect(component.resolvedInitialSpatialExtent).toEqual(resolvedExtent)
    })
  })

  describe('onSpatialFilterToggle', () => {
    it('should enable spatial filter', () => {
      component.onSpatialFilterToggle(true)
      expect(component.isSpatialFilterEnabled$.value).toBe(true)
    })

    it('should disable spatial filter', () => {
      component.onSpatialFilterToggle(false)
      expect(component.isSpatialFilterEnabled$.value).toBe(false)
    })
  })

  describe('isFilterModified$', () => {
    beforeEach(() => {
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
    })

    it('should be true when temporal extent has changed', (done) => {
      component.currentTemporalExtent$.next({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })
      component.currentSpatialExtent$.next(mockSpatialExtent)
      component.isSpatialFilterEnabled$.next(true)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when spatial extent has changed and filter is enabled', (done) => {
      component.currentTemporalExtent$.next(mockTemporalExtent)
      component.currentSpatialExtent$.next([5, 6, 7, 8] as Extent)
      component.isSpatialFilterEnabled$.next(true)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be false when spatial filter is disabled and only spatial extent changed', (done) => {
      component.currentTemporalExtent$.next(mockTemporalExtent)
      component.currentSpatialExtent$.next([5, 6, 7, 8] as Extent)
      component.isSpatialFilterEnabled$.next(false)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(false)
        done()
      })
    })

    it('should be false when extents match initial values', (done) => {
      component.currentTemporalExtent$.next(mockTemporalExtent)
      component.currentSpatialExtent$.next(mockSpatialExtent)
      component.isSpatialFilterEnabled$.next(true)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(false)
        done()
      })
    })
  })

  describe('onResetFilters', () => {
    beforeEach(() => {
      component.initialTemporalExtent = mockTemporalExtent
      component.initialSpatialExtent = mockSpatialExtent
    })

    it('should reset temporal extent to initial value', () => {
      component.currentTemporalExtent$.next({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })
      component.onResetFilters()
      expect(component.currentTemporalExtent$.value).toEqual(mockTemporalExtent)
    })

    it('should reset spatial extent and map context when spatial filter is enabled', () => {
      component.isSpatialFilterEnabled$.next(true)
      component.currentSpatialExtent$.next([5, 6, 7, 8] as Extent)
      component.resolvedInitialSpatialExtent = null
      component.mapContext$.next({
        layers: [],
        view: { extent: [5, 6, 7, 8] as [number, number, number, number] },
      })

      component.onResetFilters()

      expect(component.currentSpatialExtent$.value).toBeNull()
      expect(component.mapContext$.value).toEqual({
        layers: [],
        view: {
          extent: mockSpatialExtent,
        },
      })
    })

    it('should reset spatial extent and enable spatial filter even when it was disabled', () => {
      component.isSpatialFilterEnabled$.next(false)
      component.currentSpatialExtent$.next([5, 6, 7, 8] as Extent)
      component.resolvedInitialSpatialExtent = mockSpatialExtent

      component.onResetFilters()

      expect(component.isSpatialFilterEnabled$.value).toBe(true)
      expect(component.currentSpatialExtent$.value).toEqual(mockSpatialExtent)
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

    it('should clear error when making a new API call', fakeAsync(() => {
      component.error = 'Previous error'
      component.ngOnInit()

      component.items$.subscribe(() => {
        // Just subscribe to trigger the observable
      })

      component.currentPageUrl$.next('http://example.com/stac')
      component.currentTemporalExtent$.next(null)

      tick(DEBOUNCE_TIME_MS_PLUS_MARGIN)

      expect(component.error).toBe(null)
      discardPeriodicTasks()
    }))
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
