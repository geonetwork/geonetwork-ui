import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'
import { fileURLToPath } from 'url'
import { configureCommonPlugins } from '../../tools/e2e/plugins.js'

export default defineConfig({
  component: {
    ...nxE2EPreset(fileURLToPath(import.meta.url)),
  },
})
