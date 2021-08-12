import { Circle, Fill, Stroke } from 'ol/style'
import Style, { createDefaultStyle, StyleFunction } from 'ol/style/Style'

export const defaultStyle: StyleFunction = createDefaultStyle

const _hlStyle: Style = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'red',
    }),
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    radius: 5,
  }),
})
export const hlStyle: StyleFunction = () => _hlStyle
