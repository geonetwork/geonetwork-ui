module.exports = {
  '/geonetwork': {
    target: 'https://sextant-test.ifremer.fr',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    cookiePathRewrite: {
      '/geonetwork': '/',
    },
  },
  '/datafeeder': {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/datafeeder/': '/import/',
    },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    cookiePathRewrite: {
      '/datafeeder': '/',
    },
  },
}
