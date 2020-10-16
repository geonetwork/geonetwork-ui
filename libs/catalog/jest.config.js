const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/catalog/src/**/*.ts',
    '!libs/catalog/src/index.ts',
    '!libs/catalog/src/**/model.ts',
    '!libs/catalog/src/**/*.module.ts',
    '!libs/catalog/src/**/*.stories.ts',
  ],
}
