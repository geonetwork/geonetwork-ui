const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'apps/search/src/**/*.ts',
    '!apps/search/src/main.ts',
    '!apps/search/src/polyfills.ts',
    '!apps/search/src/environments/*',
    '!apps/search/src/**/model.ts',
    '!apps/search/src/**/*.module.ts',
    '!apps/search/src/**/*.stories.ts',
  ],
}
