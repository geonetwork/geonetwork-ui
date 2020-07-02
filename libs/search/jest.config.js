const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/search/src/**/*.ts',
    '!libs/search/src/index.ts',
    '!libs/search/src/**/model.ts',
    '!libs/search/src/**/*.module.ts',
    '!libs/search/src/**/*.stories.ts',
  ],
}
