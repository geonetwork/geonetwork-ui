import { VIEWPORT_SIZE } from './settings.js'
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter.js'

export function configureCommonPlugins(on, config) {
  installLogsPrinter(on)

  on('before:browser:launch', (browser, launchOptions) => {
    // DEFAULT LANGUAGE
    if (browser.name === 'chrome') {
      launchOptions.args.push('--lang=en')
    }

    // BROWSER WINDOW SIZE (from https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots)
    const width = VIEWPORT_SIZE[0]
    const height = VIEWPORT_SIZE[1]

    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(`--window-size=${width},${height}`)

      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      // might not work on CI for some reason
      launchOptions.preferences.width = width
      launchOptions.preferences.height = height
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      launchOptions.args.push(`--width=${width}`)
      launchOptions.args.push(`--height=${height}`)
    }

    return launchOptions
  })
}
