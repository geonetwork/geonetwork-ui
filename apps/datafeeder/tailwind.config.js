const baseConfig = require('../../tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')

module.exports = {
  ...baseConfig,
  purge: {
    ...baseConfig.purge,
    content: createGlobPatternsForDependencies(__dirname),
  },
}
