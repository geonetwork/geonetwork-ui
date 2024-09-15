import Collection from 'ol/Collection'
import { defaults, DragPan, Interaction, MouseWheelZoom } from 'ol/interaction'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import {
  mouseOnly,
  noModifierKeys,
  platformModifierKeyOnly,
  primaryAction,
} from 'ol/events/condition'

export function prioritizePageScroll(interactions: Collection<Interaction>) {
  interactions.clear()
  interactions.extend(
    defaults({
      // remove rotate interactions
      altShiftDragRotate: false,
      pinchRotate: false,
      // replace drag and zoom interactions
      dragPan: false,
      mouseWheelZoom: false,
    })
      .extend([
        new DragPan({
          condition: dragPanCondition,
        }),
        new MouseWheelZoom({
          condition: mouseWheelZoomCondition,
        }),
      ])
      .getArray()
  )
}

export function dragPanCondition(
  this: DragPan,
  event: MapBrowserEvent<PointerEvent>
) {
  const dragPanCondition = this.getPointerCount() === 2 || mouseOnly(event)
  if (!dragPanCondition) {
    this.getMap().dispatchEvent('mapmuted')
  }
  // combine the condition with the default DragPan conditions
  return dragPanCondition && noModifierKeys(event) && primaryAction(event)
}

export function mouseWheelZoomCondition(
  this: MouseWheelZoom,
  event: MapBrowserEvent<UIEvent>
) {
  if (!platformModifierKeyOnly(event) && event.type === 'wheel') {
    this.getMap().dispatchEvent('mapmuted')
  }
  return platformModifierKeyOnly(event)
}
