module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(ol))'],
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '@lib/search': '<rootDir>libs/search/src/index.ts',
    '@lib/catalog': '<rootDir>libs/catalog/src/index.ts',
    '@lib/gn-api': '<rootDir>libs/gn-api/src/index.ts',
    '@lib/ui': '<rootDir>libs/ui/src/index.ts',
    '@lib/common': '<rootDir>libs/common/src/index.ts',
    '@lib/auth': '<rootDir>libs/auth/src/index.ts',
  },
}
