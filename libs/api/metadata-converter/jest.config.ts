/* eslint-disable */
export default {
  displayName: 'api-metadata-converter',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.xml$': '<rootDir>/xml-transformer.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/api/metadata-converter',
}
