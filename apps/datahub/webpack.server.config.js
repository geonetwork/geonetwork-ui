const IgnorePlugin = require('webpack').IgnorePlugin
const AngularWebpackPlugin = require('@ngtools/webpack').AngularWebpackPlugin

module.exports = (config) => {
  // update the config with your custom configuration
  config.experiments = { ...config.experiments, topLevelAwait: true }
  config.plugins = [
    new IgnorePlugin({
      resourceRegExp: /(^react-native)/,
    }),
    new AngularWebpackPlugin({
      tsconfig: 'apps/datahub/tsconfig.server.json',
    }),
  ]
  return config
}
