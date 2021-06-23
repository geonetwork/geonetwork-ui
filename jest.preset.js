const nxPreset = require('@nrwl/jest/preset')

module.exports = { ...nxPreset, setupFiles: ['jest-canvas-mock'] }
