const rootMain = require('../../../.storybook/main')

rootMain.core = { ...rootMain.core, builder: 'webpack5' }

// Use the following syntax to add addons!
// rootMain.addons.push('');
rootMain.stories.push(
  ...['../src/app/**/*.stories.mdx', '../src/app/**/*.stories.@(js|jsx|ts|tsx)']
)

module.exports = rootMain
