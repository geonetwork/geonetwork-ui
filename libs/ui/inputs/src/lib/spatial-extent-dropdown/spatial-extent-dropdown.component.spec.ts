import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { SpatialExtentDropdownComponent } from './spatial-extent-dropdown.component'

function createFile(content: string, name: string, type = 'application/json') {
  return new File([content], name, { type })
}

function triggerFileInput(
  component: SpatialExtentDropdownComponent,
  file: File | null
) {
  const input = document.createElement('input')
  Object.defineProperty(input, 'files', { value: file ? [file] : [] })
  component.handleFileInput({ target: input } as unknown as Event)
}

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
      expect(component.displayFileName).toBe('')
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
      expect(component.fileName).toBeNull()
      expect(component.errorKey).toBeNull()
      expect(emittedBbox).toEqual([null])
      expect(event.stopPropagation).toHaveBeenCalled()
    })
  })

  describe('file import', () => {
    let emittedBbox: unknown[]
    let emittedErrors: string[]

    beforeEach(() => {
      emittedBbox = []
      emittedErrors = []
      component.bboxChange.subscribe((v) => emittedBbox.push(v))
      component.errorChange.subscribe((v) => emittedErrors.push(v))
    })

    it('ignores the input when no file was selected', () => {
      triggerFileInput(component, null)
      expect(emittedBbox).toEqual([])
      expect(emittedErrors).toEqual([])
    })

    it('rejects a file with an unsupported extension', async () => {
      triggerFileInput(component, createFile('not json', 'area.txt'))
      await fixture.whenStable()

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.invalidFormat'
      )
      expect(emittedErrors).toEqual([
        'search.filters.spatialExtent.error.invalidFormat',
      ])
      expect(component.hasSelection).toBe(false)
    })

    it('rejects a file exceeding the size limit', async () => {
      const file = createFile('{}', 'area.geojson')
      Object.defineProperty(file, 'size', { value: 3 * 1024 * 1024 })

      triggerFileInput(component, file)
      await fixture.whenStable()

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.fileTooLarge'
      )
    })

    it('rejects a file that is not valid JSON', async () => {
      triggerFileInput(component, createFile('not json', 'area.geojson'))
      await fixture.whenStable()

      expect(component.errorKey).toBe(
        'search.filters.spatialExtent.error.invalidFormat'
      )
    })

    it('rejects a GeoJSON file with no geometry', async () => {
      const content = JSON.stringify({ type: 'FeatureCollection', features: [] })
      triggerFileInput(component, createFile(content, 'area.geojson'))
      await fixture.whenStable()

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

      triggerFileInput(component, createFile(content, 'area.geojson'))
      await fixture.whenStable()

      expect(component.errorKey).toBeNull()
      expect(component.bbox).toEqual([0, 0, 1, 1])
      expect(component.fileName).toBe('area.geojson')
      expect(component.hasSelection).toBe(true)
      expect(emittedBbox).toEqual([[0, 0, 1, 1]])
    })
  })
})
