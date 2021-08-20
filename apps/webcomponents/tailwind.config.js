const baseConfig = require('../../tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')

module.exports = {
  ...baseConfig,
  purge: {
    ...baseConfig.purge,
    content: [
      __dirname + '/src/**/!(*.stories|*.spec).{ts,html}',
      ...createGlobPatternsForDependencies(__dirname),
    ],
  },
}
