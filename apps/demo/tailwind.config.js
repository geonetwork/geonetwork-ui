const baseConfig = require('../../tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const { join } = require('path')

module.exports = {
  ...baseConfig,
  content: [
    './libs/**/src/**/!(*.spec).{ts,html}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
