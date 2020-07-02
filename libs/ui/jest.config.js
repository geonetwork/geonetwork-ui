const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/ui/src/**/*.ts',
    '!libs/ui/src/index.ts',
    '!libs/ui/src/**/model.ts',
    '!libs/ui/src/**/*.module.ts',
    '!libs/ui/src/**/*.stories.ts',
  ],
}
