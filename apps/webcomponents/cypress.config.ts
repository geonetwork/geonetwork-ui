import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, { cypressDir: 'cypress' }),
    video: false,
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    includeShadowDom: true,
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
