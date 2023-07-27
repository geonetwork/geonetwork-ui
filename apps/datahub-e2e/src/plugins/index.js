const {
  cypressBrowserPermissionsPlugin,
} = require('cypress-browser-permissions')

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // if (browser.name === 'chrome') {
    launchOptions.args.push('--lang=en')
    return launchOptions
    // }
  })
  config = cypressBrowserPermissionsPlugin(on, config)
  return config
}
