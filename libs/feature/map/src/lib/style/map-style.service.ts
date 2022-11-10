import { Injectable } from '@angular/core'
import { getThemeConfig, isConfigLoaded } from '@geonetwork-ui/util/app-config'
import chroma from 'chroma-js'
import { Fill, Stroke, Style } from 'ol/style'
import { StyleLike } from 'ol/style/Style'
import CircleStyle from 'ol/style/Circle'
import Feature from 'ol/Feature'

export interface CreateStyleOptions {
  color: string
  isFocused?: boolean
}

export type StyleByGeometryType = {
  line: Style | Style[]
  polygon: Style | Style[]
  point: Style | Style[]
}

@Injectable({
  providedIn: 'root',
})
export class MapStyleService {
  styles = {
    default: this.createStyleFunction(
      this.createGeometryStyles({
        color: isConfigLoaded() ? getThemeConfig().PRIMARY_COLOR : 'blue',
      })
    ),
    defaultHL: this.createStyleFunction(
      this.createGeometryStyles({
        color: isConfigLoaded() ? getThemeConfig().SECONDARY_COLOR : 'red',
        isFocused: true,
      })
    ),
  }

  createGeometryStyles(options: CreateStyleOptions): StyleByGeometryType {
    const { color, isFocused } = options
    const zIndex = isFocused ? 10 : undefined
    return {
      polygon: new Style({
        fill: new Fill({
          color: this.computeTransparentFillColor(color),
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
        zIndex,
      }),
      point: new Style({
        image: new CircleStyle({
          fill: new Fill({
            color,
          }),
          stroke: new Stroke({
            color: 'white',
            width: isFocused ? 3 : 2,
          }),
          radius: isFocused ? 8 : 7,
        }),
        zIndex,
      }),
      line: [
        new Style({
          stroke: new Stroke({
            color: 'white',
            width: isFocused ? 8 : 6,
          }),
          zIndex,
        }),
        new Style({
          stroke: new Stroke({
            color,
            width: isFocused ? 3 : 2,
          }),
          zIndex,
        }),
      ],
    }
  }

  createStyleFunction(styleByGeometryType: StyleByGeometryType): StyleLike {
    return (feature: Feature): Style | Style[] => {
      const geometryType = feature?.getGeometry()?.getType()
      switch (geometryType) {
        case 'LinearRing':
        case 'LineString':
        case 'MultiLineString':
          return styleByGeometryType.line
        case 'Point':
        case 'MultiPoint':
          return styleByGeometryType.point
        case 'Circle':
        case 'Polygon':
        case 'MultiPolygon':
          return styleByGeometryType.polygon
        default:
          return styleByGeometryType.point
      }
    }
  }

  private computeTransparentFillColor(color: string, alpha = 0.25): string {
    return chroma(color).alpha(alpha).css()
  }
}
