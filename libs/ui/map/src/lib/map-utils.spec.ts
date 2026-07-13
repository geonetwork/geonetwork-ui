import {
  defaults,
  DragPan,
  DragRotate,
  MouseWheelZoom,
  PinchRotate,
} from 'ol/interaction.js'
import Map from 'ol/Map.js'
import MapBrowserEvent from 'ol/MapBrowserEvent.js'
import {
  createSpatialExtentLayer,
  DEFAULT_SPATIAL_EXTENT_STYLE,
  dragPanCondition,
  mouseWheelZoomCondition,
  prioritizePageScroll,
} from './map-utils'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}
;(window as any).ResizeObserver = ResizeObserverMock

describe('map utils', () => {
  describe('dragPanCondition', () => {
    let interaction: DragPan
    beforeEach(() => {
      interaction = new DragPan()
      const map = new Map({})
      map.addInteraction(interaction)
    })

    it('returns true for a left click without modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(true)
    })
    it('returns false for a left click with modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        shiftKey: true,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(false)
    })
  })
  describe('prioritizePageScroll', () => {
    const interactions = defaults()
    let dragRotate
    let pinchRotate
    beforeEach(() => {
      prioritizePageScroll(interactions)
    })
    it('adds condition to DragPan', () => {
      const dragPan = interactions
        .getArray()
        .find((interaction) => interaction instanceof DragPan)
      expect(dragPan.condition_).toEqual(dragPanCondition)
    })
    it('adds condition to MouseWheelZoom', () => {
      const mouseWheelZoom = interactions
        .getArray()
        .find((interaction) => interaction instanceof MouseWheelZoom)
      expect(mouseWheelZoom.condition_).toEqual(mouseWheelZoomCondition)
    })
    describe('interactions', () => {
      beforeEach(() => {
        interactions.forEach((interaction) => {
          if (interaction instanceof DragRotate) {
            dragRotate = interaction
          }
          if (interaction instanceof PinchRotate) {
            pinchRotate = interaction
          }
        })
      })
      it('with no DragRotate interaction', () => {
        expect(dragRotate).toBeFalsy()
      })
      it('with no PinchRotate interaction', () => {
        expect(pinchRotate).toBeFalsy()
      })
    })
  })

  describe('createSpatialExtentLayer', () => {
    const extents = [{ bbox: [0, 0, 1, 1] as [number, number, number, number] }]

    it('returns null when there is no extent', () => {
      expect(createSpatialExtentLayer([])).toBeNull()
    })
    it('returns null when no extent can be represented', () => {
      expect(createSpatialExtentLayer([{ description: 'no shape' }])).toBeNull()
    })
    it('builds a geojson layer with the default style and label', () => {
      expect(createSpatialExtentLayer(extents)).toEqual({
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
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
              },
            },
          ],
        },
        label: 'Spatial extents',
        style: DEFAULT_SPATIAL_EXTENT_STYLE,
      })
    })
    it('applies the provided overrides', () => {
      const style = { 'stroke-color': 'red' }
      expect(
        createSpatialExtentLayer(extents, {
          label: 'Custom',
          clickable: false,
          style,
        })
      ).toMatchObject({
        label: 'Custom',
        clickable: false,
        style,
      })
    })
  })
})
