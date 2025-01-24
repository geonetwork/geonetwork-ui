var IgnorePlugin = require('webpack').IgnorePlugin
module.exports = (config) => {
  // update the config with your custom configuration
  config.experiments = { ...config.experiments, topLevelAwait: true }
  config.plugins = [
    new IgnorePlugin({
      resourceRegExp:
        /(^fs$|cptable|jszip|xlsx|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|cpexcel|^path$|^request$|react-native|^vertx$)/,
    }),
  ]
  config.externals = ['angular']

  return config
}
