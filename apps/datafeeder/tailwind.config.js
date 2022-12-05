const baseConfig = require('../../tailwind.base.config')
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const { join } = require('path')

module.exports = {
  ...baseConfig,
  content: [
    join(__dirname, '/src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
