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
    let emittedErrors: string[]

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
        'search.filters.spatialExtent.error.invalidFormat',
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

  describe('handleFileError', () => {
    let emittedErrors: string[]

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
        'search.filters.spatialExtent.error.invalidFormat',
      ])
    })

    it('maps a file-too-large error', () => {
      component.handleFileError('file-too-large')

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.fileTooLarge'
      )
      expect(emittedErrors).toEqual([
        'search.filters.spatialExtent.error.fileTooLarge',
      ])
    })
  })
})
