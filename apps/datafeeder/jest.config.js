const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'apps/datafeeder/src/**/*.ts',
    '!apps/datafeeder/src/main.ts',
    '!apps/datafeeder/src/polyfills.ts',
    '!apps/datafeeder/src/environments/*',
    '!apps/datafeeder/src/**/model.ts',
    '!apps/datafeeder/src/**/*.module.ts',
    '!apps/datafeeder/src/**/*.stories.ts',
  ],
}
