const baseConfig = require('../../tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      boxShadow: {
        ...baseConfig.theme.extend.boxShadow,
        xl: '0 0 44px 0 rgba(5, 31, 156, 0.09)',
        'xl-hover': '0 0 44px 0 rgba(5, 31, 156, 0.2)',
      },
    },
  },
  content: [
    join(__dirname, '/src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
