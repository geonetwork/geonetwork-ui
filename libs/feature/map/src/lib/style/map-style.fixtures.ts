import { Circle, Fill, Stroke, Style } from 'ol/style'

const colorPrimary = 'blue'
const colorSecondary = 'red'
const colorStroke = 'white'

export const defaultMapStyleFixture = (): Style =>
  new Style({
    image: new Circle({
      fill: new Fill({
        color: colorPrimary,
      }),
      stroke: new Stroke({
        color: colorStroke,
        width: 2,
      }),
      radius: 5,
    }),
    fill: new Fill({
      color: 'rgba(0,0,255,0.25)',
    }),
    stroke: new Stroke({
      color: colorStroke,
      width: 2,
    }),
  })

export const defaultMapStyleHlFixture = (): Style =>
  new Style({
    image: new Circle({
      fill: new Fill({
        color: colorSecondary,
      }),
      stroke: new Stroke({
        color: colorStroke,
        width: 3,
      }),
      radius: 6,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.25)',
    }),
    stroke: new Stroke({
      color: colorSecondary,
      width: 3,
    }),
  })
