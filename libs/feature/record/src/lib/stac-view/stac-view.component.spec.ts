import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { StacViewComponent } from './stac-view.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  DatasetRecord,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record/index.js'
import { of } from 'rxjs'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { MdViewFacade } from '../state/index.js'
import { TranslateService } from '@ngx-translate/core'
import { FetchError } from '@geonetwork-ui/data-fetcher'
import { MockBuilder, MockProvider, ngMocks } from 'ng-mocks'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { Extent } from '@geospatial-sdk/core/dist/model'
import { Component, Input } from '@angular/core'
import { MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { Collection } from 'ol'
import { Interaction } from 'ol/interaction.js'

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

  function createTestComponent(): StacViewComponent {
    fixture = TestBed.createComponent(StacViewComponent)
    component = fixture.componentInstance

    component.ngOnInit()
    fixture.detectChanges()

    component.onResolvedMapExtentChange(mockInitialResolvedSpatialExtent)

    fixture.detectChanges()

    return component
  }

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
  }

  const mockInitialSpatialExtent = [1, 2, 3, 4] as [
    number,
    number,
    number,
    number,
  ]
  const mockInitialResolvedSpatialExtent = [10, 20, 30, 40] as [
    number,
    number,
    number,
    number,
  ]

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
          stacLinks$: of([mockStacLink] as unknown as never[]),
        }),
        MockProvider(MapUtilsService, {
          getRecordExtent: jest.fn().mockReturnValue(mockInitialSpatialExtent),
        }),
        MockProvider(TranslateService, {
          instant: jest.fn().mockImplementation((key) => `translated:${key}`),
        }),
      ],
    }).compileComponents()
  })

  afterEach(() => {
    component = null
    fixture = null

    jest.clearAllMocks()
  })

  it('should create', () => {
    component = createTestComponent()

    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should initialize temporal extent from metadata', () => {
      component = createTestComponent()

      expect(component.initialTemporalExtent).toEqual(mockTemporalExtent)
      expect(component.filterState$.value.temporalExtent).toEqual(
        mockTemporalExtent
      )
    })

    it('should initialize spatial extent from metadata and set map context', () => {
      component = createTestComponent()

      expect(component.initialSpatialExtent).toEqual(mockInitialSpatialExtent)
      expect(component.mapContext$.value).toEqual({
        layers: [],
        view: {
          extent: mockInitialSpatialExtent,
        },
      })
    })

    it('should initialize with default temporal extent when no temporal extents exist', () => {
      const recordWithoutExtents = { ...mockDatasetRecord, temporalExtents: [] }
      const facade = ngMocks.findInstance(MdViewFacade)
      facade.metadata$ = of(recordWithoutExtents)

      component = createTestComponent()

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
      component = createTestComponent()

      expect(component.filterState$.value.pageUrl).toBe(
        'http://example.com/stac'
      )
    })
  })

  describe('onTemporalExtentChange', () => {
    it('should update current temporal extent', () => {
      component = createTestComponent()

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
      component = createTestComponent()

      const newExtent = [5, 6, 7, 8] as [number, number, number, number]
      component.onSpatialExtentChange(newExtent)

      expect(component.filterState$.value.spatialExtent).toEqual(newExtent)
    })
  })

  describe('onResolvedMapExtentChange', () => {
    it('should update resolved initial spatial extent', () => {
      component = createTestComponent()

      const resolvedExtent = [9, 10, 11, 12] as [number, number, number, number]
      component.onResolvedMapExtentChange(resolvedExtent)

      expect(component.resolvedInitialSpatialExtent).toEqual(resolvedExtent)
    })
  })

  describe('onSpatialFilterToggle', () => {
    it('should enable spatial filter', () => {
      component = createTestComponent()

      component.onSpatialFilterToggle(true)

      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        true
      )
    })

    it('should disable spatial filter', () => {
      component = createTestComponent()

      component.onSpatialFilterToggle(false)

      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        false
      )
    })
  })

  describe('isFilterModified$', () => {
    it('should be true when temporal filter start date is changed', (done) => {
      component = createTestComponent()

      component.onTemporalExtentChange({
        start: new Date('2024-01-01'),
        end: mockTemporalExtent.end,
      })

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when temporal filter end date is changed', (done) => {
      component = createTestComponent()

      component.onTemporalExtentChange({
        start: mockTemporalExtent.start,
        end: new Date('2024-12-31'),
      })

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when temporal extent has changed', (done) => {
      component = createTestComponent()

      component.onTemporalExtentChange({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be true when spatial extent has changed and filter is enabled', (done) => {
      component = createTestComponent()

      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(true)
        done()
      })
    })

    it('should be false when spatial filter is disabled and only spatial extent changed', (done) => {
      component = createTestComponent()

      component.onSpatialFilterToggle(false)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

      component.isFilterModified$.subscribe((isModified) => {
        expect(isModified).toBe(false)
        done()
      })
    })
  })

  describe('onResetFilters', () => {
    it('should reset temporal extent to initialPageUrl value', () => {
      component = createTestComponent()

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
      component = createTestComponent()

      component.nextPageUrl = 'http://example.com/stac?page=2'

      component.goToNextPage()
      expect(component.filterState$.value.pageUrl).toBe(
        'http://example.com/stac?page=2'
      )

      component.onResetFilters()

      expect(component.filterState$.value.pageUrl).toBe(
        component.initialPageUrl
      )
    })

    it('should reset spatial extent and map context when spatial filter is enabled', () => {
      component = createTestComponent()
      component.onSpatialFilterToggle(true)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

      component.onResetFilters()

      fixture.detectChanges()

      expect(component.filterState$.value.spatialExtent).toEqual(
        mockInitialResolvedSpatialExtent
      )
      expect(component.mapContext$.value).toEqual({
        layers: [],
        view: {
          extent: mockInitialSpatialExtent,
        },
      })
    })

    it('should reset spatial extent and enable spatial filter even when it was disabled', () => {
      component = createTestComponent()
      component.onSpatialFilterToggle(false)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)

      component.onResetFilters()

      expect(component.filterState$.value.isSpatialExtentFilterEnabled).toBe(
        true
      )
      expect(component.filterState$.value.spatialExtent).toEqual(
        mockInitialResolvedSpatialExtent
      )
    })

    it('should only trigger one API call when resetting from modified spatial extent', fakeAsync(() => {
      component = createTestComponent()

      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      // Modify spatial extent (zoom in)
      const bbox = [5, 6, 7, 8] as Extent
      component.onSpatialExtentChange(bbox)
      tick(500)

      expect(apiSpy).toHaveBeenCalledTimes(1)
      expect(apiSpy).toHaveBeenCalledWith(
        'http://example.com/stac',
        expect.objectContaining({
          limit: STAC_ITEMS_PER_PAGE,
          datetime: {
            start: mockTemporalExtent.start,
            end: mockTemporalExtent.end,
          },
          bbox: bbox,
        })
      )

      apiSpy.mockClear()
      component.onResetFilters()
      tick(500)

      // Should only have been called once with initial resolved spatial extent
      expect(apiSpy).toHaveBeenCalledTimes(1)
      expect(apiSpy).toHaveBeenCalledWith(
        'http://example.com/stac',
        expect.objectContaining({
          limit: STAC_ITEMS_PER_PAGE,
          bbox: mockInitialResolvedSpatialExtent,
          datetime: {
            start: mockTemporalExtent.start,
            end: mockTemporalExtent.end,
          },
        })
      )
    }))

    it('should only trigger one API call when resetting both temporal and spatial filters', fakeAsync(() => {
      component = createTestComponent()

      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      // Modify both spatial extent (zoom in) and temporal extent
      const bbox = [5, 6, 7, 8] as Extent
      const newTemporalExtent = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      }
      component.onSpatialExtentChange(bbox)
      component.onTemporalExtentChange(newTemporalExtent)
      tick(500)

      expect(apiSpy).toHaveBeenCalledTimes(1)
      expect(apiSpy).toHaveBeenCalledWith(
        mockStacLink.url.href,
        expect.objectContaining({
          limit: STAC_ITEMS_PER_PAGE,
          bbox: bbox,
          datetime: newTemporalExtent,
        })
      )

      apiSpy.mockClear()
      component.onResetFilters()
      tick(500)

      // Should only have been called once with both filters reset
      expect(apiSpy).toHaveBeenCalledTimes(1)
      expect(apiSpy).toHaveBeenCalledWith(
        mockStacLink.url.href,
        expect.objectContaining({
          limit: STAC_ITEMS_PER_PAGE,
          bbox: mockInitialResolvedSpatialExtent,
          datetime: mockTemporalExtent,
        })
      )
    }))

    it('should only trigger one API call when resetting filters after changing temporal, spatial, and navigating to next page', fakeAsync(() => {
      component = createTestComponent()

      const dataService = ngMocks.findInstance(DataService)
      const apiSpy = jest.spyOn(dataService, 'getItemsFromStacApi')

      // Step 1: Change temporal extent
      component.onTemporalExtentChange({
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
      })

      // Step 2: Change spatial extent (zoom in)
      component.onSpatialExtentChange([5, 6, 7, 8] as Extent)
      tick(500)

      expect(apiSpy).toHaveBeenCalledTimes(1)

      // Step 3: Navigate to next page
      component.nextPageUrl = 'http://example.com/stac?page=2'
      component.goToNextPage()
      tick(500)

      expect(apiSpy).toHaveBeenCalledTimes(2)

      // Step 4: Reset filters
      component.onResetFilters()
      tick(500)

      // Should only have been called one more time, not twice
      expect(apiSpy).toHaveBeenCalledTimes(3)
      expect(apiSpy).toHaveBeenLastCalledWith(
        'http://example.com/stac',
        expect.objectContaining({
          limit: STAC_ITEMS_PER_PAGE,
          bbox: mockInitialResolvedSpatialExtent,
          datetime: mockTemporalExtent,
        })
      )
    }))
  })

  describe('handleError', () => {
    it('should handle FetchError', () => {
      component = createTestComponent()

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
      component = createTestComponent()

      const genericError = new Error('Test error message')
      component.handleError(genericError)

      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(
        'Test error message'
      )
      expect(component.error$.value).toBe('translated:Test error message')
    })

    it('should handle string error', () => {
      component = createTestComponent()

      const stringError = 'String error message'
      component.handleError(stringError)

      const translateService = ngMocks.findInstance(TranslateService)
      expect(translateService.instant).toHaveBeenCalledWith(stringError)
      expect(component.error$.value).toBe('translated:String error message')
    })

    it('should clear error when making a new API call', (done) => {
      component = createTestComponent()
      component.error$.next('Previous error')

      component.onTemporalExtentChange(null)

      component.items$.subscribe(() => {
        expect(component.error$.value).toBe(null)
        done()
      })
    })
  })

  describe('pagination', () => {
    describe('isFirstPage', () => {
      it('should return true when previousPageUrl is null', () => {
        component = createTestComponent()
        component.previousPageUrl = null
        expect(component.isFirstPage).toBe(true)
      })

      it('should return false when previousPageUrl is not null', () => {
        component = createTestComponent()
        component.previousPageUrl = 'http://example.com/page1'

        expect(component.isFirstPage).toBe(false)
      })
    })

    describe('isLastPage', () => {
      it('should return true when nextPageUrl is null', () => {
        component = createTestComponent()
        component.nextPageUrl = null

        expect(component.isLastPage).toBe(true)
      })

      it('should return false when nextPageUrl is not null', () => {
        component = createTestComponent()
        component.nextPageUrl = 'http://example.com/page3'

        expect(component.isLastPage).toBe(false)
      })
    })

    describe('goToNextPage', () => {
      it('should update filterState$.pageUrl with nextPageUrl', () => {
        component = createTestComponent()
        component.nextPageUrl = 'http://example.com/page3'

        component.goToNextPage()

        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/page3'
        )
      })
    })

    describe('goToPrevPage', () => {
      it('should update filterState$.pageUrl with previousPageUrl', () => {
        component = createTestComponent()
        component.previousPageUrl = 'http://example.com/page1'

        component.goToPrevPage()

        expect(component.filterState$.value.pageUrl).toBe(
          'http://example.com/page1'
        )
      })
    })
  })
})
