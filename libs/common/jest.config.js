const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/common/src/**/*.ts',
    '!libs/common/src/public-api.ts',
    '!libs/common/src/**/model.ts',
    '!libs/common/src/**/*.module.ts',
    '!libs/common/src/**/*.stories.ts',
  ],
}
