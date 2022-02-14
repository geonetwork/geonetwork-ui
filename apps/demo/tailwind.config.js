const baseConfig = require('../../tailwind.base.config')

module.exports = {
  ...baseConfig,
  purge: {
    // use all libs when purging for storybook to work
    content: ['./apps/demo/src/**/*.html', './libs/*/*/src/**/*.html'],
  },
}
