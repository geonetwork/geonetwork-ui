const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/editor/src/**/*.ts',
    '!libs/editor/src/index.ts',
    '!libs/editor/src/**/*.module.ts',
  ],
}
