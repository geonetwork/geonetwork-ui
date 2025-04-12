import packageJson from '../../../../../package.json'

export const GEONETWORK_UI_VERSION = packageJson.version

export const GEONETWORK_UI_TAG_NAME =
  GEONETWORK_UI_VERSION.split('-')[1] === 'dev'
    ? 'main'
    : `v${packageJson.version}`
