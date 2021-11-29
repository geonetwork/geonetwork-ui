import { Injectable } from '@angular/core'
import chroma from 'chroma-js'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // FIXME: this shouldn't be necessary, the app config should be read instead, to remove
  static getColor(name: string) {
    return document.documentElement.style.getPropertyValue(`--color-${name}`)
  }

  static applyCssVariables(
    primaryColor: string,
    secondaryColor: string,
    mainColor: string,
    backgroundColor: string,
    mainFont?: string,
    titleFont?: string
  ) {
    const applyColor = (name: string, color) => {
      document.documentElement.style.setProperty(`--color-${name}`, color.css())
    }

    const black = chroma('black')
    const white = chroma('white')
    applyColor('primary', chroma(primaryColor))
    applyColor(
      'primary-lighter',
      chroma.scale([primaryColor, white]).mode('lab')(0.3)
    )
    applyColor(
      'primary-lightest',
      chroma.scale([primaryColor, white]).mode('lab')(0.6)
    )
    applyColor(
      'primary-darker',
      chroma.scale([primaryColor, black]).mode('lab')(0.3)
    )
    applyColor(
      'primary-darkest',
      chroma.scale([primaryColor, black]).mode('lab')(0.6)
    )
    applyColor('secondary', chroma(secondaryColor))
    applyColor(
      'secondary-lighter',
      chroma.scale([secondaryColor, white]).mode('lab')(0.3)
    )
    applyColor(
      'secondary-lightest',
      chroma.scale([secondaryColor, white]).mode('lab')(0.6)
    )
    applyColor(
      'secondary-darker',
      chroma.scale([secondaryColor, black]).mode('lab')(0.3)
    )
    applyColor(
      'secondary-darkest',
      chroma.scale([secondaryColor, black]).mode('lab')(0.6)
    )
    applyColor('main', chroma(mainColor))
    applyColor('background', chroma(backgroundColor))

    const scale = chroma.scale([backgroundColor, mainColor]).mode('lrgb')
    applyColor('gray-100', scale(0.1))
    applyColor('gray-200', scale(0.2))
    applyColor('gray-300', scale(0.3))
    applyColor('gray-400', scale(0.4))
    applyColor('gray-500', scale(0.5))
    applyColor('gray-600', scale(0.6))
    applyColor('gray-700', scale(0.7))
    applyColor('gray-800', scale(0.8))
    applyColor('gray-900', scale(0.9))

    if (mainFont) {
      document.documentElement.style.setProperty(`--font-family-main`, mainFont)
    }
    if (titleFont) {
      document.documentElement.style.setProperty(
        `--font-family-title`,
        titleFont
      )
    }
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
    return chroma.hsl(hue % 360, saturation, lightness).css()
  }
}
