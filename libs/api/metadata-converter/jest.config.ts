/* eslint-disable */
export default {
  displayName: 'api-metadata-converter',
  preset: '../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
    '^.+\\.xml$': '<rootDir>/xml-transformer.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/api/metadata-converter',
}
