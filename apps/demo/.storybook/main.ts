import { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
  stories: [
    '../../../libs/**/*.mdx',
    '../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
    '../../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  staticDirs: [{ from: '../../../translations/', to: '/assets/i18n' }],

  async webpackFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        symlinks: false,
      },
    }
  },
  /*  docs: {
    autodocs: true,
  },*/ docs: {},
}

export default config
// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
