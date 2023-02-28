rootMain.core = { builder: 'webpack5' }

// Use the following syntax to add addons!
// rootMain.addons.push('');

module.exports = rootMain
module.exports.addons = ['@storybook/addon-essentials']
module.exports.stories = [
  '../../../libs/**/*.stories.mdx',
  '../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
  '../../**/*.stories.@(js|jsx|ts|tsx)',
]
