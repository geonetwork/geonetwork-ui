import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
  stories: [
    '../../../libs/**/*.mdx',
    '../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
    '../../**/*.stories.@(js|jsx|ts|tsx)',
  ],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],

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

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
