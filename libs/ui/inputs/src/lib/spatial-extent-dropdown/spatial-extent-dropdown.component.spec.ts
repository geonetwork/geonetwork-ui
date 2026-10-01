import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { SpatialExtentDropdownComponent } from './spatial-extent-dropdown.component'

describe('SpatialExtentDropdownComponent', () => {
  let component: SpatialExtentDropdownComponent
  let fixture: ComponentFixture<SpatialExtentDropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialExtentDropdownComponent)
    component = fixture.componentInstance
    component.title = 'Spatial extent'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    it('has no selection', () => {
      expect(component.hasSelection).toBe(false)
      expect(component.fileName).toBe('')
    })
  })

  describe('selection labels', () => {
    it('uses the imported-file labels when a GeoJSON file was imported', () => {
      component.bbox = [1, 2, 3, 4]
      component.fileName = 'area.geojson'

      expect(component.selectionLabelKey).toBe(
        'search.filters.spatialExtent.bboxFromFile'
      )
      expect(component.selectionDeleteLabelKey).toBe(
        'search.filters.spatialExtent.bboxFromFileDelete'
      )
      expect(component.selectionLabelParams).toEqual({
        fileName: 'area.geojson',
        locationName: '',
      })
    })

    it('uses the location labels when the bbox comes from a location search', () => {
      component.setLocationBbox([1, 2, 3, 4], 'Paris, 75')

      expect(component.hasSelection).toBe(true)
      expect(component.selectionLabelKey).toBe(
        'search.filters.spatialExtent.bboxFromLocation'
      )
      expect(component.selectionDeleteLabelKey).toBe(
        'search.filters.spatialExtent.bboxFromLocationDelete'
      )
      expect(component.selectionLabelParams).toEqual({
        fileName: '',
        locationName: 'Paris, 75',
      })
    })

    it('uses the initial-bbox labels when the bbox comes from the filters', () => {
      component.initialBbox = [1, 2, 3, 4]

      expect(component.hasSelection).toBe(true)
      expect(component.fileName).toBe('')
      expect(component.selectionLabelKey).toBe(
        'search.filters.spatialExtent.bboxInitial'
      )
      expect(component.selectionDeleteLabelKey).toBe(
        'search.filters.spatialExtent.bboxInitialDelete'
      )
    })
  })

  describe('overlay toggling', () => {
    beforeEach(() => {
      const originEl: HTMLElement =
        component.overlayOrigin.elementRef.nativeElement
      originEl.getBoundingClientRect = () => ({ width: 40 }) as any
    })

    it('opens the overlay and sizes it from the origin element', () => {
      component.toggleOverlay()
      expect(component.overlayOpen).toBe(true)
      expect(component.overlayMinWidth).toBe('40px')
    })

    it('closes the overlay when toggled again while open', () => {
      component.toggleOverlay()
      component.toggleOverlay()
      expect(component.overlayOpen).toBe(false)
    })
  })

  describe('removeSelection', () => {
    let emittedBbox: unknown[]

    beforeEach(() => {
      component.bbox = [1, 2, 3, 4]
      component.fileName = 'test.geojson'
      component.locationName = 'Paris'
      component.errorKey = 'search.filters.spatialExtent.error.noGeometry'
      emittedBbox = []
      component.bboxChange.subscribe((v) => emittedBbox.push(v))
    })

    it('clears the selection and error state, and emits null', () => {
      const event = new Event('click')
      jest.spyOn(event, 'stopPropagation')

      component.removeSelection(event)

      expect(component.bbox).toBeNull()
      expect(component.fileName).toBe('')
      expect(component.locationName).toBe('')
      expect(component.errorKey).toBeNull()
      expect(emittedBbox).toEqual([null])
      expect(event.stopPropagation).toHaveBeenCalled()
    })

    it('resets the file input when present', () => {
      const clearSpy = jest.fn()
      component.fileInput = { clear: clearSpy } as any

      component.removeSelection(new Event('click'))

      expect(clearSpy).toHaveBeenCalled()
    })
  })

  describe('handleFileSelected', () => {
    let emittedBbox: unknown[]
    let emittedErrors: unknown[]

    function createFile(content: string, name: string) {
      return new File([content], name, { type: 'application/json' })
    }

    beforeEach(() => {
      emittedBbox = []
      emittedErrors = []
      component.bboxChange.subscribe((v) => emittedBbox.push(v))
      component.errorChange.subscribe((v) => emittedErrors.push(v))
    })

    it('rejects a file that is not valid JSON', async () => {
      await component.handleFileSelected(createFile('not json', 'area.geojson'))

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.invalidFormat'
      )
      expect(emittedErrors).toEqual([
        { key: 'search.filters.spatialExtent.error.invalidFormat' },
      ])
    })

    it('rejects a GeoJSON file with no geometry', async () => {
      const content = JSON.stringify({
        type: 'FeatureCollection',
        features: [],
      })

      await component.handleFileSelected(createFile(content, 'area.geojson'))

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.noGeometry'
      )
      expect(component.hasSelection).toBe(false)
    })

    it('rejects a GeoJSON file whose geometry exceeds world bounds', async () => {
      const content = JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 91],
            [1, 91],
            [1, 0],
            [0, 0],
          ],
        ],
      })

      await component.handleFileSelected(createFile(content, 'area.geojson'))

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.outOfBounds'
      )
      expect(component.hasSelection).toBe(false)
    })

    it('accepts a valid GeoJSON file and emits its bounding box', async () => {
      const content = JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ],
      })

      await component.handleFileSelected(createFile(content, 'area.geojson'))

      expect(component.errorKey).toBeNull()
      expect(component.bbox).toEqual([0, 0, 1, 1])
      expect(component.fileName).toBe('area.geojson')
      expect(component.hasSelection).toBe(true)
      expect(emittedBbox).toEqual([[0, 0, 1, 1]])
    })
  })

  describe('setLocationBbox', () => {
    it('stores the bbox and location name, clears the file state and emits the bbox', () => {
      const emitted: unknown[] = []
      component.bboxChange.subscribe((v) => emitted.push(v))
      const clearSpy = jest.fn()
      component.fileInput = { clear: clearSpy } as any
      component.fileName = 'area.geojson'
      component.errorKey = 'search.filters.spatialExtent.error.noGeometry'

      component.setLocationBbox([1, 2, 3, 4], 'Paris, 75')

      expect(component.bbox).toEqual([1, 2, 3, 4])
      expect(component.locationName).toBe('Paris, 75')
      expect(component.fileName).toBe('')
      expect(component.errorKey).toBeNull()
      expect(clearSpy).toHaveBeenCalled()
      expect(emitted).toEqual([[1, 2, 3, 4]])
    })
  })

  describe('handleFileError', () => {
    let emittedErrors: unknown[]

    beforeEach(() => {
      emittedErrors = []
      component.errorChange.subscribe((v) => emittedErrors.push(v))
    })

    it('maps an invalid-extension error', () => {
      component.handleFileError('invalid-extension')

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.invalidFormat'
      )
      expect(emittedErrors).toEqual([
        { key: 'search.filters.spatialExtent.error.invalidFormat' },
      ])
    })

    it('maps a file-too-large error with the max file size', () => {
      component.maxFileSizeMb = 10
      component.handleFileError('file-too-large')

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.fileTooLarge'
      )
      expect(emittedErrors).toEqual([
        {
          key: 'search.filters.spatialExtent.error.fileTooLarge',
          params: { maxSize: 10 },
        },
      ])
    })
  })
})
