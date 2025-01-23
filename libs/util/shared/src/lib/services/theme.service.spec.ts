import { ThemeService } from './theme.service'

function getCssVars() {
  const style = document.documentElement.style
  return new Array(style.length)
    .fill(0)
    .map((v, i) => style.item(i))
    .reduce(
      (prev, curr) => ({ ...prev, [curr]: style.getPropertyValue(curr) }),
      {}
    )
}

describe('ThemeService', () => {
  describe('#applyCssVariables', () => {
    describe('setting only colors', () => {
      beforeEach(() => {
        ThemeService.applyCssVariables('red', 'green', 'blue', 'white')
      })
      it('sets css variables with interpolated values for colors', () => {
        expect(getCssVars()).toEqual({
          '--color-background': 'rgb(255 255 255)',
          '--color-gray-100': 'rgb(242 242 255)',
          '--color-gray-200': 'rgb(228 228 255)',
          '--color-gray-300': 'rgb(213 213 255)',
          '--color-gray-400': 'rgb(198 198 255)',
          '--color-gray-50': 'rgb(249 249 255)',
          '--color-gray-500': 'rgb(180 180 255)',
          '--color-gray-600': 'rgb(161 161 255)',
          '--color-gray-700': 'rgb(140 140 255)',
          '--color-gray-800': 'rgb(114 114 255)',
          '--color-gray-900': 'rgb(81 81 255)',
          '--color-gray-950': 'rgb(57 57 255)',
          '--color-main': 'rgb(0 0 255)',
          '--color-primary': 'rgb(255 0 0)',
          '--color-primary-black': 'rgb(42 16 5)',
          '--color-primary-darker': 'rgb(173 26 10)',
          '--color-primary-darkest': 'rgb(98 25 12)',
          '--color-primary-lighter': 'rgb(255 115 82)',
          '--color-primary-lightest': 'rgb(255 178 153)',
          '--color-primary-white': 'rgb(255 226 216)',
          '--color-secondary': 'rgb(0 128 0)',
          '--color-secondary-black': 'rgb(13 24 7)',
          '--color-secondary-darker': 'rgb(20 89 12)',
          '--color-secondary-darkest': 'rgb(20 52 14)',
          '--color-secondary-lighter': 'rgb(102 166 86)',
          '--color-secondary-lightest': 'rgb(169 204 156)',
          '--color-secondary-white': 'rgb(223 236 217)',
        })
      })
    })
    describe('setting colors and fonts', () => {
      beforeEach(() => {
        ThemeService.applyCssVariables(
          'red',
          'green',
          'blue',
          'white',
          '"Font1", font2, sans-serif',
          '"Font3", font4, serif'
        )
      })
      it('sets css variables with colors and fonts', () => {
        expect(getCssVars()).toMatchObject({
          '--color-background': 'rgb(255 255 255)',
          '--color-main': 'rgb(0 0 255)',
          '--color-primary': 'rgb(255 0 0)',
          '--color-secondary': 'rgb(0 128 0)',
          '--font-family-main': '"Font1", font2, sans-serif',
          '--font-family-title': '"Font3", font4, serif',
        })
      })
    })
  })
  describe('#generateBgOpacityClasses', () => {
    let cssRules, firstRule
    describe('default opacities', () => {
      beforeEach(() => {
        ThemeService.generateBgOpacityClasses('primary', 'red')
        cssRules =
          document.styleSheets[document.styleSheets.length - 1].cssRules
        firstRule = cssRules[0]
      })
      it('generates 2 rules per opacity value', () => {
        expect(cssRules.length).toEqual(10)
      })
      it('generates .bg-{name}-opacity-{value} class name', () => {
        expect(firstRule.selectorText).toEqual('.bg-primary-opacity-0')
      })
      it('the rules has a background-color with opacity', () => {
        expect(firstRule.style['background-color']).toEqual('rgb(255 0 0 / 0)')
        expect(cssRules[4].style['background-color']).toEqual(
          'rgb(255 0 0 / 0.25)'
        )
      })
    })
    describe('given opacities', () => {
      beforeEach(() => {
        ThemeService.generateBgOpacityClasses('primary', 'red', [75])
        cssRules =
          document.styleSheets[document.styleSheets.length - 1].cssRules
        firstRule = cssRules[0]
      })
      it('generates 2 css rules', () => {
        expect(cssRules.length).toEqual(2)
      })
      it('generates .bg-primary-opacity-75 class name', () => {
        expect(firstRule.selectorText).toEqual('.bg-primary-opacity-75')
      })
      it('the rules has a background-color with opacity', () => {
        expect(firstRule.style['background-color']).toEqual(
          'rgb(255 0 0 / 0.75)'
        )
      })
    })
  })

  describe('#generateLabelColor', () => {
    it('generates different color for different labels', () => {
      const color1 = ThemeService.generateLabelColor('label1', 1, 0.5)
      const color2 = ThemeService.generateLabelColor('label2', 1, 0.5)
      expect(color1).not.toEqual(color2)
    })
    it('always generates the same color for the same label', () => {
      const color1 = ThemeService.generateLabelColor('label1', 1, 0.5)
      const color2 = ThemeService.generateLabelColor('label1', 1, 0.5)
      expect(color1).toEqual(color2)
    })
  })
})
