import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { configureCommonPlugins } from '../../tools/e2e/plugins'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    video: false,
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      cypressBrowserPermissionsPlugin(on, config)
      configureCommonPlugins(on, config)
    },
  },
})
