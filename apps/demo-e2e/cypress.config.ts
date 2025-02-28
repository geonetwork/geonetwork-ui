import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js'
import { configureCommonPlugins } from '../../tools/e2e/plugins.js'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'
import { fileURLToPath } from 'url'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(fileURLToPath(import.meta.url)),
    supportFile: 'src/support/e2e.ts',
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    video: false,
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      cypressBrowserPermissionsPlugin(on, config)
      configureCommonPlugins(on, config)
    },
  },
})
