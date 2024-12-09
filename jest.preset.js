const nxPreset = require('@nx/jest/preset').default

const npmDependenciesOnlyInEsm = [
  'color-*',
  'ol',
  '@mapbox',
  '@geospatial-sdk',
  '@camptocamp/ogc-client',
  'node-fetch',
  'data-uri-to-buffer',
  'fetch-blob',
  'formdata-polyfill',
  '.*.mjs',
]

module.exports = {
  ...nxPreset,
  coverageReporters: ['text'],
  setupFiles: ['jest-canvas-mock'],
  transformIgnorePatterns: [
    `node_modules/(?!(${npmDependenciesOnlyInEsm.join('|')}))`,
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        isolatedModules: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
}
