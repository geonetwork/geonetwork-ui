rootMain.core = { builder: 'webpack5' }

// Use the following syntax to add addons!
// rootMain.addons.push('');

module.exports = rootMain
module.exports.addons = ['@storybook/addon-essentials']
module.exports.stories = [
  '../src/app/**/*.stories.mdx',
  '../src/app/**/*.stories.@(js|jsx|ts|tsx)',
]
