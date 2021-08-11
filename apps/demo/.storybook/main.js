const rootMain = require('../../../.storybook/main')

rootMain.core = { ...rootMain.core, builder: 'webpack5' }

// Use the following syntax to add addons!
// rootMain.addons.push('');
rootMain.stories.push(
  // This will look for libs and apps stories in the repo
  ...[
    '../../../{apps,libs}/**/*.stories.mdx',
    '../../../{apps,libs}/**/*.stories.@(js|jsx|ts|tsx)',
  ]
)

module.exports = rootMain
