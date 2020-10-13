module.exports = {
  '/geonetwork': {
    target: 'https://apps.titellus.net',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    cookiePathRewrite: {
      '/geonetwork': '/',
    },
  },
}
