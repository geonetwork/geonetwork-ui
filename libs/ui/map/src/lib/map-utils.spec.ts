import {
  defaults,
  DragPan,
  DragRotate,
  MouseWheelZoom,
  PinchRotate,
} from 'ol/interaction'
import Map from 'ol/Map'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import {
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
})
