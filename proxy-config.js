module.exports = {
  '/geonetwork': {
    target: 'http://localhost:8080',
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
  '/datafeeder': {
    target: 'http://localhost:8181',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    cookiePathRewrite: {
      '/datafeeder': '/',
    },
    headers: {
      'sec-roles':
        'ROLE_SUPERUSER;ROLE_GN_ADMIN;ROLE_ADMINISTRATOR;ROLE_USER;ROLE_MAPSTORE_ADMIN',
      'sec-org': 'myOrg',
      'sec-username': 'testadmin',
      'sec-fetch-user': '?1',
      'sec-proxy': 'true',
      referer: 'https://georchestra-127-0-1-1.traefik.me/',
      'sec-orgname': 'myOrg',
    },
  },
}
