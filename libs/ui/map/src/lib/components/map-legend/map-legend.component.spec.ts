import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapLegendComponent } from './map-legend.component'
import { MapContext } from '@geospatial-sdk/core'
import { createLegendFromLayer } from '@geospatial-sdk/legend'

jest.mock('@geospatial-sdk/legend', () => ({
  createLegendFromLayer: jest.fn(),
}))

describe('MapLegendComponent', () => {
  let component: MapLegendComponent
  let fixture: ComponentFixture<MapLegendComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapLegendComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLegendComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Change of map-context', () => {
    it('should create legend on first change', async () => {
      const mockContext: MapContext = {
        layers: [
          {
            id: 'test-layer',
          },
        ],
      } as MapContext

      const mockLegendElement = document.createElement('div')
      ;(createLegendFromLayer as jest.Mock).mockResolvedValue(mockLegendElement)

      const legendStatusChangeSpy = jest.spyOn(
        component.legendStatusChange,
        'emit'
      )

      await component.ngOnChanges({
        context: {
          currentValue: mockContext,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      })

      expect(createLegendFromLayer).toHaveBeenCalledWith(mockContext.layers[0])
      expect(component.legendHTML).toBe(mockLegendElement)
      expect(legendStatusChangeSpy).toHaveBeenCalledWith(true)
    })

    it('should create legend and emit status on subsequent context changes', async () => {
      const mockContext: MapContext = {
        layers: [
          {
            id: 'test-layer',
          },
        ],
      } as MapContext

      const mockLegendElement = document.createElement('div')
      ;(createLegendFromLayer as jest.Mock).mockResolvedValue(mockLegendElement)

      const legendStatusChangeSpy = jest.spyOn(
        component.legendStatusChange,
        'emit'
      )

      await component.ngOnChanges({
        context: {
          currentValue: mockContext,
          previousValue: {},
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(createLegendFromLayer).toHaveBeenCalledWith(mockContext.layers[0])
      expect(component.legendHTML).toBe(mockLegendElement)
      expect(legendStatusChangeSpy).toHaveBeenCalledWith(true)
    })

    it('should emit nothing when no legend is created', async () => {
      const mockContext: MapContext = {
        layers: [
          {
            id: 'test-layer',
          },
        ],
      } as MapContext

      ;(createLegendFromLayer as jest.Mock).mockResolvedValue(false)

      const legendStatusChangeSpy = jest.spyOn(
        component.legendStatusChange,
        'emit'
      )

      await component.ngOnChanges({
        context: {
          currentValue: mockContext,
          previousValue: {},
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(createLegendFromLayer).toHaveBeenCalledWith(mockContext.layers[0])
      expect(component.legendHTML).toBe(false)
      expect(legendStatusChangeSpy).not.toHaveBeenCalled()
    })

    it('should emit false when no layer is present in context', async () => {
      const mockContext: MapContext = {
        layers: [],
      } as MapContext

      ;(createLegendFromLayer as jest.Mock).mockResolvedValue(false)

      const legendStatusChangeSpy = jest.spyOn(
        component.legendStatusChange,
        'emit'
      )

      await component.ngOnChanges({
        context: {
          currentValue: mockContext,
          previousValue: {},
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(component.legendHTML).toBe(false)
      expect(legendStatusChangeSpy).toHaveBeenCalledWith(false)
    })

    it('should handle multiple layers', async () => {
      const mockContext: MapContext = {
        layers: [{ id: 'layer-1' }, { id: 'layer-2' }],
      } as MapContext

      const mockLegendElement = document.createElement('div')
      ;(createLegendFromLayer as jest.Mock).mockResolvedValue(mockLegendElement)

      const legendStatusChangeSpy = jest.spyOn(
        component.legendStatusChange,
        'emit'
      )

      await component.ngOnChanges({
        context: {
          currentValue: mockContext,
          previousValue: {},
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(createLegendFromLayer).toHaveBeenCalledWith(mockContext.layers[0])
      expect(component.legendHTML).toBe(mockLegendElement)
      expect(legendStatusChangeSpy).toHaveBeenCalledWith(true)
    })
  })
})
