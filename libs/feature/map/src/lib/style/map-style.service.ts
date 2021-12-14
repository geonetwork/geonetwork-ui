import { Injectable } from '@angular/core'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import chroma from 'chroma-js'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

export interface CreateStyleOptions {
  color?: string
  radius?: number
  width?: number
}

@Injectable({
  providedIn: 'root',
})
export class MapStyleService {
  createDefaultStyle(options: CreateStyleOptions = {}) {
    const {
      color = getThemeConfig().PRIMARY_COLOR,
      width = 2,
      radius = 7,
    } = options
    const fill = new Fill({
      color,
    })
    const stroke = new Stroke({
      color: 'white',
      width,
    })
    return [
      new Style({
        image: new CircleStyle({
          fill,
          stroke,
          radius,
        }),
        fill: new Fill({
          color: chroma(color).alpha(0.25).css(),
        }),
        stroke,
      }),
    ]
  }
}
