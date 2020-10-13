const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/auth/src/**/*.ts',
    '!libs/auth/src/public-api.ts',
    '!libs/auth/src/**/model.ts',
    '!libs/auth/src/**/*.module.ts',
    '!libs/auth/src/**/*.stories.ts',
  ],
}
