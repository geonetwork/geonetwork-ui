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
      document.documentElement.style.setProperty(`--color-${name}`, color.css())
    }

    applyColor('primary', chroma(primary))
    applyColor('primary-lighter', chroma(primary).brighten(1))
    applyColor('primary-lightest', chroma(primary).brighten(2))
    applyColor('primary-darker', chroma(primary).darken(1))
    applyColor('primary-darkest', chroma(primary).darken(2))
    applyColor('secondary', chroma(secondary))
    applyColor('secondary-lighter', chroma(secondary).brighten(1))
    applyColor('secondary-lightest', chroma(secondary).brighten(2))
    applyColor('secondary-darker', chroma(secondary).darken(1))
    applyColor('secondary-darkest', chroma(secondary).darken(2))
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
}
