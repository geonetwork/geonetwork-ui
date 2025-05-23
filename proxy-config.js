module.exports = {
  '/geonetwork': {
    target: 'https://hdf-dev.geofit.fr',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    cookiePathRewrite: {
      '/geonetwork': '/',
    },
  },
  // this provides a parameter-based proxy to easily work around CORS issues
  // use with: /dev-proxy?http://where_to_proxy.com/bla?abc
  '/dev-proxy': {
    target: 'http://invalidhostname',
    secure: false,
    ignorePath: true,
    changeOrigin: true,
    router: (req) => decodeURIComponent(req._parsedUrl.query),
  },
}
