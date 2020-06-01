const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
}
