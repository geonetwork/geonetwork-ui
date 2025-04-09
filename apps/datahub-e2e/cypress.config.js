import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'
import { fileURLToPath } from 'url'
import { configureCommonPlugins } from '../../tools/e2e/plugins.js'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(fileURLToPath(import.meta.url)),
    video: false,
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      cypressBrowserPermissionsPlugin(on, config)
      configureCommonPlugins(on, config)
    },
    retries: process.env.CI
      ? {
          experimentalStrategy: 'detect-flake-and-pass-on-threshold',
          experimentalOptions: {
            maxRetries: 4,
            passesRequired: 1,
          },
          openMode: true,
          runMode: true,
        }
      : undefined,
  },
})
