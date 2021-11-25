import * as TOML from '@ltd/j-toml'

export function loadAppConfig() {
  return fetch('assets/configuration/default.toml')
    .then((resp) => resp.text())
    .then((conf) => {
      const parsed = TOML.parse(conf) as any
      console.log(parsed)
      window['env'] = {}
      window['env']['apiUrl'] = parsed.global.geonetwork4_api_url
      window['env']['proxyPath'] = parsed.global.proxy_path
    })
}
