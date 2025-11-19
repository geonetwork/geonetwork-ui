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
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { Extent } from '@geospatial-sdk/core/dist/model'
import { Component, Input } from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { Collection } from 'ol'
import { Interaction } from 'ol/interaction'

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
      expect(component.filterState$.value.temporalExtent).toEqual(
        mockTemporalExtent
      )
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
      expect(component.filterState$.value.temporalExtent).toEqual({
        start: null,
        end: null,
      })
    })

    it('should set current page URL from STAC links', () => {
      component.ngOnInit()
      expect(component.filterState$.value.pageUrl).toBe(
        'http://example.com/stac'
      )
    })

    it('should handle when no STAC links are available', () => {
      const facade = ngMocks.findInstance(MdViewFacade)
      facade.stacLinks$ = of([])
      component.initialPageUrl = null // Reset to prevent metadata$ subscription from setting pageUrl
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: null,
      }) // Reset to initial state
      component.ngOnInit()
      expect(component.filterState$.value.pageUrl).toBe(null)
    })
  })

  describe('items$ observable', () => {
    beforeEach(() => {
      component.ngOnInit()
    })

    it('should fetch items when both URL and temporal extent are available', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(mockTemporalExtent)

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

    it('should fetch items with spatial filter when enabled', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)
      component.onSpatialFilterToggle(true)
      component.onSpatialExtentChange(mockSpatialExtent)

      component.items$.subscribe((items) => {
        expect(items).toEqual(mockStacDocument.features)
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          {
            limit: STAC_ITEMS_PER_PAGE,
            bbox: mockSpatialExtent,
          }
        )
        done()
      })
    })

    it('should not include bbox when spatial filter is disabled', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)
      component.onSpatialFilterToggle(false)
      component.onSpatialExtentChange(mockSpatialExtent)

      component.items$.subscribe((items) => {
        expect(items).toEqual(mockStacDocument.features)
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          { limit: STAC_ITEMS_PER_PAGE }
        )
        done()
      })
    })

    it('should not include bbox when spatial extent is null', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)
      component.onSpatialFilterToggle(true)
      component.onSpatialExtentChange(null)

      component.items$.subscribe((items) => {
        expect(items).toEqual(mockStacDocument.features)
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          { limit: STAC_ITEMS_PER_PAGE }
        )
        done()
      })
    })

    it('should not trigger API call when spatial extent changes but filter is disabled', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)
      component.onSpatialFilterToggle(false)

      // Wait for debounce and initial load
      setTimeout(() => {
        apiSpy.mockClear()

        // Change spatial extent while filter is disabled
        component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

        // Wait for debounce time
        setTimeout(() => {
          // Should not have called the API since spatial filter is disabled
          expect(apiSpy).not.toHaveBeenCalled()
          done()
        }, 600)
      }, 600)
    })

    it('should fetch items without datetime filter when start and end date are null', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange({
        start: null,
        end: null,
      })

      component.items$.subscribe(() => {
        const dataService = ngMocks.findInstance(DataService)
        expect(dataService.getItemsFromStacApi).toHaveBeenCalledWith(
          'http://example.com/stac',
          { limit: STAC_ITEMS_PER_PAGE }
        )
        done()
      })
    })

    it('should update pagination URLs after successful fetch', (done) => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)

      component.items$.subscribe(() => {
        expect(component.previousPageUrl).toBe('http://example.com/page1')
        expect(component.nextPageUrl).toBe('http://example.com/page3')
        done()
      })
    })

    it('should handle API errors gracefully', () => {
      const error = new Error('dataset.error.message')
      component.handleError(error)
      expect(component.error$.value).toBe('translated:dataset.error.message')
    })

    it('should display info message and show no-results button when no items are returned', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      dataService.getItemsFromStacApi = jest
        .fn()
        .mockReturnValue(
          Promise.resolve({ features: [], links: [] } as unknown as never)
        )

      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)

      component.items$.subscribe((items) => {
        expect(items).toEqual([])
        expect(component.error$.value).toBeNull()
        fixture.detectChanges()
        const noResultsButton =
          fixture.nativeElement.querySelector('#no-results-button')
        expect(noResultsButton).not.toBeNull()
        done()
      })
    })

    it('should only call API once when filter state changes', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      component.initialPageUrl = 'http://example.com/stac'
      component.ngOnInit()

      // Wait for initial load
      setTimeout(() => {
        const initialCallCount = apiSpy.mock.calls.length

        // Change temporal filter
        component.onTemporalExtentChange({
          start: new Date('2024-01-01'),
          end: new Date('2024-12-31'),
        })

        // Wait for debounce and processing
        setTimeout(() => {
          const newCallCount = apiSpy.mock.calls.length
          expect(newCallCount - initialCallCount).toBe(1)
          done()
        }, 700)
      }, 700)
    })
  })

  describe('onTemporalExtentChange', () => {
    it('should update current temporal extent', () => {
      const newExtent: DatasetTemporalExtent = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      }
      component.onTemporalExtentChange(newExtent)
      expect(component.filterState$.value.temporalExtent).toEqual(newExtent)
    })
  })

  describe('onSpatialExtentChange', () => {
    it('should update current spatial extent', () => {
      const newExtent = [5, 6, 7, 8] as [number, number, number, number]
      component.onSpatialExtentChange(newExtent)
      expect(component.filterState$.value.spatialExtent).toEqual(newExtent)
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
      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        true
      )
    })

    it('should disable spatial filter', () => {
      component.onSpatialFilterToggle(false)
      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        false
      )
    })
  })

  describe('isFilterModified$', () => {
    beforeEach(() => {
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
    })

    it('should be false on initial component load before resolved extent is set', (done) => {
      component.initialTemporalExtent = mockTemporalExtent
      component.onTemporalExtentChange(mockTemporalExtent)
      component.onSpatialExtentChange(mockSpatialExtent)
      component.resolvedInitialSpatialExtent = null

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(false)
        done()
      })
    })

    it('should be true when temporal filter start date is changed', (done) => {
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.onSpatialExtentChange(mockSpatialExtent)

      const modifiedTemporalExtent = {
        start: new Date('2023-06-01'),
        end: mockTemporalExtent.end,
      }
      component.onTemporalExtentChange(modifiedTemporalExtent)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when temporal filter end date is changed', (done) => {
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.onSpatialExtentChange(mockSpatialExtent)

      const modifiedTemporalExtent = {
        start: mockTemporalExtent.start,
        end: new Date('2023-12-31'),
      }
      component.onTemporalExtentChange(modifiedTemporalExtent)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when temporal extent has changed', (done) => {
      component.onTemporalExtentChange({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })
      component.onSpatialExtentChange(mockSpatialExtent)
      component.onSpatialFilterToggle(true)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when spatial extent has changed and filter is enabled', (done) => {
      component.onTemporalExtentChange(mockTemporalExtent)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
      component.onSpatialFilterToggle(true)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be false when spatial filter is disabled and only spatial extent changed', (done) => {
      component.onTemporalExtentChange(mockTemporalExtent)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
      component.onSpatialFilterToggle(false)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(false)
        done()
      })
    })

    it('should be false when extents match initial values', (done) => {
      component.onTemporalExtentChange(mockTemporalExtent)
      component.onSpatialExtentChange(mockSpatialExtent)
      component.onSpatialFilterToggle(true)

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
      component.initialPageUrl = 'http://example.com/stac'
    })

    it('should reset temporal extent to initial value', () => {
      component.onTemporalExtentChange({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })
      component.onResetFilters()
      expect(component.filterState$.value.temporalExtent).toEqual(
        mockTemporalExtent
      )
    })

    it('should reset pageUrl to initialPageUrl in filterState$', () => {
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac?page=2',
      })
      component.onResetFilters()
      // onResetFilters now directly sets pageUrl to initialPageUrl in filterState$
      expect(component.filterState$.value.pageUrl).toBe(
        component.initialPageUrl
      )
    })

    it('should reset spatial extent and map context when spatial filter is enabled', () => {
      component.onSpatialFilterToggle(true)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
      component.resolvedInitialSpatialExtent = null
      component.mapContext$.next({
        layers: [],
        view: { extent: [5, 6, 7, 8] as [number, number, number, number] },
      })

      component.onResetFilters()

      expect(component.filterState$.value.spatialExtent).toBeNull()
      expect(component.mapContext$.value).toEqual({
        layers: [],
        view: {
          extent: mockSpatialExtent,
        },
      })
    })

    it('should reset spatial extent and enable spatial filter even when it was disabled', () => {
      component.onSpatialFilterToggle(false)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
      component.resolvedInitialSpatialExtent = mockSpatialExtent

      component.onResetFilters()

      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        true
      )
      expect(component.filterState$.value.spatialExtent).toEqual(
        mockSpatialExtent
      )
    })

    it('should only trigger one API call when resetting from modified spatial extent', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      component.initialPageUrl = 'http://example.com/stac'
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.ngOnInit()

      // Wait for initial load
      setTimeout(() => {
        // Clear API calls from initial load
        apiSpy.mockClear()

        // Modify spatial extent (zoom in)
        component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

        // Wait for the modified extent to be processed (debounce + API call)
        setTimeout(() => {
          // Clear API calls from the filter change
          apiSpy.mockClear()

          // Reset filters back to initial state
          component.onResetFilters()

          // Wait for debounce and processing (500ms debounce + API call time)
          setTimeout(() => {
            // Should only have been called once, not twice
            expect(apiSpy).toHaveBeenCalledTimes(1)
            expect(apiSpy).toHaveBeenCalledWith(
              'http://example.com/stac',
              expect.objectContaining({
                limit: 12,
                bbox: mockSpatialExtent,
              })
            )
            done()
          }, 700)
        }, 700)
      }, 100)
    })

    it('should only trigger one API call when resetting both temporal and spatial filters', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      component.initialPageUrl = 'http://example.com/stac'
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.ngOnInit()

      // Wait for initial load
      setTimeout(() => {
        // Clear API calls from initial load
        apiSpy.mockClear()

        // Modify both spatial extent (zoom in) and temporal extent
        component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
        component.onTemporalExtentChange({
          start: new Date('2024-01-01'),
          end: new Date('2024-12-31'),
        })

        // Wait for the modified filters to be processed (debounce + API call)
        setTimeout(() => {
          // Clear API calls from the filter changes
          apiSpy.mockClear()

          // Reset filters back to initial state
          component.onResetFilters()

          // Wait for debounce and processing (500ms debounce + API call time)
          setTimeout(() => {
            // Should only have been called once with both filters reset
            expect(apiSpy).toHaveBeenCalledTimes(1)
            expect(apiSpy).toHaveBeenCalledWith(
              'http://example.com/stac',
              expect.objectContaining({
                limit: 12,
                bbox: mockSpatialExtent,
                datetime: {
                  start: mockTemporalExtent.start,
                  end: mockTemporalExtent.end,
                },
              })
            )
            done()
          }, 700)
        }, 700)
      }, 100)
    })

    it('should only trigger one API call when resetting filters after changing temporal, spatial, and navigating to next page', (done) => {
      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      component.initialPageUrl = 'http://example.com/stac'
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.ngOnInit()

      // Wait for initial load
      setTimeout(() => {
        // Clear API calls from initial load
        apiSpy.mockClear()

        // Step 1: Change temporal extent
        component.onTemporalExtentChange({
          start: new Date('2024-01-01'),
          end: new Date('2024-12-31'),
        })

        // Step 2: Change spatial extent (zoom in)
        component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

        // Wait for the filter changes to be processed
        setTimeout(() => {
          apiSpy.mockClear()

          // Step 3: Navigate to next page
          component.nextPageUrl = 'http://example.com/stac?page=2'
          component.goToNextPage()

          // Wait for page change
          setTimeout(() => {
            apiSpy.mockClear()

            // Step 4: Reset filters
            component.onResetFilters()

            // Wait for debounce and processing
            setTimeout(() => {
              // Should only have been called once, not twice
              expect(apiSpy).toHaveBeenCalledTimes(1)
              expect(apiSpy).toHaveBeenCalledWith(
                'http://example.com/stac',
                expect.objectContaining({
                  limit: 12,
                  bbox: mockSpatialExtent,
                  datetime: {
                    start: mockTemporalExtent.start,
                    end: mockTemporalExtent.end,
                  },
                })
              )
              done()
            }, 700)
          }, 100)
        }, 700)
      }, 100)
    })
  })

  describe('filter change pagination reset', () => {
    beforeEach(() => {
      component.initialPageUrl = 'http://example.com/stac'
      component.initialTemporalExtent = mockTemporalExtent
      component.resolvedInitialSpatialExtent = mockSpatialExtent
      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/page2',
      })
      component.ngOnInit()
    })

    it('should reset pagination when temporal extent changes', (done) => {
      const newExtent = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      }
      component.onTemporalExtentChange(newExtent)

      setTimeout(() => {
        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/stac'
        )
        done()
      }, 100)
    })

    it('should reset pagination when spatial extent changes and filter is enabled', (done) => {
      component.onSpatialFilterToggle(true)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

      setTimeout(() => {
        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/stac'
        )
        done()
      }, 600) // Wait for debounce
    })

    it('should reset pagination when spatial filter is toggled', (done) => {
      component.onSpatialFilterToggle(false)

      setTimeout(() => {
        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/stac'
        )
        done()
      }, 100)
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
      expect(component.error$.value).toBe('translated:dataset.error.http')
    })

    it('should handle generic Error', () => {
      const genericError = new Error('Test error message')
      component.handleError(genericError)
      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(
        'Test error message'
      )
      expect(component.error$.value).toBe('translated:Test error message')
    })

    it('should handle string error', () => {
      const stringError = 'String error message'
      component.handleError(stringError)
      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(stringError)
      expect(component.error$.value).toBe('translated:String error message')
    })

    it('should clear error when making a new API call', (done) => {
      component.error$.next('Previous error')
      component.ngOnInit()

      component.filterState$.next({
        ...component.filterState$.value,
        pageUrl: 'http://example.com/stac',
      })
      component.onTemporalExtentChange(null)

      component.items$.subscribe(() => {
        expect(component.error$.value).toBe(null)
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
      it('should update filterState$.pageUrl with nextPageUrl', () => {
        component.goToNextPage()
        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/page3'
        )
      })
    })

    describe('goToPrevPage', () => {
      it('should update filterState$.pageUrl with previousPageUrl', () => {
        component.goToPrevPage()
        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/page1'
        )
      })
    })
  })
})
