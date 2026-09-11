import pluginCypress from 'eslint-plugin-cypress/flat'
import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  pluginCypress.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
]
