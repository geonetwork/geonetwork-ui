/* eslint-disable */
export default {
  displayName: 'api-metadata-converter',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.xml$': '<rootDir>/xml-transformer.js',
  },
  moduleFileExtensions: ['ts', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/api/metadata-converter',
}
