import { Injectable } from '@angular/core'
import chroma from 'chroma-js'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  static applyCssVariables(
    primary: string,
    secondary: string,
    main: string,
    background: string
  ) {
    const applyColor = (name: string, color) => {
      document.documentElement.style.setProperty(
        `--color-${name}`,
        `${color.rgb().join(',')}`
      )
    }

    const black = chroma('black')
    const white = chroma('white')
    applyColor('primary', chroma(primary))
    applyColor(
      'primary-lighter',
      chroma.scale([primary, white]).mode('lab')(0.3)
    )
    applyColor(
      'primary-lightest',
      chroma.scale([primary, white]).mode('lab')(0.6)
    )
    applyColor(
      'primary-darker',
      chroma.scale([primary, black]).mode('lab')(0.3)
    )
    applyColor(
      'primary-darkest',
      chroma.scale([primary, black]).mode('lab')(0.6)
    )
    applyColor('secondary', chroma(secondary))
    applyColor(
      'secondary-lighter',
      chroma.scale([secondary, white]).mode('lab')(0.3)
    )
    applyColor(
      'secondary-lightest',
      chroma.scale([secondary, white]).mode('lab')(0.6)
    )
    applyColor(
      'secondary-darker',
      chroma.scale([secondary, black]).mode('lab')(0.3)
    )
    applyColor(
      'secondary-darkest',
      chroma.scale([secondary, black]).mode('lab')(0.6)
    )
    applyColor('main', chroma(main))
    applyColor('background', chroma(background))

    const scale = chroma.scale([background, main]).mode('lab')
    applyColor('gray-100', scale(0.1))
    applyColor('gray-200', scale(0.2))
    applyColor('gray-300', scale(0.3))
    applyColor('gray-400', scale(0.4))
    applyColor('gray-500', scale(0.5))
    applyColor('gray-600', scale(0.6))
    applyColor('gray-700', scale(0.7))
    applyColor('gray-800', scale(0.8))
    applyColor('gray-900', scale(0.9))
  }

  static generateLabelColor(
    label: string,
    saturation: number,
    lightness: number
  ): string {
    let hue = 0
    for (let i = 0; i < label.length; i++) {
      hue += label.charCodeAt(i)
    }
    return chroma.hsl(hue % 360, saturation, lightness)
  }
}
