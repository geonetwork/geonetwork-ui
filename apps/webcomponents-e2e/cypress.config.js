import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js'
import { configureCommonPlugins } from '../../tools/e2e/plugins.js'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'
import { fileURLToPath } from 'url'

export default defineConfig({
  component: {
    ...nxE2EPreset(fileURLToPath(import.meta.url)),
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    supportFile: 'src/support/component.ts',
    specPattern: '**/*.cy.ts',
    setupNodeEvents(on, config) {
      cypressBrowserPermissionsPlugin(on, config)
      configureCommonPlugins(on, config)
    },
  },
})
