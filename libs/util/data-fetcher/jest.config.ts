/* eslint-disable */
export default {
  displayName: 'util-data-fetcher',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/util/data-fetcher',
  testTimeout: 60000, // use a 60s timeout for those tests since DuckDB can be quite long to initialize, especially on the CI
}
