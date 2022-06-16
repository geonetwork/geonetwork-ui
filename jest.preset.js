const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFiles: ['jest-canvas-mock'],
  transformIgnorePatterns: ['node_modules/(?!(ol|@mapbox|.*.mjs$))'],
}
