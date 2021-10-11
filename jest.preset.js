const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  setupFiles: ['jest-canvas-mock'],
  transformIgnorePatterns: ['node_modules/(?!(ol|@mapbox|@camptocamp))'],
}
